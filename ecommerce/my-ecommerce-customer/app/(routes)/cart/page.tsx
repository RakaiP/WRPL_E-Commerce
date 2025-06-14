"use client";

import { Suspense } from "react";
import Container from "@/app/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import Summary from "./components/summary";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

// Create a separate client component for the cart content
const CartContent = () => {
    const cart = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Ensure cart.items is always an array to prevent map errors
    const cartItems = Array.isArray(cart.items) ? cart.items : [];

    return ( 
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cartItems.length === 0 && <p className="text-neutral-500">No Items in Cart</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Summary/>
                </div>
            </Container>
        </div>
     );
};

// Export the main page component with Suspense
export default function CartPage() {
    return (
        <Suspense fallback={<div>Loading cart...</div>}>
            <CartContent />
        </Suspense>
    );
}