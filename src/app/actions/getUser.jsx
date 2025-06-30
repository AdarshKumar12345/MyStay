import { getAuthSession } from "@/utils/auth";

export async function getUser(){
    const session = await  getAuthSession();
    try{

        if(!session || !session.user) return null;

        const currentUser = await prisma.user.findUnique({
            where: {
               email :session.user.email,
            },
        })
        if(!currentUser) return null ;
        return currentUser;
    }catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}