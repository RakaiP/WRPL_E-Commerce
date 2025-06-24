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

        const { label, imageUrl } = body;
        

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!label){
            return new NextResponse("Missing name", {status: 400});
        }

        if(!imageUrl){
            return new NextResponse("Missing image Url", {status: 400});
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: asyncparams.storeId

            },
        });

        return NextResponse.json(billboard);
    }catch(error){
        console.log('Billboard POST Error:', error);
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

        const billboard = await prismadb.billboard.findMany({
            where:
            {
                storeId: asyncparams.storeId
            }
        });

        
        return NextResponse.json(billboard);
    }catch(error){
        console.log('Billboard POST Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}