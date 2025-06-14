
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
){
    try{
        const asyncparams = await params;
        if(!asyncparams.billboardId){
            return new NextResponse("Missing Billboard Id", {status: 400});
        }
        
        
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: asyncparams.billboardId,
                
            }
        });


    
    return NextResponse.json(billboard);
    }catch (error){
        console.log('Billboard GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}; 


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
){
    try{
        const { userId } = await auth();
        const  body = await req.json();

        const { label, imageUrl } = body;
        const asyncparams = await params;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!label){
            return new NextResponse("Label is required", {status: 400});
        }

        if(!imageUrl){
            return new NextResponse("Image URL is required", {status: 400});
        }

        if(!asyncparams.billboardId){
            return new NextResponse("Missing Billboard Id", {status: 400});
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


        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: asyncparams.billboardId,
                
            },
            data: {
                label,
                imageUrl
            }
        });


    
    return NextResponse.json(billboard);
    }catch (error){
        console.log('BillBoard PATCH Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
){
    try{
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const asyncparams = await params;
        
        if(!asyncparams.billboardId){
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
        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: asyncparams.billboardId,
                
            }
        });


    
    return NextResponse.json(billboard);
    }catch (error){
        console.log('Billboard DELETE Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};