import { Hash, Menu } from 'lucide-react'
import React from 'react'
import MobileToggle from '../mobile-toggle'
import UserAvatar from '../UserAvatar'
import SocketIndicator from '../SocketIndicator'
import ChatVideoButton from './ChatVideoButton'

// interface ChatHeaderProps {
//     serverId: string,
//     name: string,
//     servers: Server[],
//     server: safeServer | null,
//     profile: Profile,
//     type: "channel" | "conversation",
//     imageUrl?: string,

// }

const ChatHeader = ({serverId, name, imageUrl, type, profile, servers, server}) => {

  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
        <MobileToggle servers={servers}  profile={profile} server={server} />

        {type == "channel" && (
            <Hash className='w-5 h-5 text-zinc-700 dark:text-zinc-400 mr-2' />
        )}
        {type == "conversation" && (
            <UserAvatar src={imageUrl} className='w-10 h-10 mr-2 ' />
        )}

        <p className='font-semibold text-md text-black dark:text-white'>{name}</p>
        <div className='ml-auto flex items-center '>
          {type == 'conversation' && (
            <ChatVideoButton />
          )}
          <SocketIndicator />
        </div>
    </div>
  )

}

export default ChatHeader