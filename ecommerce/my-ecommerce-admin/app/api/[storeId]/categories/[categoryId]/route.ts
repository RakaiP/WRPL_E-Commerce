
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
){
    try{
        const asyncparams = await params;
        if(!asyncparams.categoryId){
            return new NextResponse("Missing Category Id", {status: 400});
        }
        
        
        const category = await prismadb.category.findUnique({
            where: {
                id: asyncparams.categoryId,
                
            },
            include:{
                billboard: true
            }
        });


    
    return NextResponse.json(category);
    }catch (error){
        console.log('Category GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}; 


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
){
    try{
        const { userId } = await auth();
        const  body = await req.json();

        const { name, billboardId } = body;
        const asyncparams = await params;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("name is required", {status: 400});
        }

        if(!billboardId){
            return new NextResponse("Billboard ID is required", {status: 400});
        }

        if(!asyncparams.categoryId){
            return new NextResponse("Missing Category Id", {status: 400});
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


        const categories = await prismadb.category.updateMany({
            where: {
                id: asyncparams.categoryId,
                
            },
            data: {
                name,
                billboardId
            }
        });


    
    return NextResponse.json(categories);
    }catch (error){
        console.log('Category PATCH Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
){
    try{
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const asyncparams = await params;
        
        if(!asyncparams.categoryId){
            return new NextResponse("Missing Category Id", {status: 400});
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
        const categories = await prismadb.category.deleteMany({
            where: {
                id: asyncparams.categoryId,
                
            }
        });


    
    return NextResponse.json(categories);
    }catch (error){
        console.log('Category DELETE Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};