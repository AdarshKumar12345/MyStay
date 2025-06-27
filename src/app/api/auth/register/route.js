import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

export async function POST(request){
    
    const body = await request.json();
    const {name , email, password} = body ;
    if ( !name || !email || !password){
        return NextResponse.json({message :"Name, email and password are required"},{status : 400});
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    try{
        const user = await prisma.user.create({
           data:{
                name: name,
                email: email ,
                hashedPassword: hashedpassword
           }

        })
        console.log(user , "user created")
        return NextResponse.json({message :"user created successfully"} , {status : 202});

    }catch(error){
        console.error("Error creating user:" , error);
        return NextResponse.json({message :"Internal server error"} , {status : 500});
    }

}

 