import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
    params
} : {
    params: {
        billboardId: string;
    }

}) => {

    const asyncparams = await params;
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: asyncparams.billboardId
        }
    });

    return ( 
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard}></BillboardForm>
            </div>
        </div>
     );
}
 
export default BillboardPage;