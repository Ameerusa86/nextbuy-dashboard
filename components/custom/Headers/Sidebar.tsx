"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BottomSidebarLinks, TopSidebarLinks } from "@/constants/SidebarLinks";
import { ChevronLeft, Menu } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-20 bottom-0 flex flex-col bg-primary transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex items-center justify-between p-4 ml-4">
          <span
            className={`text-white font-bold ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Menu
          </span>
        </div>
        <div className="flex-1 ml-4">
          <nav className="space-y-2">
            {TopSidebarLinks.map((link) => (
              <Link
                className={`flex items-center p-2 rounded-md hover:bg-blue-700 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                key={link.name}
                href={link.href}
                passHref
              >
                <link.icon className="h-5 w-5 text-white" />
                {!isCollapsed && (
                  <span className="ml-3 text-white">{link.name}</span>
                )}
              </Link>
            ))}
          </nav>
          <Separator className="my-4 mx-auto" />
          <nav className="space-y-2">
            {BottomSidebarLinks.map((link) => (
              <Link
                className={`flex items-center p-2 rounded-md hover:bg-blue-700 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                key={link.name}
                href={link.href}
                passHref
              >
                <link.icon className="h-5 w-5 text-white" />
                {!isCollapsed && (
                  <span className="ml-3 text-white">{link.name}</span>
                )}
              </Link>
            ))}
          </nav>
          <Button onClick={toggleSidebar} className="text-white mt-4">
            {isCollapsed ? (
              <Menu size={25} className="h-4 w-4" />
            ) : (
              <ChevronLeft size={25} className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
