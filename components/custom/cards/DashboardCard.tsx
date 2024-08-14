import { Card, CardContent } from "@/components/ui/card";
import React from "react";
3;

import { ReactNode } from "react";

interface DashboardCardProps {
  count: number;
  title: string;
  icon: ReactNode;
}

const DashboardCard = ({ count, title, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 p-4 pb-0">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-slate-500">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          {icon}
          <h3 className="text-5xl font-semibold text-slate-500">{count}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
