// Not inside UI because it is a component that is not reusable (only in specific layout)

import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";


const Navbar = async() => {
    const { userId } = await auth();

    if(!userId) {
        redirect("/sign-in");
    }


    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    });
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4 justify-between">
                {/* Left Side: Store Switcher + Routes */}
                <div className="flex items-center space-x-4">
                    <StoreSwitcher items ={stores}/>
                    <MainNav />
                </div>

                {/* Right Side: User Button */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

