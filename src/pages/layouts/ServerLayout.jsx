import ServerSidebar from '../../components/server/ServerSidebar';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useCurrentProfile } from '../../lib/useCurrentProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentServer } from '../../features/server/serverSlice';

const ServerIdLayout = () => {

    const profile = useCurrentProfile();
    const {currentServer} = useSelector((state) => state?.server)
    const {serverId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
          if (!currentServer) {
            dispatch(getCurrentServer(serverId))
          }
        }, []);

        
    if (!profile) {
        return navigate('/', {replace: true});
    }

    




    // const server = await db.server.findUnique({
    //     where: {
    //         id: params.serverId,
    //         members: {
    //             some: {
    //                 profileId: profile.id
    //             }
    //         }
    //     }
    // });
   


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
    //  if (!server) return redirect('/');
  return (
    <div className='h-full '>
        <div className='hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed'>
           <ServerSidebar serverId={serverId} profile={profile} server={currentServer}  />
        </div>
        <main className='h-full md:pl-60 '>
             <Outlet />
        </main>
        
    </div>
  )
}

export default ServerIdLayout