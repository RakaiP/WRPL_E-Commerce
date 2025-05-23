"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardsClientProps {
    data: BillboardColumn[]
}

export const BillBoardClient:React.FC<BillboardsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex justify-between items-center mb-4">
            <Heading 
            title={`Billboards (${data.length})`} 
            description="Manage BillBoards for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
            </Button>
        </div>
        <Separator/> 
        <DataTable searchKey="label" columns={columns} data={data}/>
        <Heading title="API" description="Use the following API to fetch Billboards" />
        <Separator/>
        <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    )
}