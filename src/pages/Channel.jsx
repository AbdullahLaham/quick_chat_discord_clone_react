
import React, { useEffect } from 'react'
import ChatInput from '../components/chat/ChatInput';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import MediaRoom from '../components/MediaRoom';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getCurrentChannel } from '../features/channel/channelSlice';
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

const ChannelPage = ({}) => {
    const {serverId, channelId} = useParams();
    const {currentUser: profile} = useSelector((state) => state?.auth);
    const {currentServer: server} = useSelector((state) => state.server);
    const {currentChannel: channel} = useSelector((state) => state.channel);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // if (!profile) return redirectToSignIn();
    

    const servers = [];
    const member = {};

    // const channel = await db.channel.findUnique({
    //     where: {
    //         id: params?.channelId,
    //     }
    // });



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
   
    
    if (!channel || !member || !server) {
        return navigate('/');
    }


  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
        <ChatHeader type='channel' name={channel?.name} serverId={serverId} servers={servers} profile={profile} server={server}  />
        
        <div className='flex-1'>
            {
                channel?.type == 'TEXT' && (
                    <ChatMessages member={member} type='channel' name={channel?.name} chatId={channel?._id} apiUrl='http://localhost:5000/messages' socketUrl='http://localhost:5000/messages' socketQuery={{serverId: server?._id, channelId: channel?._id}} paramKey='channelId' paramValue={channel?._id} />
                )
            }
            {
                channel?.type == 'AUDIO' && (
                    <MediaRoom chatId={channel?.id} audio={true} video={false} />
                )
            }
            {
                channel?.type == 'VIDEO' && (
                    <MediaRoom chatId={channel?.id} audio={false} video={true} />
                )
            }

        
        </div>
        <ChatInput name={channel.name} type='channel' apiUrl='/messages' query={{channelId: channelId, serverId: server?._id}} />
    </div>
  )

}

export default ChannelPage