import React, { useEffect } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, ServerAccountsProps } from '@/lib/definition'
import { Input, TextArea } from '@/components/UserInput'
import { HiCheckCircle, HiPlusCircle, HiTrash } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useServerAccountsStore } from '@/stores/serverAccountsStore'
import { useCompanyStore } from '@/stores/companyStore'
import { showToast } from '@/utils/toastify'
import { deleteServerAccount, updateServerAccount } from '@/services/ServerAccounts/serverAccountsServices'

const EditServerAccountsModal = ({modalOpen, setModalOpen}: ChildrenModalProps) => {
    const [formData, setFormData] = React.useState<ServerAccountsProps>({})
    const { companyData } = useCompanyStore();
    const [error, setError] = React.useState<string>('');
    const { specificServerAccountData, fetchAllServerAccountsData } = useServerAccountsStore();

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                company_id: formData.company_id || specificServerAccountData?.company_id,
            };

            const response = await updateServerAccount(specificServerAccountData?.id!, updatedFormData);
            
            fetchAllServerAccountsData(specificServerAccountData?.company_id)
            showToast.success(`${response.message}`);
            handleCloseModal();
        } catch (error: unknown) {
            if(error instanceof Error) {
                showToast.error(error.message);
                console.log(error);
            }
        }
    }

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await deleteServerAccount(specificServerAccountData?.id!);
            showToast.success(response.message);
            fetchAllServerAccountsData(specificServerAccountData?.company_id);
            handleCloseModal();
        } catch (error) {
            console.error(error);
            setError('An error occurred while updating the server account.');
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const companyName = companyData.find(company => company.id === formData.company_id)?.name || '';
    useEffect(() => {
        if (specificServerAccountData) {
            setFormData(specificServerAccountData);
        }
    }, [specificServerAccountData]);
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setFormData({});
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setFormData({ ...formData, status: selectedValue });
    };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-md md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-white text-navbar'>
          <h2 className='text-2xl font-bold text-black text-left'> Update Server Account </h2>
          <hr />
          <div className='grid grid-cols-4 gap-2 text-left mt-6'>
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
            <div className='col-span-2'>
                <Input name='company_id' label={'Company'} disabled value={companyName} navbar type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <div className='text-sm w-full'>
                    <label htmlFor={'status'} className={`text-navbar font-semibold text-xs`}>Status</label>
                    <select value={formData?.status || ''} className={`w-full mt-1 px-2 py-2 text-navbar bg-white  border border-border rounded`} onChange={handleSelectChange}>
                        <option value="">Please select</option>
                            <option key={1} value={'Active'}>
                                Active
                            </option>
                            <option key={2} value={'InActive'}>
                                InActive
                            </option>
                    </select>
                </div>
            </div>
            <div className='col-span-4'>
                <TextArea name='remarks' rows={3} label={'Remarks'} value={formData.remarks || ''} navbar placeholder="Remarks" bg={false} onChange={handleChange} />
            </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-4  flex flex-row gap-2'>
                <form className='w-full' onSubmit={handleSubmit} >
                    <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions font-bold border-2 border-subMain hover:bg-white rounded bg-text text-white hover:text-green-700'>
                      <HiCheckCircle />  Update Account
                    </button>
                </form>
                <form className='w-full' onSubmit={handleDelete} >
                    <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions font-bold border-2 border-red-600 hover:bg-white rounded bg-red-500 text-white hover:text-red-500'>
                      <HiTrash />  Remove Account
                    </button>
                </form>
            </div>
            <div className='absolute right-4 top-4'>
              <button onClick={handleCloseModal} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-black border border-border rounded-full hover:bg-black/80'>
                  <IoClose />
              </button>
          </div>
          </div>
          
        </div>
    </MainModal>
  )
}

export default EditServerAccountsModal