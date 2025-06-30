import { getFavoriteListings } from '@/app/actions/favorites';
import { getUser } from '@/app/actions/getUser';
import ListingsCard from '@/components/listing-card';
import { getAuthSession } from '@/utils/auth'
import { notFound } from 'next/navigation';
import React from 'react'

async function Favorites() {

    const user = await getUser();

    if(!user) notFound();

    const {data: favorites} = await getFavoriteListings();

    if(favorites.length == 0) {
        return (
            <div className='flex items-center justify-center h-full text-gray-500'>
                No favorites found.
            </div>
        )
    }

  return (
    <div className='p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-5'>
        { favorites.map(each=> (
            <ListingsCard
                key={each.id}
                listing={each}
                user={user}
            />
        ))}
    </div>
  )
}

export default Favorites