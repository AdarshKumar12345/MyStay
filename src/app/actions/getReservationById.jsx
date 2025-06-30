"use server"

import prisma from "@/utils/prisma"

export async function getReservationById(listingId){
    try{
        const reservation = await prisma.reservation.findMany({
            where:{listingId},
            include:{
                listing :true
            }
        })
        return reservation ;
    }catch(error){
        console.error("Error fetching reservation by ID:", error);
    }
}