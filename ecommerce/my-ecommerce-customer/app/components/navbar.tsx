import MainNav from "./main-nav";
import Container from "./ui/container";
import Link from "next/link";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
    const categories = await getCategories();

    return ( 
        <div className ="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="flex ml-4 lg:ml-0 gap-x-2">
                <p className="font-bold text-xl">Store</p>
                </Link>
                <MainNav data = {categories} />
                <NavbarActions />
                </div>
            </Container>
        </div>
     );
}
 
export default Navbar;