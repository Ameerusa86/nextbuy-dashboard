import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import Blog from "@/lib/models/blog";
import connect from "@/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// Get single blog
export const GET = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");
    const categoryId = searchParams.get("categoryId");

    // Validate user ID
    if (userId && !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    // Validate category ID
    if (categoryId && !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid category ID" }),
        {
          status: 400,
        }
      );
    }

    // Validate blog ID
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid blog ID" }), {
        status: 400,
      });
    }

    // Get the single blog
    const blog = await Blog.findOne({
      _id: blogId,
      ...(userId && { user: userId }),
      ...(categoryId && { category: categoryId }),
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(blog), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
};

// Update blog
export const PATCH = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");
    const categoryId = searchParams.get("categoryId");
    const body = await req.json();
    const { title, description } = body;

    // Validate user ID
    if (userId && !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    // Validate category ID
    if (categoryId && !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid category ID" }),
        {
          status: 400,
        }
      );
    }

    // Validate blog ID
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid blog ID" }), {
        status: 400,
      });
    }

    // Get the single blog
    const blog = await Blog.findOne({
      _id: blogId,
      ...(userId && { user: userId }),
      ...(categoryId && { category: categoryId }),
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    return new NextResponse(JSON.stringify(updatedBlog), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in update the Blog" }),
      {
        status: 500,
      }
    );
  }
};

// Delete blog
export const DELETE = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || searchParams.get("id");
    const categoryId = searchParams.get("categoryId");

    // Validate user ID
    if (userId && !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    // Validate category ID
    if (categoryId && !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid category ID" }),
        {
          status: 400,
        }
      );
    }

    // Validate blog ID
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid blog ID" }), {
        status: 400,
      });
    }

    // Get the single blog
    const blog = await Blog.findOne({
      _id: blogId,
      ...(userId && { user: userId }),
      ...(categoryId && { category: categoryId }),
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(blogId);

    return new NextResponse(JSON.stringify({ message: "Blog deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in delete the Blog" }),
      {
        status: 500,
      }
    );
  }
};
