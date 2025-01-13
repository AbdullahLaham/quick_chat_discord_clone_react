"use client"

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator';
import React, { useState } from 'react'
// import { FaGithub } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
import {TriangleAlert} from 'lucide-react'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';



const SignInCard = ({setState}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
  const dispatch = useDispatch();

    // const { signIn } = useAuthActions();
    const signIn = (data) => {
      dispatch(login(data));
    }
    const onProvider = (value) => {
      setPending(true);
      signIn(value)
      .finally(() => setPending(false));
    }
    const passwordProvider = (e) => {
      e.preventDefault();
      setPending(true);
      signIn({email, password})
      // .catch(() => setError('invalid email or password'))

    }

  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle>
            Login to continue
        </CardTitle>
        <CardDescription>
            Use your email or another service to continue.

        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4'  />
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-2 px-2 pb-2'>
        <form className='space-y-3' onSubmit={passwordProvider}>
            <Input disabled={pending} type='email' placeholder='Email' value={email} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setEmail(e.target.value)} required/>
            <Input disabled={pending} type='password' placeholder='Password' value={password} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setPassword(e.target.value)} required/>
            <Button type='submit' className='w-full ' size={'lg'} disabled={pending} >
                Sign In

            </Button>
        </form>
        <Separator className='my-2' />
        <div className='flex flex-col space-y-3'>
            <Button disabled={pending} onClick={() => signIn("google")}  value={'outline'} size={'lg'} className='w-full relative'>
                Continue with Google
                <FcGoogle className='size-5 absolute left-3 top-3' />
            </Button>
            <Button disabled={pending} onClick={() => signIn("github")}  value={'outline'} size={'lg'} className='w-full relative'>
                Continue with Github
                <FaGithub className='size-5 absolute left-3 top-3' />
            </Button>

        </div>
        <p className='text-xs text-muted-foreground flex items-center my-2'>
            Already have an acoount <p className='text-sky-600 font-semibold hover:underline cursor-pointer' onClick={() => setState('signUp')}>SignUp</p>
        </p>

      </CardContent>
    </Card>
  )
}

export default SignInCard
