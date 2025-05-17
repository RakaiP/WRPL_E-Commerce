
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
){
    try{
        const { userId } = await auth();
        const  body = await req.json();

        const { name } = body;
        const asyncparams = await params;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("Missing name", {status: 400});
        }

        if(!asyncparams.storeId){
            return new NextResponse("Missing storeId", {status: 400});
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: asyncparams.storeId,
                userId
            },
            data: {
                name
            }
        });


    
    return NextResponse.json(store);
    }catch (error){
        console.log('Store PATCH Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
){
    try{
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }


        if(!params.storeId){
            return new NextResponse("Missing storeId", {status: 400});
        }
        
        const asyncparams = await params;
        const store = await prismadb.store.deleteMany({
            where: {
                id: asyncparams.storeId,
                userId
            }
        });


    
    return NextResponse.json(store);
    }catch (error){
        console.log('Store DELETE Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}