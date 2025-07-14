'use client'

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import AnimatedName from '@/components/AnimatedName';
import Head from 'next/head';
import { Input } from '@/components/UserInput';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
      if(session) {
        router.push(`/dashboard`)
      }
    }, [session, router])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { username, password } = credentials;
        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError(result.error);
                toast.error(result.error, {
                    position: "top-center",
                    hideProgressBar: true,
                });
            } else {
                if(result?.ok) {
                    toast.success('Login successful', 
                        {
                            position: "top-center",
                            hideProgressBar: true,
                        }
                    );
                    const apiKey = session?.apiKey; // Get the API key from the session
                    if (apiKey) {
                        axios.defaults.headers['x-api-key'] = apiKey; // Set the header globally
                        console.log('API key set in Axios:', apiKey);
                        router.push('/dashboard')
                    }
                }
                  
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <>
        <Head>
            <title>GPC | Login</title>
            <meta name="description" content="Simple Inventory APP using Next.js and TypeScript" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel="icon" href="/logo/greenstone-logo.png" />
        </Head>
        <div className='container mx-auto px-2 sm:my-24 mt-2 flex-colo'>
            <form onSubmit={handleSubmit} className='w-full 2xl:w-2/5 gap-8 flex-colo px-8 py-5 sm:px-14 md:w-3/5 bg-main rounded-lg border border-border'>
            <div className='flex flex-colo'>
                <Image src='/logo/greenstone-logo.png' width={48} height={48} alt='logo' className='w-full h-12 object-contain' />
                <h1 className='text-navbar font-semibold'>Greenstone Packaging Corporation</h1>
            </div>
            <Input
                navbar
                name="username"
                onChange={handleChange}
                label="Username"
                placeholder="GPCADMIN"
                type="text"
                bg={true}
            />
            <Input
                navbar
                name="password"
                onChange={handleChange}
                label="Password"
                placeholder="******"
                type="password"
                bg={true}
            />
            <button type='submit' className='bg-text transitions hover:bg-dry flex-rows gap-4 text-white hover:text-navbar p-4 rounded-lg w-full'>
                <FiLogIn /> Sign In
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <p className='text-center text-navbar'>
                Dont have an account?{" "}
                <Link href='/register' className='text-text font-semibold ml-2'>Sign Up</Link>
            </p>
            </form>
        </div>
            <AnimatedName />
        
        </>
    );
}
