import React from 'react'
import { Outlet, useParams } from 'react-router-dom';

const ServerLayout = () => {
    const { serverId } = useParams();
    return (
      <div>
        <Outlet />
        

      </div>
    );
  };
  

export default ServerLayout
