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

// Define the Product type
interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  description: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id: string) => {
    // Logic to handle edit
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Logic to handle delete
    console.log(`Delete product with id: ${id}`);
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
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Table className="min-w-full bg-white border rounded-lg shadow-md ">
        <TableCaption className="text-center text-lg font-semibold">
          Products List
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] font-bold">Product Name</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Quantity</TableHead>
            <TableHead className="font-bold">Description</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>$ {product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Button
                    className="text-white bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsPage;
