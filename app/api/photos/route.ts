import { NextRequest } from "next/server";

import { PhotoSchema } from "@/lib/validation/photo";
import { createAuditLog } from "@/lib/audit";
import { handleError, withAuth, successResponse } from "@/lib/api-helpers";
import type { PhotoWithCategory } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

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
        .from("photos")
        .select(
          `
          *,
          photo_categories (
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
        data: data as PhotoWithCategory[],
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
      const validatedData = PhotoSchema.parse(body);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("photos")
        .insert(validatedData)
        .select(
          `
          *,
          photo_categories (
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
        entity: "photos",
        entity_id: data.id,
        action: "CREATE",
        by_user: userId,
        after: data,
      });

      return successResponse(data, "Photo created successfully");
    } catch (error) {
      return handleError(error);
    }
  });
}
