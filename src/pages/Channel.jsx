
import React from 'react'
import ChatInput from '../components/chat/ChatInput';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import { useNavigate } from 'react-router-dom';

// interface ChannelPageProps {
//     params: {
//         serverId: string,
//         channelId: string,
//     }
// }
const ChannelType = {
    TEXT: 'TEXT',
    AUDIO: 'AUDIO',
    VIDEO: 'VIDEO',
}
const ChannelPage = ({params}) => {
    const profile = {};
    const navigate = useNavigate();
    // if (!profile) return redirectToSignIn();
    const server = {};
    const channel = {};
    const servers = [];
    const member = {};

    // const channel = await db.channel.findUnique({
    //     where: {
    //         id: params?.channelId,
    //     }
    // });
    // const servers = await db.server.findMany({
    //     where: {
    //         members: {
    //             some: {
    //                 profileId: profile.id,
    //             }
    //         }
    //     }
    //   })

    // const member = await db.member.findFirst({
    //     where: {
    //         profileId: profile.id,
    //         serverId: params.serverId,
    //     }
    // })
    // const server = await db.server.findUnique({
    //     where: {
    //         id: params.serverId
    //     },
    //     include: {
    //         channels: {
    //             orderBy: {
    //                 createdAt: "desc",
    //             }
    //         },
    //         members: {
    //             include: {
    //                 profile: true,
    //             },
    //             orderBy: {
    //                 role: 'asc',
    //             }
    //         }
    //     }
    // })

    // if (!channel || !member || !server) {
    //     return navigate('/');
    // }
  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
        <ChatHeader type='channel' name={channel?.name} serverId={params?.serverId} servers={servers} profile={profile} server={server}  />
        <div className='flex-1'>
            {
                channel?.type == ChannelType.TEXT && (
                    <ChatMessages member={member} type='channel' name={channel?.name} chatId={channel?.id} apiUrl='/api/messages' socketUrl='/api/socket/messages' socketQuery={{serverId: server?.id, channelId: channel?.id}} paramKey='channelId' paramValue={channel?.id} />
                )
            }
            {
                // channel?.type == ChannelType.AUDIO && (
                //     <MediaRoom chatId={channel?.id} audio={true} video={false} />
                // )
            }
            {
                // channel?.type == ChannelType.VIDEO && (
                //     <MediaRoom chatId={channel?.id} audio={false} video={true} />
                // )
            }

        </div>
        <ChatInput name={channel.name} type='channel' apiUrl='/api/socket/messages' query={{channelId: channel?.id, serverId: server?.id}} />
    </div>
  )
}

export default ChannelPage