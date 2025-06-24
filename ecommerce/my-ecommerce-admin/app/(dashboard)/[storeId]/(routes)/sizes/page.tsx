
import prismadb from "@/lib/prismadb";
import { SizesClient } from "./components/client";
import { SizesColumn } from "./components/columns";
import { format } from "date-fns/format";

const SizesPage = async ({
    params
}: {
     params : {storeId: string}
}) => {


    const asyncparams = await params;
    
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: asyncparams.storeId
    },
    orderBy: {
        createdAt: 'desc'}
    });

    const formattedSizes: SizesColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value:item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
            
        </div>
    )
};

export default SizesPage;