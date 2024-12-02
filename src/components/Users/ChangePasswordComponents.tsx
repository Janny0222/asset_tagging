import { Input } from '@/components/UserInput'
import { CheckCircle2Icon, Link } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { TiArrowBack} from 'react-icons/ti'

const ChangePasswordComponents = () => {
  const [changePassword, setChangePassword] = useState({password: '', confirmPassword: ''})
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword(prev => ({
        ...prev,
        [name]: value,
    }));
};
    const handleBack = () => {
        window.history.back()
    }
  return (
    <div className='container mx-auto px-2 sm:my-24 mt-2 flex-colo'>
            <form onSubmit={handleBack} className='w-full 2xl:w-2/5 gap-8 flex-colo px-8 py-5 sm:px-14 md:w-3/5 bg-main rounded-lg border border-border'>
            <div className='flex items-start justify-start'>
                <h1 className='text-navbar font-semibold text-left'>CHANGE PASSWORD</h1>
            </div>
            <Input
                navbar
                name="password"
                onChange={handleChange}
                label="Password"
                placeholder="******"
                type="text"
                bg={true}
            />
            <Input
                navbar
                name="cpassword"
                onChange={handleChange}
                label="Confirm Password"
                placeholder="******"
                type="password"
                bg={true}
            />
            <button type='submit' className='bg-text transitions hover:bg-dry flex-rows gap-4 text-white hover:text-navbar p-4 rounded-lg w-full'>
                <CheckCircle2Icon /> Confirm
            </button>
            {error && <p className="text-red-500">{error}</p>}
            
            </form>
        </div>
  )
}

export default ChangePasswordComponents