"use client"

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator';
import React, { useState } from 'react'
// import { FaGithub } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
import { TriangleAlert } from 'lucide-react';
import { BsGoogle } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';



const SignUpCard = ({setState}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    // const {signIn} = useAuthActions();
    const signIn = () => {}
    const onProvider = (value) => {
      setPending(true);
      signIn(value)
      .finally(() => setPending(false))
    }

    const passwordProvider = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('password does not match');
        return
      }
      setPending(true);
      signIn("password", {name, email, password, flow: 'signUp'})
      .catch(() => setError('something went wrong'))
      .finally(() => setPending(false))

    }

  return (
    <Card className='bg-white p-3 py-1'>
      <CardHeader>
        <CardTitle>
            Create a new account
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
      <CardContent className='space-y-2 px-2 pb-0'>
        <form className='space-y-2.5' onSubmit={passwordProvider}>
            <Input disabled={pending} type='text' placeholder='Your Name' value={name} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setName(e.target.value)} required />
            <Input disabled={pending} type='email' placeholder='Email' value={email} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setEmail(e.target.value)} required />
            <Input disabled={pending} type='password' placeholder='Password' value={password} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setPassword(e.target.value)} required/>
            <Input disabled={pending} type='password' placeholder='confirmPassword' value={confirmPassword} className='border-none outline-none active:border active:border-slate-200' onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <Button type='submit' className='w-full border border-slate-100 shadow-black hover:shadow-sm' size={'lg'} disabled={pending}  >
                Sign Up
            </Button>
        </form>
        <Separator />
        <div className='flex flex-col space-y-3'>
            <Button disabled={pending} onClick={() => onProvider('google')}  value={'outline'} size={'lg'} className='w-full relative border border-slate-500'>
                Continue with Google
                <FcGoogle className='size-5 absolute left-3 top-3' />
            </Button>
            <Button disabled={pending} onClick={() => onProvider('github')}  value={'outline'} size={'lg'} className='w-full relative border border-slate-500'>
                Continue with Github
                <FaGithub className='size-5 absolute left-3 top-3' />
            </Button>

        </div>
        <p className='text-xs text-muted-foreground flex items-center my-2'>
            Don&apos;t have an acoount <p className='text-sky-600 font-semibold hover:underline cursor-pointer' onClick={() => setState('signIn')}>SignIn</p>
        </p>

      </CardContent>
    </Card>
  )
}

export default SignUpCard;
