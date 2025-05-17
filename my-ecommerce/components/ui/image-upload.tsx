"use client";   

import { useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";


interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value : string) => void;
    onRemove: (value : string) => void;
    value: string[];
}


const ImageUpload:React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false);
    
        useEffect(() =>{
            setIsMounted(true);
        }, []);
    
        


        const onUpload = (result:any) => {
            
            const imageUrl = result.info.secure_url;  // Correct property for the secure URL
            console.log("Uploaded Image URL:", imageUrl);  // Log the image URL for debugging
            onChange(imageUrl);
        }

        

        if(!isMounted) return null;


    

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key = {url} className="relative w-50 h-50 rounded-md overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div>
                            <Button type="button" onClick={() => onRemove(url)} className="absolute top-0 right-0 p-1 bg-red-600 rounded-full border-2 border-transparent hover:border-red-600 hover:bg-white hover:text-red-600 transition-colors duration-200">
                                <Trash className="h-4 w-4  "/>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            
            
            <CldUploadWidget  onSuccess={onUpload} uploadPreset="first-ecommerce" >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return(
                        <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={onClick}
                        >
                            <ImagePlus className="mr-2 h-4 w-4"/>
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;