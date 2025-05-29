import prismadb from "@/lib/prismadb";
import { ColorsForm } from "./components/color-form";

const ColorsPage = async ({
    params
} : {
    params: {
        colorId: string;
    }

}) => {

    const asyncparams = await params;
    const color = await prismadb.color.findUnique({
        where: {
            id: asyncparams.colorId
        }
    });

    return ( 
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsForm initialData={color}/>
            </div>
        </div>
     );
}
 
export default ColorsPage;