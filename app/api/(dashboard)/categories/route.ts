import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import connect from "@/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();
    const categories = await Category.find();
    return new NextResponse(JSON.stringify(categories), {
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

export const POST = async (req: Request, res: Response) => {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
        status: 400,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const { title, description, imageURL } = await req.json();
    if (!title) {
      return new NextResponse(
        JSON.stringify({
          message: "Category title or description is required",
        }),
        {
          status: 400,
        }
      );
    }

    if (await Category.findOne({ title, description, user: userId })) {
      return new NextResponse(
        JSON.stringify({ message: "Category already exists" }),
        {
          status: 400,
        }
      );
    }

    const category = new Category({
      title,
      description,
      imageURL,
      user: userId,
    });
    await category.save();
    return new NextResponse(JSON.stringify(category), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message || "Error in creating the Category",
      }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    await connect();

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");
    const categoryId = searchParams.get("categoryId");

    // Validate user ID
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    // Validate category ID
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid category ID" }),
        {
          status: 400,
        }
      );
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Parse and validate request body
    const { title, description } = await req.json();
    if (!title || !description) {
      return new NextResponse(
        JSON.stringify({
          message: "Category title and description are required",
        }),
        {
          status: 400,
        }
      );
    }

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    // Update category
    category.title = title;
    category.description = description;
    await category.save();

    return new NextResponse(JSON.stringify(category), {
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

export const DELETE = async (req: Request) => {
  try {
    await connect();

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");
    const categoryId = searchParams.get("categoryId");

    // Validate user ID
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    // Validate category ID
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid category ID" }),
        {
          status: 400,
        }
      );
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    // Delete category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    return new NextResponse(JSON.stringify({ message: "Category deleted" }), {
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
