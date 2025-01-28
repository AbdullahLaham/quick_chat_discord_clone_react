"use client"



import React, { Fragment, useRef, ElementRef } from 'react'
import { format } from 'date-fns';
import ChatWelcome from './ChatWelcome'
import { useChatQuery } from '../../hooks/useChatQuery'
import { Loader2, ServerCrash } from 'lucide-react'
import ChatItem from './ChatItem'
import { useChatSocket } from '../../hooks/useChatSocket';
import { useChatScroll } from '../../hooks/useChatScroll';
import { useSelector } from 'react-redux';

// interface ChatMessagesProps {
//     name: string,
//     member: Member,
//     chatId: string,
//     apiUrl: string,
//     socketUrl: string,
//     socketQuery: Record<string, string>,
//     paramKey: "channelId" | "conversationId",
//     paramValue: string,
//     type: "channel" | "conversation"

// }


const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
  }) => {

    const DATE_FORMAT = 'dd MMM yyyy HH:mm'
    // type MessageWithMemberWithProfile = Message & {
    //     member: Member & {
    //         profile: Profile
    //     }
    // }
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`

    const chatRef = useRef(null);
    const bottomRef = useRef(null);


    const {messages} = useSelector((state) => state?.message)
    
    
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useChatQuery({apiUrl, paramKey, paramValue, queryKey })
    useChatSocket({queryKey, updateKey, addKey});
    useChatScroll({chatRef, bottomRef, loadMore: fetchNextPage, shouldLoadMore: (!isFetchingNextPage && !!hasNextPage), count: data?.pages[0]?.items?.length ?? 0})
    console.log(messages, 'daaaaaaaaaaaaaa');
     
    if (status == 'loading') {
        return (
            <div className='flex flex-col flex-1 h-full justify-center items-center'>
                <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Loadign Messages...
                </p>
            </div>
        )
    }
    
    // if (status == 'error') {
    //     return (
    //         <div className='flex flex-col flex-1 h-full justify-center items-center'>
    //             <ServerCrash className='h-7 w-7 text-zinc-500  my-4' />
    //             <p className='text-xs text-zinc-500 dark:text-zinc-400'>
    //                 Something Went Wrong...
    //             </p>
    //         </div>
    //     )
    // }


    return (
    <div ref={chatRef} className='flex-1 h-full flex flex-col py-4 overflow-y-auto'>
        {!hasNextPage && <div className='flex-1' />}
        {!hasNextPage && <ChatWelcome type={type} name={name} />}
        {hasNextPage && (
            <div className='flex justify-center w-full'>
                {isFetchingNextPage ? (
                    <Loader2 className='h-6 w-6 text-zinc-500 animate-spin transition' />
                ): (
                    <button onClick={() => fetchNextPage()} className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-200 text-xs my-4 transition'>
                        Load previous messages
                    </button>
                )}

            </div>
        )}
        <div className='flex flex-col-reverse mt-auto'>
            {data?.pages?.map((group, i) => (
                <Fragment key={i}>
                    {group?.items?.map((message, i) => (
                        <ChatItem key={message?._id} member={message?.member}  content={message?.content} currentMember={member}  id={message?._id} fileUrl={message?.fileUrl} deleted={message?.deleted} timestamp={format(new Date(message.createdAt), DATE_FORMAT)} isUpdated={message?.updatedAt !== message?.createdAt} socketUrl={socketUrl} socketQuery={socketQuery}   />
                    ))}
                </Fragment>
            ))}

        </div>
        <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages
