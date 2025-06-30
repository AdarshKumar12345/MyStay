import Image from "next/image";
import { getListings } from "./actions/getListing";
import { getUser } from "./actions/getUser";
import CategoryHandler from "@/components/category-handler";
import ListingsCard from "@/components/listing-card";

export default async function Home({ searchParams }) {
  const user = await getUser();
  const listings = await getListings(searchParams)

  if(listings.length == 0){
    return <section className="">
          <CategoryHandler />
      <div className="w-full h-screen grid place-items-center"> 
          <div className="text-center">
            <h1 className="text-3xl font-semibold">No Listings Found</h1>
            <p>Maybe change your filters</p>
          </div>
      </div>
    </section>
  }

  return <section className="">
    <CategoryHandler />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
      {listings.map(listing => {
        return <ListingsCard key={listing.id} user={user} listing={listing} />
      })}
    </div>
  </section>
}
