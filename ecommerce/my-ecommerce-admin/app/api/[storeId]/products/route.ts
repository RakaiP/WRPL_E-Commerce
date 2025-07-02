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

        const { name, price, categoryId, colorId, images, sizeId, isFeatured, isArchived } = body;
        

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name){
            return new NextResponse("Missing Name", {status: 400});
        }

        if(!price){
            return new NextResponse("Missing Price", {status: 400});
        }

        if(!categoryId){
            return new NextResponse("Missing Category ID", {status: 400});
        }

        if(!colorId){
            return new NextResponse("Missing Color ID", {status: 400});
        }
        
        if(!sizeId){
            return new NextResponse("Missing Size ID", {status: 400});
        }

        if(!images || !images.length ){
            return new NextResponse("Images are required", {status: 400});
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

        const products = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: asyncparams.storeId,
                images:{
                    createMany: {
                        data:[
                            ...images.map((image: { url: string }) => image)
                            
                        ]
                    }
                }

            }
        });

        return NextResponse.json(products);
    }catch(error){
        console.log('Product POST Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}


export async function GET(
    req:Request,
    { params }: { params: {storeId: string}}
){
    try{

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured') ;
        


        const asyncparams = await params;
       
        if(!asyncparams.storeId){
            return new NextResponse("Missing storeId", {status: 400});
        }

        const products = await prismadb.product.findMany({
            where:
            {
                storeId: asyncparams.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured : isFeatured  ?  true : undefined,
                isArchived: false
            },
            include:{
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        
        return NextResponse.json(products);
    }catch(error){
        console.log('Product GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
    
}