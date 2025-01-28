// import ServerSidebar from '../../components/server/ServerSidebar';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useCurrentProfile } from '../../lib/useCurrentProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentServer } from '../../features/server/serverSlice';
import ServerSidebar from '../../components/server/ServerSidebar';
import { getCurrentChannel } from '../../features/channel/channelSlice';

const ServerIdLayout = () => {

    const profile = useCurrentProfile();
    const {currentServer: server} = useSelector((state) => state?.server);
    const {deletedChannel, updatedChannel, currentChannel} = useSelector((state) => state?.channel);
    
    const {serverId, channelId} = useParams();

    console.log(serverId, 'server');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
          dispatch(getCurrentServer(serverId));
          
        }, [serverId, deletedChannel, updatedChannel, channelId]);
    useEffect(() => {
      if (channelId) dispatch(getCurrentChannel(channelId));
    }, [channelId])
        
    if (!profile) {
        return navigate('/', {replace: true});
    }

    

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
    // });

    //  if (!server) return redirect('/');
  return (
    <div className='h-full '>
        <div className=' lg:flex md:flex h-full w-60 z-20 flex-col inset-y-0 fixed'>
           <ServerSidebar serverId={serverId} profile={profile} server={server}  />
        </div>
        <main className='h-full md:pl-60 '>
             <Outlet />
        </main>
        
    </div>
  )
}

export default ServerIdLayout