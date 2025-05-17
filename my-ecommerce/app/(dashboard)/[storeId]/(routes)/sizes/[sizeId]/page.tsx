import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizesPage = async ({
    params
} : {
    params: {
        sizeId: string;
    }

}) => {

    const asyncparams = await params;
    const size = await prismadb.size.findUnique({
        where: {
            id: asyncparams.sizeId
        }
    });

    return ( 
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size}/>
            </div>
        </div>
     );
}
 
export default SizesPage;