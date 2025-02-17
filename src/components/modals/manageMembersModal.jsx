
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubContent , DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuSeparator } from '../ui/dropdown-menu'
import qs from 'query-string'

import { useModal } from '../../hooks/useModalStore';
import React, { useState } from 'react';
import { Check, Copy, Gavel, Loader2, MoreVertical, RefreshCw, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import axios from "axios";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import UserAvatar from "../UserAvatar";
import { DropdownMenuSub, DropdownMenuSubTrigger } from "../ui/dropdown-menu";
import {toast} from "sonner";
import { useNavigate } from "react-router-dom";

const ManageMembersModal = () => {
    const navigate = useNavigate();
    const [loadingId, setLoadingId] = useState("");
    const {onOpen, isOpen, onClose, type, data} = useModal();
    const {server} = data;

    const isModalOpen = isOpen && type == "members";
   
    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500 " />,
        "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500 " />,
    }
    
    const onRoleChange = async (memberId, role) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                }
            })
            const response = await axios.patch(url, { role });
            console.log(response.data)
            toast.success(`member role changes to be ${role}`)
            navigate(0);
            onOpen("members", {server: response.data})
        } catch (error) {
            console.log(error);
            toast.error(`something went wrong`);
        } finally {
            setLoadingId("");
        }
    }


    const onKick = async (memberId) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                }
            })
            const response = await axios.delete(url);
            navigate(0);
            toast.success(`member deleted successfully`)
            onOpen("members", {server: response.data})
        } catch (error) {
            console.log(error);
            toast.error(`something went wrong`);
        } finally {
            setLoadingId("");
        }
    }

  return (
   <div>
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6 ">
                    <DialogTitle className="text-2xl text-center font-semibold">Manage Members</DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea>
                    {server?.members.map((member) => {
                        return (
                            <div key={member.id} className="flex items-center gap-x-2 mb-6  ">
                                <UserAvatar className="" src={member?.profile?.imageUrl} />
                                <div className="flex flex-col gap-y-1">
                                    <div className="text-xs font-semibold flex items-center gap-x-1 ">
                                        {member?.profile?.name}
                                        {/* {roleIconMap[member?.role]} */}
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-500  ">
                                        {member?.profile?.email}
                                    </p>

                                </div>
                                {server.profileId !== member.profileId && loadingId !== member.id && (
                                    <div className="ml-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="h-4 w-4 text-zinc-500 " />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side='left'>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'GUEST')} >
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {member.role === "GUEST" && (
                                                                <Check
                                                                className="h-4 w-4 ml-auto"
                                                                />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'MODERATOR')}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {member.role === "MODERATOR" && (
                                                                <Check
                                                                className="h-4 w-4 ml-auto"
                                                                />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onKick(member?.id)}>
                                                <Gavel className="h-4 w-4 mr-2" />
                                                Kick
                                            </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                                {loadingId === member?.id && (
                                    <Loader2 className="h-4 w-4 text-zinc-500 ml-auto animate-spin" />
                                )}

                            </div>
                        )
                    })}
                </ScrollArea>
                <div className="p-6">
                    Hello members
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ManageMembersModal