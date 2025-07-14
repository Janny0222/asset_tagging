import React from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, ServerAccountsProps } from '@/lib/definition'
import { Input, TextArea } from '@/components/UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { createServerAccount } from '@/services/ServerAccounts/serverAccountsServices'
import { useServerAccountsStore } from '@/stores/serverAccountsStore'
import { showToast } from '@/utils/toastify'

const CreateServerAccountsModal = ({ modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const [formData, setFormData] = React.useState<ServerAccountsProps>({})
    const { fetchAllServerAccountsData } = useServerAccountsStore();
    const [error, setError] = React.useState<string>('');

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setFormData({});
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const newFormData = {
                ...formData,
                company_id: id,
            }

            const response = await createServerAccount(id!, newFormData);
            if (response) {
                handleCloseModal();
                fetchAllServerAccountsData(id!);
                showToast.success(`${response.message}`);
            }

        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : 'An error occurred while creating the server account.');
        }
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-md md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-white text-navbar'>
          <h2 className='text-2xl font-bold text-black text-left'> New Server Account </h2>
          <hr />
          <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-2 text-left mt-6'>
            <div className='col-span-2'>
                <Input name='name' label={'Name'} value={formData?.name || ''} navbar placeholder="Name" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='department' label={'Department'} value={formData?.department || ''} navbar placeholder="Department" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='server_user' label={'Server User'} value={formData?.server_user || ''} navbar placeholder="Server User" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='server_password' label={'Server Password'} value={formData.server_password || ''} navbar placeholder="Server Password" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-4'>
                <TextArea name='remarks' rows={3} label={'Remarks'} value={formData.remarks || ''} navbar placeholder="Remarks" bg={false} onChange={handleChange} />
            </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-4'>
                <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white hover:text-black'>
                  <HiPlusCircle />  ADD
                </button>
            </div>
            <div className='absolute right-4 top-4'>
              <button onClick={handleCloseModal} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-black border border-border rounded-full hover:bg-black/80'>
                  <IoClose />
              </button>
          </div>
          </form>
          
        </div>
    </MainModal>
  )
}

export default CreateServerAccountsModal