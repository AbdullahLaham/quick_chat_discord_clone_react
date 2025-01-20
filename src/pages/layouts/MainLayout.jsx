
import ClientOnly from '../../components/ClientOnly';
import InitialModal from '../../components/modals/InitialModal';
import CreateServerModal from '../../components/modals/createServerModal';
import NavigationSidebar from '../../components/navigation/NavigationSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../features/auth/authSlice';
import ProviderModal from '../../components/modals/ProviderModal';
import { useCurrentProfile } from '../../lib/useCurrentProfile';
// import { getServers } from '../../features/server/serverSlice';
const MainLayout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {profile} = useCurrentProfile();
  let profile = {}
  console.log('currentProfile', profile);
  
 useEffect(() => {
    // dispatch(getServers());
  }, []);
  if (!profile) {
    return navigate("/");
  }
 
  // const servers = dispatch(get);

  // const servers = await db.server.findMany({
  //   where: {
  //       members: {
  //           some: {
  //               profileId: profile.id,
  //           }
  //       }
  //   }
  // })

  const servers = [];


  return (
    <ClientOnly>
        <ProviderModal />
        <div className='md:flex h-full w-[4.5rem] z-30 flex-col fixed inset-y-0'>
            <NavigationSidebar servers={servers} profile={profile} />
        </div>
        <main className='md:pl-[4.5rem] h-full '>
            <Outlet />
        </main>
    </ClientOnly>
  )
}

export default MainLayout ;

