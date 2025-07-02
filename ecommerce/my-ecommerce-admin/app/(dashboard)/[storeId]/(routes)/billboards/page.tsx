
import prismadb from "@/lib/prismadb";
import { BillBoardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns/format";

const BillBoardsPage = async ({
    params
}: {
     params : {storeId: string}
}) => {


    const asyncparams = await params;
    
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: asyncparams.storeId
    },
    orderBy: {
        createdAt: 'desc'}
    });

    const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoardClient data={formattedBillboard} />
            </div>
            
        </div>
    )
};

export default BillBoardsPage;