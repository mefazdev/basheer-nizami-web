import { NextRequest } from "next/server";

import { NewsTickerSchema } from "@/lib/validation/news-ticker";
import { createAuditLog } from "@/lib/audit";
import { handleError, withAuth, successResponse } from "@/lib/api-helpers";
import type { NewsTicker } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "20");
      const search = searchParams.get("search") || "";
      const published = searchParams.get("published");

      const supabase = createClient();

      let query = supabase
        .from("news_tickers")
        .select("*", { count: "exact" })
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (search) {
        query = query.ilike("text", `%${search}%`);
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
        data: data as NewsTicker[],
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
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (userId) => {
    try {
      const body = await request.json();
      const validatedData = NewsTickerSchema.parse(body);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("news_tickers")
        .insert(validatedData)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await createAuditLog({
        entity: "news_tickers",
        entity_id: data.id,
        action: "CREATE",
        by_user: userId,
        after: data,
      });

      return successResponse(data, "News ticker created successfully");
    } catch (error) {
      return handleError(error);
    }
  });
}
