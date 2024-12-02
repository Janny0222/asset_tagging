import { FormEvent, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'
import { Input } from '@/components/UserInput'
import Image from 'next/image'
import { createUser } from '@/services/User/userService'
 
interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      
        const res = await createUser(formData);
        console.log(res);
        router.push('/login'); // Redirect to login after successful registration
      
    } catch (error: unknown) {
      if(error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
      
    }
  };

  return (
    
      <div className='container mx-auto px-2 my-24 flex-colo'>
        <form onSubmit={handleSubmit} className='w-full 2xl:w-2/5 gap-8 flex-colo px-8 py-5 sm:px-14 md:w-3/5 bg-main rounded-lg border border-border'>
          <div className='flex flex-colo'>
            <Image width={48} height={48} src='/logo/greenstone-logo.png' alt='logo' className='w-full h-12 object-contain' />
            <h1 className='text-navbar font-semibold'>Greenstone Packaging Corporation</h1>
          </div>
          <Input
            navbar
            name="name"
            onChange={handleChange}
            label="Full Name"
            placeholder="Enter Full Name"
            type="text"
            bg={true}
          />
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
          <Input
            navbar
            name="confirmPassword"
            onChange={handleChange}
            label="Confirm Password"
            placeholder="******"
            type="password"
            bg={true}
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button type='submit' className='bg-text transitions hover:bg-dry flex-rows gap-4 hover:text-navbar text-white p-4 rounded-lg w-full'>
            <FiLogIn /> Sign Up
          </button>
          <p className='text-center text-navbar'>
            Already have an account?{" "}
            <Link href='/login' className='text-text font-semibold ml-2'>Sign In</Link>
          </p>
        </form>
      </div>
  );
};