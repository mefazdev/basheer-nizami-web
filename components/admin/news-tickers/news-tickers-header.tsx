import { Plus } from "lucide-react";

import { CreateNewsTickerModal } from "./create-news-ticker-modal";
import { Button } from "@/components/ui/Button";

export function NewsTickersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight  text-white">
          News Tickers
        </h1>
        <p className="mt-2 text-sm  text-gray-300">
          Manage news tickers and announcements displayed on your site
        </p>
      </div>

      <CreateNewsTickerModal>
        <Button className="bg-blue-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add News Ticker
        </Button>
      </CreateNewsTickerModal>
    </div>
  );
}
