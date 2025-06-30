"use server"

import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prisma";
import { get } from "react-hook-form";
import { getUser } from "./getUser";

export async function getReservation(){
    const session = await getAuthSession()
    if(!session || !session.user){
        return { ok:false , message:" You must be logged in to view reservations" , status:401};
    }
    try {
        const reservations = await prisma.reservation.findMany({
            where:{
                userId: session.user.id
            },
            include:{
                listing:true
            }
        })
        return { ok:true , message:"Reservations fetched successfully" , status:200, data: reservations };
    }catch(error){
        console.error("Error fetching reservations:", error);
        return { ok:false , message:"Something went wrong while fetching reservations" , status:500};
    }

}


export async function setReservation({ listingId , startDate , endDate , price}){
    const session = await getAuthSession()

    if( !session || !session.user){
        return { ok:false , message:" You must be logged in to make a reservation" , status:401};
    }
    if(!listingId || !startDate || !endDate || !price){
        return { ok:false , message:"All fields are required" , status:400};

    }
    try{
        const reservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                reservations: {
                    create:{
                        userId :session.user.id,
                        startDate,
                        endDate,
                        totalPrice:price,

                    }
                }
            }
        })
        return { ok:true , message:"Reservation created successfully" , status:200, reservation };
    }
    catch(error){
        console.error("Error creating reservation:", error);
        return { ok:false , message:"Something went wrong while creating the reservation" , status:500};
    }

}

export async function DeleteReservation(reservationId){
    
    const user = await getUser();

    if ( !user){
        return { ok: false, message: 'You must be logged in to delete a reservation', status: 401 };
    }

    if(!reservationId || typeof reservationId !== 'string'){
    return { ok: false, message: 'Unable to delete reservation', status: 402 }
    }

    try{
        const reservatioin = await prisma.reservation.deleteMany({
            where:{
                id : reservationId ,
                 OR: [{ userId: user.id }, { listing: { userId: user.id }}]
            }
        })
        console.log("cancel reservation " );
        return { ok:true , message:"Reservation deleted successfully" , status:200, reservation: reservatioin };
    } catch(error){
        console.error("Error deleting reservation:", error);
        return { ok:false , message:"Something went wrong while deleting the reservation" , status:500};
    }

}

