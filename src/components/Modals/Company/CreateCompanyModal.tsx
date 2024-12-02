import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, CompanyProps } from '@/lib/definition'
import { Input, InputFile } from '../../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { createCompany } from '@/services/Company/companyService'
import { useCompanyStore } from '@/stores/companyStore'
import { uploadCompanyLogo } from '@/services/UploadFile/uploadCompanyLogo'

const CreateCompanyModal = ({modalOpen, setModalOpen, name, onSubmit} : ChildrenModalProps ) => {
  const {companyRefresh} = useCompanyStore()
  const[formData, setFormData] = useState<CompanyProps>({
    name: '',
    code: '',
    table_name:  '',
    logo_image:  '',
  });
    const[error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let logoFilePath = formData?.logo_image ? formData?.logo_image : formData?.code;
      const logoFileInput = document.querySelector('input[name="logo_image"]') as HTMLInputElement;

      if (logoFileInput?.files?.[0]) {
        logoFilePath = await uploadCompanyLogo(logoFileInput.files[0], formData.code!);
      }
        const tableNameData = {
            ...formData,
            table_name: formData.code + '_inventory',
            logo_image: logoFilePath
        }

        const res = await createCompany(tableNameData);
        companyRefresh()
        setModalOpen(false)
    } catch (error: unknown) {
      if(error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
      
    }
  };
  
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-navbar'>
            <h2 className='text-3xl font-bold text-black'> Create </h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-8 gap-6 text-left mt-6'>
            <div className='col-span-4'>
                <Input name='name' label={'Company Name'} navbar placeholder="Company Name" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-4'>
                <Input name='code' label={'Code or Initials'} value={formData.code} navbar placeholder="Code" type="text" bg={false} onChange={handleChange} />
                
            </div>
            <div className='col-span-4'>
                <Input name='table_name' disabled label={'Table Name'} value={formData.code! + '_inventory'} navbar placeholder="Table Name" type="text" bg={false} onChange={handleChange} />
                
            </div>
            <div className='col-span-4'>
                 <InputFile name='logo_image' label={'Logo Image'} value={formData?.logo_image} navbar placeholder="Logo" type="file" bg={false} onChange={handleChange} />
              </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-6'>
                <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white'>
                  <HiPlusCircle />  ADD
                </button>
            </div>
            <div className='absolute right-4 top-4'>
                    <button onClick={() => setModalOpen(false)} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-text border border-border rounded-full hover:bg-dry'>
                        <IoClose />
                    </button>
            </div>
            </form>
        </div>
    </MainModal>
  )
}

export default CreateCompanyModal