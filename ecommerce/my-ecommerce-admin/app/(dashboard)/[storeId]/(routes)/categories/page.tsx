
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns/format";

const CategoriesPage = async ({
    params
}: {
     params : {storeId: string}
}) => {


    const asyncparams = await params;
    
    const categories = await prismadb.category.findMany({
        where: {
            storeId: asyncparams.storeId
    },
    include: {
        billboard: true
    },
    orderBy: {
        createdAt: 'desc'}
    });
    

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardlabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
            
        </div>
    )
};

export default CategoriesPage;