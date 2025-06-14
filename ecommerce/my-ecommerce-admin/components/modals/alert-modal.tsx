"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useState } from "react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null ;
 
    
    return (
        <Modal 
            title="Are you sure?"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} onClick={onClose} variant ="outline">
                    Cancel
                </Button>
                <Button disabled={loading} onClick={onConfirm} variant="destructive"
                    className="border-2 hover:border-red-500 hover:bg-white hover:text-red-600 transition-colors duration-200">
                    Continue
                </Button>
            </div>
        </Modal>
    )

}