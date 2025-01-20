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
import { useParams, useNavigate } from 'react-router-dom'
import { useModal } from '../../hooks/useModalStore'
import {toast} from 'sonner'
import qs from 'query-string'


const DeleteChannelModal = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {onOpen, isOpen, onClose, type, data} = useModal();
    const {server, channel} = data;
    const [isLoading, setIsLoading] = useState(false);
    const isModalOpen = isOpen && type == "deleteChannel";
   
    const deleteChannel = async () => {

        setIsLoading(true);

        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: params?.serverId,
                }
            })
            await axios.delete(url);
            onClose();
            setIsLoading(false);
            toast.success("Message Deleted successfully")
            navigate(`/servers/${params?.serverId}`);
            navigate();
            

        } catch(error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }
  return (
   <div>
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6 ">
                    <DialogTitle className="text-2xl text-center font-semibold">Delete Channel</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 ">
                        Are you sure you want to delete <span className="font-semibold text-indigo-500">{channel?.name}</span> channel <br />
                        the channel will permanently be deleted
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4 ">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={() => onClose()} variant={'ghost'}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={() => deleteChannel()} variant={'primary'}>
                            Delete
                        </Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DeleteChannelModal