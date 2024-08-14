"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  name: string;
  description: string;
  status: string;
}

const blogs: Blog[] = [
  {
    id: "INV001",
    name: "Blog 1",
    description: "lorem ipsum dolor ",
    status: "active",
  },
  // Add more products here
];

const BlogsPage: React.FC = () => {
  const handleEdit = (id: string) => {
    // Logic to handle edit
    console.log(`Edit category with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Logic to handle delete
    console.log(`Delete category with id: ${id}`);
  };

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Table className="min-w-full bg-white border rounded-lg shadow-md ">
        <TableCaption className="text-center text-lg font-semibold">
          Blogs List
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] font-bold">Blog Name</TableHead>
            <TableHead className="font-bold">Description</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length > 0 ? (
            blogs.map((blog: Blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.name}</TableCell>
                <TableCell>{blog.description}</TableCell>
                <TableCell>{blog.status}</TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Button
                    className="text-white bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleEdit(blog.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No blogs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
1;

export default BlogsPage;
