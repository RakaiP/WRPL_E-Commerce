"use client";

import Button from "@/app/components/ui/button";
import IconButton from "@/app/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { Fragment, useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            {/* Button to Open Filter */}
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus />
            </Button>

            {/* Mobile Filter Modal */}
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                    {/* Background (Moved inside TransitionChild) */}
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </TransitionChild>

                    {/* Dialog Panel */}
                    <div className="fixed inset-0 flex justify-end">
                        <TransitionChild
                            as={Fragment}
                            enter="transform transition ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <DialogPanel className="h-full w-full max-w-xs bg-white shadow-xl">
                                {/* Close Button */}
                                <div className="flex items-center justify-end p-4">
                                    <IconButton icon={<X size={15} />} onClick={onClose} />
                                </div>

                                {/* Filters */}
                                <div className="p-4">
                                    <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                                    <Filter valueKey="colorId" name="Colors" data={colors} />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MobileFilters;
