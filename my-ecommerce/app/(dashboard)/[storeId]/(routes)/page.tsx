import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getstockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";



interface DashboardPageProps{
    params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    

    const asyncParams = await params;  // ✅ Await params here
    const totalRevenue = await getTotalRevenue(asyncParams.storeId);
    const salesCount = await getSalesCount(asyncParams.storeId);
    const stockCount = await getstockCount(asyncParams.storeId);
    const graphRevenue = await getGraphRevenue(asyncParams.storeId);
    

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of your Store" />
                <Separator/>
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="text-sm font-medium">
                            <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                            Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                        
                    </Card>
                    <Card>
                        <CardHeader className="text-sm font-medium">
                            <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                            Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">
                                +{salesCount}
                            </div>
                        </CardContent>
                        
                    </Card>
                    <Card>
                        <CardHeader className="text-sm font-medium">
                            <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                            Product in Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold">
                                {stockCount}
                            </div>
                        </CardContent>
                        
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashboardPage;