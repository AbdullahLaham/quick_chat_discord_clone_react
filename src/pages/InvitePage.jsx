import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getInvitedServer } from '../features/server/serverSlice';

const InvitePage = () => {
  const {inviteCode} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser: profile} = useSelector((state) => state.auth);
  const {servers, invitedServer} = useSelector((state) => state.server);
  useEffect(() => {
    if (!profile) {
      return navigate('/auth', {replace: true})
    }
  }, [])

  useEffect(() => {
    dispatch(getInvitedServer(inviteCode));
  }, [])

  
  if (!profile) return navigate('/auth', {replace: true});
  if (invitedServer?._id) {
    return navigate(`/server/${invitedServer?._id}`, {replace: true})
  }

  return (
    <div>
      
    </div>
  )
}

export default InvitePage
