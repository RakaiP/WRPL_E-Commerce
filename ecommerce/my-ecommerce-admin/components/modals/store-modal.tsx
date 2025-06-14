"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true);
 
            
            const response = await axios.post('/api/stores', values);

            window.location.assign(`/${response.data.id}`); //if use router database is not ready and the modal will not close
        }catch(error){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return(
    <Modal
        title= "Create Store"
        description="Add a new store to manage products  and categories"
        isOpen = {StoreModal.isOpen}
        onClose={StoreModal.onClose}
    >
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name = "name"
                    render = {({ field }) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input 
                                disabled={loading} 
                                placeholder="E-Commerce"{...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}></FormField>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button 
                    disabled={loading}
                    variant="outline" 
                    onClick={StoreModal.onClose}>
                        Cancel</Button>
                    <Button 
                    disabled={loading} 
                    type="submit">Continue</Button>
                </div>
            </form>
            </Form>
        </div>
    </Modal>
    );
};