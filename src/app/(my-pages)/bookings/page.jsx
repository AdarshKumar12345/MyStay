
import { getUser } from "@/app/actions/getUser"
import { getReservation } from "@/app/actions/setReservation"
import BookCard from "@/components/BookCard"
import { getAuthSession } from "@/utils/auth"
import formatMoney from "@/utils/formatMoney"
import Image from "next/image"
import Link from "next/link"


export default async function BookingsPage(){
    const user = await getUser()
    if(!user){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">You must be logged in to view bookings</h1>
                <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </div>
        )
    }
    const {data} = await getReservation(user.id )

    if( data.length === 0){
        return (
            <div>
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">No Bookings Found</h1>
                    <p className="text-gray-500">Looks like you have no bookings yet.</p>
                    <Link href="/" className="text-blue-500 hover:underline mt-4">Browse Listings</Link>
                </div>
            </div>
        )
    }
    return(
        <div className="flex flex-col justify-center ">
            <div className=" flex items-center justify-center p-3">
                
                <h1 className="text-2xl font-bold mb-4">
                   Your Bookings
                </h1>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 p-4">
                {
                    data.length>0? (
                       data.map(reservation=>{
                        
                           return (<BookCard key={reservation.id} resv={reservation} />)
                       })
                    ) :( 
                        <div className="text-center">
                            <h2 className="text-xl font-bold">No Bookings Found</h2>
                            <p className="text-gray-500">Looks like you have no bookings yet.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
