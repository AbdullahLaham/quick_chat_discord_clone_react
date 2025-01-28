import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { cn } from '../lib/utils'

const UserAvatar = ({ src, name, className }) => {
  return (
    src ? (<Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)} >
      <AvatarImage src={src} />

    </Avatar>) :
      (<div className={cn("h-7 w-7 md:h-10 md:w-10 flex items-center justify-center rounded-full p-5 text-lg text-white font-semibold bg-emerald-400", className)}>
        {name?.charAt(0).toUpperCase()}
      </div>)

  )
}

export default UserAvatar