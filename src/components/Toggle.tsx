import { useStatusToggleChange } from '@/stores/statusToggleStore'
import React from 'react'


const Toggle = () => {
    const {status, toggleStatus } = useStatusToggleChange()

  return (
    <div className='flex items-center flex-col-reverse me-5'>
        <input 
        type='checkbox' 
        id='toggle-checkbox' 
        className='sr-only' 
        checked={status === 'active'} 
        onChange={toggleStatus} 
        aria-label='Toggle Status' 
        />
        <label htmlFor="toggle-checkbox" className={`cursor-pointer relative w-14 h-6  rounded-full p-1 transition-colors duration-200 ease-in-out ${status === 'inactive' ? 'bg-red-500' : 'bg-green-500'}`}>
            <span className={`block w-4 h-4 shadow-black rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${status === 'inactive' ? 'translate-x-8 shadow-black bg-white' :'translate-x-0 bg-white' }`}>

            </span>
        </label>
        <p className=''><strong>{status === 'active' ? 'Active' : 'Inactive'}</strong></p>
    </div>
  )
}

export default Toggle