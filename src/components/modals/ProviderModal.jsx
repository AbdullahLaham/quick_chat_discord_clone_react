'use client'

import React, { useEffect, useState } from 'react'
import CreateServerModal from './createServerModal'
import { useRouter } from 'next/navigation';
import InviteModal from './InviteModal';
import EditServerModal from './editServerModal';
import ManageMembersModal from './manageMembersModal';
import CreateChannelModal from './createChannelModal';
import LeaveServerModal from './leaveServerModal';
import DeleteServerModal from './deleteServerModal';
import DeleteChannelModal from './deleteChannelModal';
import EditChannelModal from './editChannelModal';
import MessageFileModal from './messageFileModal';
import DeleteMessageModal from './deleteMessageModal';


const ProviderModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) return null;

  return (
    <>
        <InviteModal />
        <CreateServerModal />
        <EditServerModal />
        <ManageMembersModal />
        <CreateChannelModal />
        <LeaveServerModal />
        <DeleteServerModal />
        <DeleteChannelModal />
        <EditChannelModal />
        <MessageFileModal />
        <DeleteMessageModal />
    </>
  )
}

export default ProviderModal