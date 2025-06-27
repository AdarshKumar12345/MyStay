import BecomeAHostComponent from "@/components/BecomeaHostCmponent";
import { getAuthSession } from "@/utils/auth"
import Link from "next/link";



export default async function BecomeAHostPage(){
    const session = await getAuthSession();
    if( !session ){
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <h1 className="text-2xl font-bold">You must be logged in to become a host</h1>
                <p className="text-lg">Please log in to continue.<Link className="text-blue-600 hover:underline" href="/sign-in">Log in</Link></p>
            </div>
        )
    }
    return(
        <div>
            <BecomeAHostComponent/>
        </div>
    )
}