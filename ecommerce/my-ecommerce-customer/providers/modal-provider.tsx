"use client";


import PreviewModal from "@/app/components/preview-modal";
import { useEffect, useState } from "react";


const ModalProvider = () => {

    const[isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true); 
    }, []); 

    if(!isMounted) return null;

    return ( 
        <div>
            <PreviewModal/>
        </div>
     );
}
 
export default ModalProvider;