"use client";


import { Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useParams,useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Size } from "@prisma/client";




const formSchema = z.object({
    name: z.string().min(1),
    value : z.string().min(1, "value is required"),
})

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
    initialData: Size | null;
};



export const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const title = initialData ? "Edit Size" : "New Size";
    const description = initialData ? "Update Size" : "Create a new Size";
    const toastMessage = initialData ? "Size updated" : "Size created";
    const action = initialData ? "Save changes" : "Create Size";

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:'',
            value:''
        }
    });

    const onSubmit = async (data: SizeFormValues) => {
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
            }else{
                await axios.post(`/api/${params.storeId}/sizes`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success(toastMessage);
        }catch (error){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success("Size deleted");

        }catch(error){
            toast.error("Make sure you removed all products using this Size");
        }finally{ 
            setLoading(false)
            setOpen(false)
        }
    }

    return (
            <>
                <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {onDelete()}}
                loading={loading}
                    />
                <div className="flex items-center justify-between">
                    <Heading
                        title={title}
                        description={description}
                    /> 
                {initialData && (
                    <Button
                    variant="destructive"
                    size="sm"
                    className="border-2 border-transparent hover:border-red-500 hover:bg-white hover:text-red-600 transition-colors duration-200"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4   " />
                </Button>
                    )}
                </div>
                <Separator />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full"> 
                            <div className="grid grid-cols-2 gap-8"> 
                                <FormField control={form.control}
                                    name = "name"
                                    render = {({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Size Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem> 
                                    )}
                                />
                                <FormField control={form.control}
                                    name = "value"
                                    render = {({ field }) => (
                                        <FormItem>
                                            <FormLabel>Value</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Value" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem> 
                                    )}
                                />
                            </div> 
                        <Button disabled= {loading} className= "ml-auto" type="submit">
                            {action}
                        </Button>
                        </form>
                    </Form>
                    <Separator />
            </>
    );
};