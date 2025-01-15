'use client'

import React from 'react'
import ActionTooltip from '../ActionTooltip'
import { cn } from '../../lib/utils'
import { useParams, useNavigate } from 'react-router-dom'

// interface NavigationItemProps {
//     id: string,
//     imageUrl: string,
//     name: string,
// }
const NavigationItem = ({ id, imageUrl, name }) => {
    const params = useParams();
    const navigate = useNavigate();
  return (
    <ActionTooltip label={name} side='right' align='center' >
        <button onClick={() => navigate(`/servers/${id}`)} className='group relative flex items-center '>
            <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px] ", params?.serverId !== id ? "group-hover:h-[20px] h-[8px]" : "h-[36px] ")} />
            <div className={cn('relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden', params?.serverId == id && "bg-primary/10 text-primary rounded-[16px] ")}>
                {/* <Image fill src={imageUrl} alt="Channel" className='object-cover' /> */}
                <img src={imageUrl} alt="channel" className='object-cover' />

            </div>
        </button>
    </ActionTooltip>
  )
}

export default NavigationItem