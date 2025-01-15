'use client'
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FileUpload from "../FileUpload"
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../hooks/useModalStore'

const CreateServerModal = () => {
    const navigate = useNavigate();

    const {isOpen, onClose, type} = useModal();

    const isModalOpen = isOpen && type == "createServer";

    const formSchema = z.object({
    name: z.string().min(2, {
        message: "Server name is required.",
    }),
    imageUrl: z.string().min(2, {
        message: "Server image is required.",
    }),
    });
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
            await axios.post("/api/servers", values);
            form.reset();
            navigate(0);
            onClose();
            window.location.reload();

        } catch(error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }
  return (
    <div>
        <Dialog open = {isModalOpen} onOpenChange={handleClose}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6 ">
                <DialogTitle className="text-2xl text-center font-semibold">Customise your server</DialogTitle>
                <DialogDescription>
                    Give your server a personality with a name and an image. you can always change it later
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6 ">
                            <div className="flex items-center justify-center text-center ">
                                Image Upload
                            </div>
                            <FormField
                                control={form.control}
                                name='imageUrl'
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                                        </FormControl>

                                    </FormItem>
                                )}
                             />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} {...field} className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0  ' placeholder='Enter Server Name' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormMessage />

                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4 ">
                            <Button type='submit' disabled={isLoading} variant={'primary'} >Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
                
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateServerModal;


