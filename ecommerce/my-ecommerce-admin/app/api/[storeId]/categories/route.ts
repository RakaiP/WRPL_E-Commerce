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

        const { name, billboardId } = body;
        

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!billboardId){
            return new NextResponse("Billboard ID is required", {status: 400});
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

        const categories = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: asyncparams.storeId

            },
        });

        return NextResponse.json(categories);
    }catch(error){
        console.log('Category POST Error:', error);
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

        const categories = await prismadb.category.findMany({
            where:
            {
                storeId: asyncparams.storeId
            }
        });

        
        return NextResponse.json(categories);
    }catch(error){
        console.log('Category POST Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}