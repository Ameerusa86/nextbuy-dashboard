import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import connect from "@/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/lib/models/product";

// Utility function to create a response with JSON and a status code
const createResponse = (message: string, status: number, data: any = null) => {
  return new NextResponse(
    JSON.stringify({
      success: status < 400,
      message,
      ...(data && { data }),
    }),
    { status }
  );
};

// GET request handler
export const GET = async (req: Request) => {
  try {
    await connect();

    const products = await Product.find();

    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
      }
    );
  }
};

// POST request handler
export const POST = async (req: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return createResponse("Invalid user ID", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return createResponse("User not found", 404);
    }

    const { title, description, price, category, quantity } = await req.json();
    if (!title || !description || !price || !category) {
      return createResponse(
        "Title, description, price, and category are required",
        400
      );
    }

    if (!Types.ObjectId.isValid(category)) {
      return createResponse("Invalid category ID", 400);
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return createResponse("Category not found", 404);
    }

    const product = new Product({
      title,
      description,
      price,
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(category),
      quantity: quantity ?? 1, // Ensure quantity is handled even if it's not provided
    });

    await product.save();

    return createResponse("Product created successfully", 201, product);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return createResponse("Internal server error", 500);
  }
};
