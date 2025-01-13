import React, { useState } from 'react'
import SignInCard from '../components/auth/SignInCard';
import SignUpCard from '../components/auth/SignUpCard';

const AuthScreen = () => {
    const [state, setState] = useState("signIn");
    
  return (
    <div className='flex items-center justify-center h-[100vh] bg-[#5c3b58]'>
      {state == 'signIn' ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      dd
    </div>
  )
}

export default AuthScreen
