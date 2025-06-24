import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
    try {
        const { productIds } = await req.json();
        const { storeId } = await params; 

        if(!productIds || productIds.length === 0) {
            return new NextResponse("Product ids are required", { status: 400 });
        }

        if (!process.env.FRONTEND_STORE_URL) {
            return new NextResponse("Frontend store URL not configured", { status: 500 });
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            line_items.push({
                quantity: 1,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: Number(product.price) * 100
                }
            })
        })

        const order = await prismadb.order.create({
            data: {
                storeId: storeId,
                isPaid: false,
                orderItems: {
                    create: productIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId
                            }
                        }
                    }))
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
            metadata: {
                orderId: order.id
            }
        })

        return NextResponse.json({ url: session.url }, {
            headers: corsHeaders,
        })
    } catch (error) {
        console.error("[CHECKOUT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}