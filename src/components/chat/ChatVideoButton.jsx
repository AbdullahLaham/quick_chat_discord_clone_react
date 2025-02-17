"use client"

import React from 'react'
import qs from 'query-string';
import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Video, VideoOff } from 'lucide-react';
import ActionTooltip from '../ActionTooltip';

const ChatVideoButton = () => {
    // const pathname = usePathname();
    const searchParams = useSearchParams();
    const navigate = useNavigate();
    
    const onClick = () => {

        let url = qs.stringifyUrl({
            // url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true });
        navigate(url);

    }


    const isVideo = searchParams?.get('video')
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End Video call" : "Start video call"
  return (
    <ActionTooltip side='bottom' label={tooltipLabel}>
      <button onClick={onClick} className='hover:opacity-75 transition mr-4 '>
        <Icon className='h-6 w-6 text-zinc-500 dark:text-zinc-400 ' />
      </button>
    </ActionTooltip>
  )
}

export default ChatVideoButton
