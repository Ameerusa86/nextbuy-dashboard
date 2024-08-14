import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

// Helper function to handle errors
const handleErrorResponse = (
  error: any,
  message: string,
  status: number = 500
) => {
  console.error("Error:", error); // Log the error for debugging
  return new NextResponse(JSON.stringify({ error: message }), { status });
};

// Input validation function
const validateUserInput = (data: any) => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new Error("Please provide 'name', 'email', and 'password'.");
  }
  if (typeof email !== "string" || !email.includes("@")) {
    throw new Error("Please provide a valid email address.");
  }
  if (password.length < 6) {
    throw new Error("Password should be at least 6 characters long.");
  }
};

export const GET = async () => {
  try {
    await connect();
    const users = await User.find().lean(); // Use lean for performance if no virtuals are needed
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(
      error,
      "Unable to retrieve users at the moment."
    );
  }
};

export const POST = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();

    // Validate input data
    validateUserInput(body);

    // Check for existing user with the same email or name
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { name: body.name }],
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: "A user with this email or name already exists.",
        }),
        { status: 409 } // Conflict status code
      );
    }

    // Create a new user object
    const newUser = new User(body);

    await newUser.save();

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    // Improved error handling to capture and return detailed error information
    return handleErrorResponse(
      error,
      "An error occurred while creating the user.",
      400
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id") || searchParams.get("userId");

    if (!userId) {
      return handleErrorResponse(
        null,
        "Please provide the 'id' of the user you want to update.",
        400
      );
    }

    const updatedData = body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "No user found with the provided ID." }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User details have been updated successfully.",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "CastError") {
      return handleErrorResponse(
        error,
        "The provided User ID format is invalid.",
        400
      );
    }
    return handleErrorResponse(error, "Failed to update the user.");
  }
};

export const DELETE = async (req: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id") || searchParams.get("userId");

    if (!userId) {
      return handleErrorResponse(
        null,
        "Please provide the 'id' of the user you want to delete.",
        400
      );
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return new NextResponse(
        JSON.stringify({ message: "No user found with the provided ID." }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User has been deleted successfully.",
        user: deleteUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "CastError") {
      return handleErrorResponse(
        error,
        "The provided User ID format is invalid.",
        400
      );
    }
    return handleErrorResponse(error, "Failed to delete the user.");
  }
};
