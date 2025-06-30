"use server"
import prisma from '@/utils/prisma';
import React from 'react'

async function getListingsById(id) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: id
    },
    include:{
        user:{
            select:{
                name:true
            } 
        }
    }
  });
  return listing;
}

export default getListingsById