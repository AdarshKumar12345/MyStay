import prisma from "@/utils/prisma";
import { getAuthSession } from "@/utils/auth"; 
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const session = await getAuthSession();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description,
      price,
      category,
      location,
      roomCount,
      guestCount,
      childCount,
      imageSrc,
    } = data;


    if (!title || !price || !category || !location || !imageSrc) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }


    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        roomCount: parseInt(roomCount, 10),
        guestCount: parseInt(guestCount, 10),
        childCount: parseInt(childCount, 10),
        locationValue: location.value,
        imageSrc,
        userId: session.user.id, 
      },
    });

    return NextResponse.json(
      { message: "Created successfully", listing: newListing },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { message: "Failed to create listing", error: error.message },
      { status: 500 }
    );
  }
}
