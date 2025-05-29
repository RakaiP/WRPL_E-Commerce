import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
    req:Request,
    { params }: { params: {storeId: string}}
){
    try{
        const { userId } = await auth();
        const body = await req.json();

        const asyncparams = await params;

        const { name, value } = body;
        

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name){
            return new NextResponse("Missing name", {status: 400});
        }

        if(!value){
            return new NextResponse("Value required", {status: 400});
        }

        if(!asyncparams.storeId){
            return new NextResponse("Missing storeId", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: asyncparams.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403});
        }

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: asyncparams.storeId

            },
        });
 
        return NextResponse.json(color);
    }catch(error){
        console.log('Colors POST Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}


export async function GET(
    req:Request,
    { params }: { params: {storeId: string}}
){
    try{

        const asyncparams = await params;
       
        if(!asyncparams.storeId){
            return new NextResponse("Missing storeId", {status: 400});
        }

        const color = await prismadb.color.findMany({
            where:
            {
                storeId: asyncparams.storeId
            }
        });

        
        return NextResponse.json(color);
    }catch(error){
        console.log('Colors GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}