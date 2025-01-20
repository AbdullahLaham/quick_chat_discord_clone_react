'use client'

import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import ServerHeader from './ServerHeader';
import { ScrollArea } from '../ui/scroll-area';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import ServerSearch from './ServerSearch';
import { Separator } from '../ui/separator';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';

// interface ServerSidebarProps {
//     serverId?: string,
//     server: safeServer | null,
//     profile: Profile,
// }

const iconMap = {
  TEXT: <Hash className='mr-2 h-4 w-4' />,
  AUDIO: <Mic className='mr-2 h-4 w-4' />,
  VIDEO: <Video className='mr-2 h-4 w-4' />,

}
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />,
  ADMIN: <ShieldAlert className='h-4 w-4 mr-2 text-rose-500' />,

}

const ServerSidebar = ({serverId, server, profile}) => {
  // navigate
  let navigate = useNavigate();
    
    const textChannels = server?.channels?.filter((channel) => channel.type === 'TEXT');
    const audioChannels = server?.channels?.filter((channel) => channel.type === 'AUDIO');
    const videoChannels = server?.channels?.filter((channel) => channel.type === 'VIDEO');

    const members = server?.members?.filter((member) => member?.profileId !== profile.id);

    // if (!server?.name) return navigate('/');

    const role = server?.members?.find((member) => member.profileId === profile.id)?.role;

    
  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F4]'>
        <ServerHeader server={server} role={role} />
        <ScrollArea className='flex-1 px-3' >
          <ServerSearch data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
              }))
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: audioChannels?.map((channel) => (
                {
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }
              ))
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
              }))
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => ({
                id: member.id,
                name: member.profile.name,
                icon: roleIconMap[member.role],
              }))
            },
          ]} />
          <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2 ' />
          {!!textChannels?.length && (
            <div className='mb-2'>
              <ServerSection sectionType='channels' channelType={'TEXT'} role={role} server={server} label='Text Channels'  />
              <div className='space-y-[2px] '>
                {
                  textChannels?.map((channel) => {
                    return (
                      <ServerChannel key={channel?.id} channel={channel} role={role} server={server} />
                    )
                  })
                }
              </div>
            </div>
          )}
          {!!audioChannels?.length && (
            <div className='mb-2'>
              <ServerSection sectionType='channels' channelType={'AUDIO'} role={role} server={server} label='Voice Channels'  />
              <div className='space-y-[2px] '>
                {
                  audioChannels?.map((channel) => {
                    return (
                      <ServerChannel key={channel?.id} channel={channel} role={role} server={server} />
                    )
                  })
                }
              </div>
              
            </div>
          )}
          {!!videoChannels?.length && (
            <div className='mb-2'>
              <ServerSection sectionType='channels' channelType={'VIDEO'} role={role} server={server} label='Video Channels'  />
              <div className='space-y-[2px] '>
                {
                videoChannels?.map((channel) => {
                  return (
                    <ServerChannel key={channel?.id} channel={channel} role={role} server={server} />
                  )
                })
                }
              </div>
              
            </div>
          )}
          {!!members?.length && (
            <div className='mb-2'>
              <ServerSection sectionType='members' role={role} server={server} label='Members'  />
              <div className='space-y-[2px] '>
                {
                  members?.map((member) => {
                    return (
                      <ServerMember key={member?.id} member={member} role={role} server={server} />
                    )
                  })
                }
              </div>
              
            </div>
          )}
        </ScrollArea>
    </div>
  )
}

export default ServerSidebar;

