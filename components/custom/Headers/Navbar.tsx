"use client";

import images from "@/public/images";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-primary dark:bg-slate-700 py-2 px-5 flex justify-between items-center">
      <Link href={"/"} className="">
        <Image src={images["logo"]} alt="logo" width={75} height={75} />
      </Link>
      <Link href={"/"}>
        <div className="text-4xl font-bold">
          <h1 className="text-white">
            <span className="text-red-700">.</span>Next
            <span className="text-red-700">|</span>Buy
            <span className="text-red-700">.</span>
          </h1>
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={images["avatar"]}
              alt="avatar"
              className="rounded-full w-full h-full object-cover border-white border-2"
            />
            <AvatarFallback className="rounded-full bg-gray-500 text-white flex items-center justify-center w-full h-full">
              BT
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-12">
          <Image
            src={images["avatar"]}
            alt="avatar"
            width={500}
            height={500}
            className="rounded-full w-20 h-20 object-cover border-slate-600 mx-auto border-2 mt-2"
          />
          <DropdownMenuLabel className="flex justify-center font-bold text-md">
            John Doe
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex justify-center font-bold text-md">
            John.Doe@gmail.com
          </DropdownMenuLabel>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="mx-auto">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
