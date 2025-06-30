"use server"

import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prisma"

export async function deleteProperty(id) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return { ok: false, message: "Not authorized", status: 403 };
  }

  try {
    // Delete all reservations for the listing first
    await prisma.reservation.deleteMany({
      where: {
        listingId: id,
      },
    });

    // Then delete the listing
    const res = await prisma.listing.deleteMany({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (res.count === 0) {
      return { ok: false, message: "No matching property found to delete", status: 404 };
    }

    return { ok: true, message: "Property deleted successfully", status: 200, data: res };
  } catch (error) {
    console.error("Error deleting property:", error);
    return {
      ok: false,
      message: "Something went wrong while deleting the property",
      status: 500,
    };
  }
}
