
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
){
    try{
        const asyncparams = await params;
        if(!asyncparams.productId){
            return new NextResponse("Missing Product Id", {status: 400});
        }
        
        
        const products = await prismadb.product.findUnique({
            where: {
                id: asyncparams.productId,
                
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            }
        });


    
    return NextResponse.json(products);
    }catch (error){
        console.log('Product GET Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}; 


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
){
    try{
        const { userId } = await auth();
        const  body = await req.json();

        const { name, price, categoryId, colorId, images, sizeId, isFeatured, isArchived } = body;

        const asyncparams = await params;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

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

        if(!asyncparams.productId){
            return new NextResponse("Missing Product Id", {status: 400});
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


        await prismadb.product.update({
            where: {
                id: asyncparams.productId,
                
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived
            }
        });

        const products = await prismadb.product.update({
            where:{
                id: asyncparams.productId
            },
            data:{
                images: {
                    createMany: {
                        data:[
                            ...images.map((image: {url: string}) => image)
                        ]
            }}},
        })
    
    return NextResponse.json(products);
    }catch (error){
        console.log('Product PATCH Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
){
    try{
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const asyncparams = await params;
        
        if(!asyncparams.productId){
            return new NextResponse("Missing Product Id", {status: 400});
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
        const products = await prismadb.product.deleteMany({
            where: {
                id: asyncparams.productId,
                
            }
        });


    
    return NextResponse.json(products);
    }catch (error){
        console.log('Product DELETE Error:', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};