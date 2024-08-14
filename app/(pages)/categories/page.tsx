"use client";

import React, { useEffect, useState } from "react";
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

interface Category {
  id: string;
  title: string;
  description: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://nextbuy-dashboard.vercel.app/api/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Table className="min-w-full bg-white border rounded-lg shadow-md ">
        <TableCaption className="text-center text-lg font-semibold">
          Categories List
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] font-bold">Category Name</TableHead>
            <TableHead className="font-bold">Description</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category: Category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.title}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Button
                    className="text-white bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoriesPage;
