'use client'

import { cn } from '../../lib/utils'
// import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'
import ActionTooltip from '../ActionTooltip'
import { ModalType, useModal } from '../../hooks/useModalStore'

// interface ServerChannelProps {
//     channel: Channel,
//     server: Server,
//     role?: MemberRole
// }
const iconMap = {
    TEXT: Hash,
    AUDIO: Mic,
    VIDEO: Video,
  
  }
const ServerChannel = ({channel, server, role}) => {
    const params = useParams();
    const navigate = useNavigate();
    const Icon = iconMap[channel.type];
    const {onOpen} = useModal();

    const onClick = () => {
      navigate(`/server/${server?._id}/channel/${channel?._id}`)
    }
    const onAction = (e, action) => {
      e.stopPropagation();
      onOpen(action, {server, channel});
    }

  return (
    <button onClick={onClick} className={cn('group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1', params?.channelId == channel._id && "bg-zinc-700/20 dark:bg-zinc-700")}>
        <Icon className='flex-shrink-0 h-5 w-5 text-zinc-500'/>
        <p className={cn(
        "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
      )}>{channel?.name}</p>

      {channel?.name !== "general" && role !== 'GUEST' && (
        <div className='ml-auto flex items-center gap-x-2'>
          <ActionTooltip label='Edit'>
            <Edit onClick={(e) => onAction(e, 'editChannel')} className='hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-400' />
          </ActionTooltip>
          <ActionTooltip label='Delete'>
            <Trash onClick={(e) => onAction(e, 'deleteChannel')}  className='hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition' />
          </ActionTooltip>

        </div>
      )}
      {
        channel.name == 'general' && (
          <Lock className=' w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-400' /> 
        )
      }
    </button>
  )
}

export default ServerChannel