
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
){
    try{
        
        if(!params.colorId){
            return new NextResponse("Missing Color Id", {status: 400});
        }
        
        const asyncparams = await params;
        const color = await prismadb.color.findUnique({
            where: {
                id: asyncparams.colorId,
                
            }
        });


    
    return NextResponse.json(color);
    }catch (error){
        console.log('Color GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}; 


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
){
    try{
        const { userId } = await auth();
        const  body = await req.json();

        const { name, value } = body;
        const asyncparams = await params;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!value){
            return new NextResponse("Value is required", {status: 400});
        }

        if(!asyncparams.colorId){
            return new NextResponse("Color ID is required", {status: 400});
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


        const color = await prismadb.color.updateMany({
            where: {
                id: asyncparams.colorId,
                
            },
            data: {
                name,
                value
            }
        });


    
    return NextResponse.json(color);
    }catch (error){
        console.log('Color PATCH Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
){
    try{
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const asyncparams = await params;
        
        if(!asyncparams.colorId){
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
        const color = await prismadb.color.deleteMany({
            where: {
                id: asyncparams.colorId,
                
            }
        });


    
    return NextResponse.json(color);
    }catch (error){
        console.log('Color DELETE Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};