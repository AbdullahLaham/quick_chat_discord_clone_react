import React, { useEffect } from 'react'
import { getCurrentUser } from '../features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentServer } from '../features/server/serverSlice';
import { getCurrentChannel } from '../features/channel/channelSlice';
// interface ServerPageProps {
//   params: {
//     serverId: string,
//   }
// }


const ServerPage = () => {
    const {currentUser} = useSelector((state) => state?.auth)
    const {serverId, channelId} = useParams();
    // navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(() => {
              dispatch(getCurrentUser());
              dispatch(getCurrentServer(serverId));
            }, [serverId]);

    if (!currentUser) return navigate('/auth', {replace: true});

    
        
    // const server = await db.server.findUnique({
    //   where: {
    //     id: serverId,
    //     members: {
    //       some: {
    //         profileId: profile.id,
    //       }
    //     }
    //   },
    //   include: {
    //     channels: {
    //       where: {
    //         name: 'general'
    //       },
    //       orderBy: {
    //         createdAt: 'asc',
    //       }
    //     }
    //   }
    // });
    const server = {};

    const initialChannel = server?.channels?.[0];
    
    if (initialChannel?.name !== 'general') return null;


  return navigate(`/servers/${serverId}/channels/${initialChannel?._id}`)
}

export default ServerPage ;