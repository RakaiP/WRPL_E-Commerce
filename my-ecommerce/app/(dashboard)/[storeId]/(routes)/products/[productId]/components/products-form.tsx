"use client";

import {  Category, Color, Image, Product, Size } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";




const formSchema = z.object({
    name: z.string().min(1),
    images : z.object({
        url: z.string()
    }).array(),
    price: z.coerce.number().int().positive().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

type ProductsFormValues = z.infer<typeof formSchema>;

interface ProductsFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    categories: Category[];
    sizes: Size[];
    colors: Color[];
};



export const ProductsForm: React.FC<ProductsFormProps> = ({
    initialData,
    categories,
    sizes,
    colors
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const title = initialData ? "Edit Product" : "New Product";
    const description = initialData ? "Update Product Information" : "Create a new Product";
    const toastMessage = initialData ? "Product updated" : "Product created";
    const action = initialData ? "Save changes" : "Create Product";

    const form = useForm<ProductsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price : parseFloat(String(initialData?.price)),
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false,
        },
        mode : "onChange"
    });

    const onSubmit = async (data: ProductsFormValues) => {
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
            }else{
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted");

        }catch(error){
            toast.error("Something went Wrong");
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
                            <FormField 
                                    control={form.control}
                                    name = "images"
                                    render = {({ field }) => (
                                        <FormItem>
                                            <FormLabel>Images</FormLabel>
                                            <FormControl>
                                               <ImageUpload 
                                                value={field.value.map((image) => image.url)}
                                                disabled = {loading}
                                                onChange={(url) => {
                                                    const currentImages = form.getValues("images") || []; // Ensure currentImages is always an array
                                                    const newImage = { url }; // Create a new image object with the URL
                                                    const updatedImages = [...currentImages, newImage]; // Append the new image to the array
                                                    form.setValue("images", updatedImages, { shouldValidate: true }); // Update the form with validation
                                                    console.log("Updated images:", updatedImages); // Debugging log
                                                }}
                                                
                                                
                                                onRemove = {(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                                />    
                                            </FormControl> 
                                            <FormMessage />
                                        </FormItem> 
                                    )}
                                />
                            <div className="grid grid-cols-3 gap-8"> 
                                <FormField control={form.control}
                                    name = "name"
                                    render = {({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Product Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem> 
                                    )}
                                />
                                <FormField control={form.control}
                                    name = "price"
                                    render = {({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={loading} placeholder="Product Label" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem> 
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                                </SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="sizeId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Size</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a Size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem key={size.id} value={size.id}>
                                                {size.name}
                                                </SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="colorId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem key={color.id} value={color.id}>
                                                {color.name}
                                                </SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control}
                                    name = "isFeatured"
                                    render = {({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">  
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    //@ts-ignore
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>This Product will appear in homepage</FormLabel>
                                            </div>
                                               
                                        </FormItem> 
                                    )}
                                    />
                                <FormField control={form.control}
                                    name = "isArchived"
                                    render = {({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">  
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    //@ts-ignore
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>This Product will be Archived</FormLabel>
                                            </div>
                                               
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