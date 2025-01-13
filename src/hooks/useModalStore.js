import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand'

// export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";


export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data={}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false}),
}))