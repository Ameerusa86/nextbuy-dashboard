"use client";

import { useState } from "react";
import DashboardCard from "@/components/custom/cards/DashboardCard";
import Link from "next/link";
import { Barcode, ChartBarStacked, Rss, Users } from "lucide-react";

export default function Home() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <DashboardCard
          count={25}
          title="Products"
          icon={<Barcode size={72} className="text-slate-500" />}
        />
        <div className={`${showAll ? "" : "hidden sm:block"}`}>
          <DashboardCard
            count={25}
            title="Blogs"
            icon={<Rss size={72} className="text-slate-500" />}
          />
        </div>
        <div className={`${showAll ? "" : "hidden sm:block"}`}>
          <DashboardCard
            count={25}
            title="Categories"
            icon={<ChartBarStacked size={72} className="text-slate-500" />}
          />
        </div>
        <div className={`${showAll ? "" : "hidden sm:block"}`}>
          <DashboardCard
            count={25}
            title="Users"
            icon={<Users size={72} className="text-slate-500" />}
          />
        </div>
      </div>

      {!showAll && (
        <div className="flex justify-center sm:hidden">
          <Link href="/categories">
            <button
              onClick={() => setShowAll(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Show More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
