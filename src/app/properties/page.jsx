import PropertyBox from '@/components/PropertyBox'
import { getAuthSession } from '@/utils/auth'
import prisma from '@/utils/prisma'
import React from 'react'



async function PropertiesList() {
    const session = await  getAuthSession()
    if(!session ){
        return (
            <div> 
                Not Logged In 
            </div>
        )
    }
    const propertiesList = await prisma.listing.findMany({
        where:{
            userId : session.user.id

        }
    })
  return (
    <div className =" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {
            propertiesList.length> 0 ?(
                propertiesList.map(property=>{
                    return (
                        <PropertyBox key={property.id} each={property} />
                    )
                })
            ):(
                <div>
                    <h2 className="text-xl font-bold text-center mt-4">No Properties Found</h2>
                    <p className="text-gray-500 text-center">Looks like you have not added any properties yet.</p>
                </div>
            )
        }
    </div>
  )
}

export default PropertiesList