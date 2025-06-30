"use server"

import prisma from "@/utils/prisma";
import { getUser } from "./getUser";

export async function getFavoriteListings() {
    const user = await getUser();

    if(!user) return { ok: false, message: "Not auth", status: 403 }

    try {
        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(user.favoriteIds) || []]
                }
            }
        })
    
        return { ok: true, data: favoriteListings, status: 200 }
    } catch (error) {
        console.log(error.message)
        return { ok: false, message: "Could not find", status: 500 }
    }
}

export async function setFavorite(id){
    const user = await getUser();

    if(!user) return { ok: false, message: "Not auth", status: 403 }

    if(!id || typeof id !== 'string'){
        return { ok: false, message: "Id mismatch", status: 404 }
    }

    let favoriteIds = [...(user.favoriteIds) || []];

    favoriteIds.push(id);

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                favoriteIds
            }
        })
        return { ok: true, message: "updated"}
    } catch (error) {
        console.log(error.message)
        return { ok: false, message: "Could not set", status: 500 }
    }
}

export async function deleteFavorite(id){
    const user = await getUser();

    if(!user) return { ok: false, message: "Not auth", status: 403 }

    if(!id || typeof id !== 'string'){
        return { ok: false, message: "Id mismatch", status: 404 }
    }

    let favoriteIds = [...(user.favoriteIds) || []];

    favoriteIds = favoriteIds.filter((each) => each !== id );

    // example with number ids: [1, 5, ] 

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                favoriteIds
            }
        })
        return { ok: true, message: "deleted" }
    } catch (error) {
        console.log(error.message)
        return { ok: false, message: "Could not set", status: 500 }
    }

}