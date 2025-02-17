"use client"
import * as z from 'zod';
import axios from 'axios';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"
  import qs from 'query-string';
  import {useForm} from 'react-hook-form';
  import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import React, { useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar'
import { Delete, Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react'
import ActionTooltip from '../ActionTooltip'
import { cn } from '../../lib/utils'
import {toast} from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModalStore';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../features/message/messageSlice';


// interface ChatItemProps {
//     id: string,
//     content?: string,
//     member: Member & {
//         profile: Profile
//     },
//     timestamp: string,
//     fileUrl: string | null,
//     deleted: boolean,
//     currentMember: Member,
//     isUpdated: boolean,
//     socketUrl: string,
//     socketQuery: Record<string, string>,

// }
const ChatItem = ({ id, content, member, timestamp, fileUrl, deleted, currentMember, isUpdated, socketUrl, socketQuery }) => {
    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500 " />,
        "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500 " />,

    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();

    // delete messagee modal onOpen function

    const {onOpen} = useModal();

    const formSchema = z.object({
        content: z.string().min(1, {
            message: "Content is required.",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content,
        }
    });

    const onSubmit = async (values) => {
        try {
            const url = qs.stringifyUrl({
                url: `${id}`,
                query: {
                    serverId,
                    channelId,
                    messageId: id,
                },
                
            });
            dispatch(updateMessage({url, data: form.getValues()}))

            toast.success("message updated successfully")
            form.reset();
            setIsEditing(false)
        //    navigate(0);

        } catch (error) {
            toast.error("something went wrong")
        }
    }
    const onMemberClick = () => {
        if (member?.id == currentMember?.id) {
            return;
        }
        navigate(`/servers/${params?.serverId}/conversations/${member?.id}`)
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' || event.keyCode == 27) {
                setIsEditing(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        form.reset({
            content: content,
        })
    }, [content, form]);

    // params
    const params = useParams();
    const fileType = fileUrl?.split('.').pop();
    const isAdmin = currentMember.role === 'ADMIN';
    const isModerator = currentMember.role === 'MODERATOR';
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl; 

    const isLoading = form.formState.isSubmitting;

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    return (
    <div className='relative group flex items-center hover:bg-black/5 p-4 transition w-full '>
        <div className='group flex gap-x-2 items-center w-full '>
            <div onClick={onMemberClick} className='cursor-pointer hover:drop-shadow-md transition'>
                <UserAvatar src={member?.profile?.imageUrl} name={member?.profile?.name} />
            </div>
            <div className='flex flex-col w-full'>
                
                <div className='flex items-center gap-x-2 '>
                    <div className='flex items-center gap-x-2'>
                        <p onClick={onMemberClick} className='font-semibold text-sm hover:underline cursor-pointer'>
                            {member?.profile?.name}
                        </p>
                        <ActionTooltip label={member?.role} >
                            {roleIconMap[member?.role]}
                        </ActionTooltip>

                    </div>
                    <span className='text-xs text-zinc-500 dark:text-zinc-400 '>
                        {timestamp}
                    </span>
                
                </div>

                {isImage && (
                    <a href={fileUrl} target='_blank' rel='noopener noreferrer' className='relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48'>
                        {/* <Image src={fileUrl} alt={content || ""} fill className='object-cover' /> */}
                    </a>
                )}

                {isPDF && (
                    <a href={fileUrl} target='_blank' rel='noopener noreferrer' className='relative aspect-auto rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-auto w-48'>
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">PDF File</a>
                        </div>
                    </a>
                )}
                
                {!fileUrl && !isEditing && (
                    <p className={cn("text-sm text-zinc-600 dark:text-zinc-300 ", deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1", )}>
                        {content}
                        {isUpdated && !deleted && (
                            <span className='mx-2 text-[10px] text-zinc-500 dark:text-zinc-200'>
                                (edited)
                            </span>
                        )}
                    </p>
                )}

                {!fileUrl && isEditing && (
                    <Form {...form}>
                        <form className='flex items-center w-full gap-x-2 pt-2 ' onSubmit={form.handleSubmit(onSubmit)} >
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormControl>
                                            <div className='relative p-4 px-6 '>
                                                <Input disabled={isLoading} className='px-14 bg-zinc-200 dark:bg-zinc-600 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0  ' placeholder={`Editted Message`} {...field} />
                                            </div>         
                                        </FormControl>
                                    </FormItem>
                                )}
                             />
                             <Button disabled={isLoading} size='sm' variant={'primary'}>
                                Save
                             </Button>
                        </form>
                        <span className='text-[10px] mt-1 text-zinc-400 '>
                            press escape to cancel, enter to save
                        </span>

                    </Form>
                )}


            </div>


        </div>
        {canDeleteMessage && (
            <div className='hidden group-hover:flex items-center gap-x-2 absolute right-5 top-2 p-1 bg-white dark:bg-zinc-800 rounded-md border '>
                
                {canEditMessage && (
                    <ActionTooltip label='Edit'>
                        <Edit onClick={() => setIsEditing(true)} className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 w-4 h-4 cursor-pointer ml-auto ' />
                    </ActionTooltip>
                )}

                <ActionTooltip label='Delete'>
                    <Trash onClick={() => onOpen('deleteMessage', {query: socketQuery, apiUrl: `${socketUrl}/${id}`})} className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 w-4 h-4 cursor-pointer ml-auto '  />
                </ActionTooltip>
            </div>
        )}

      
    </div>
  )
}

export default ChatItem
