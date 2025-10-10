import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { VideoSchema } from "@/lib/validation/video";
import { createAuditLog } from "@/lib/audit";
import { handleError, withAuth, successResponse } from "@/lib/api-helpers";
import { enrichVideoMetadata } from "@/lib/youtube";
import type { VideoWithCategory } from "@/lib/types";

export async function GET(request: NextRequest) {
  // return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "20");
      const search = searchParams.get("search") || "";
      const category_id = searchParams.get("category_id");
      const published = searchParams.get("published");

      const supabase = createClient();

      let query = supabase
        .from("videos")
        .select(
          `
          *,
          video_categories (
            id,
            name,
            slug
          )
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`
        );
      }

      if (category_id) {
        query = query.eq("category_id", category_id);
      }

      if (published !== null) {
        query = query.eq("published", published === "true");
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;

      return successResponse({
        data: data as VideoWithCategory[],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
        },
      });
    } catch (error) {
      return handleError(error);
    }
  // });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (userId) => {
    try {
      const body = await request.json();
      const validatedData = VideoSchema.parse(body);

      // Optional: Enrich metadata if title or thumbnail is missing
      if (!validatedData.thumbnail_url || !validatedData.title.trim()) {
        const enriched = await enrichVideoMetadata(
          validatedData.youtube_id,
          validatedData.title,
          validatedData.thumbnail_url
        );

        if (enriched.title && !validatedData.title.trim()) {
          validatedData.title = enriched.title;
        }

        if (enriched.thumbnail_url && !validatedData.thumbnail_url) {
          validatedData.thumbnail_url = enriched.thumbnail_url;
        }
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("videos")
        .insert(validatedData)
        .select(
          `
          *,
          video_categories (
            id,
            name,
            slug
          )
        `
        )
        .single();

      if (error) throw error;

      // Create audit log
      await createAuditLog({
        entity: "videos",
        entity_id: data.id,
        action: "CREATE",
        by_user: userId,
        after: data,
      });

      return successResponse(data, "Video created successfully");
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  });
}
