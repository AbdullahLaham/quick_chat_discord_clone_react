import React, { useEffect } from 'react'
import { getCurrentUser } from '../features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentServer } from '../features/server/serverSlice';
// interface ServerPageProps {
//   params: {
//     serverId: string,
//   }
// }


const ServerPage = () => {
  
    const {serverId} = useParams();
    // navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = dispatch(getCurrentUser());

    useEffect(() => {
          
              dispatch(getCurrentServer(serverId));
            }, [serverId]);
    if (!profile) return navigate('/auth', {replace: true});

    
        
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


  return navigate(`/servers/${serverId}/channels/${initialChannel?.id}`)
}

export default ServerPage ;