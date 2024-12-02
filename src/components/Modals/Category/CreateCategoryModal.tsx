import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, CategoryProps } from '@/lib/definition'
import { Input } from '../../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { createCategory } from '@/services/Category/categoryService'
import { useCategoryStore } from '@/stores/categoryStore'

const CreateCategoryModal = ({modalOpen, setModalOpen} : ChildrenModalProps ) => {
  const {categoryRefresh} = useCategoryStore()
  const[formData, setFormData] = useState<CategoryProps>({
    name: '',
  });
    const[error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

        const res = await createCategory(formData);
        categoryRefresh()
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
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
            <div className='col-span-6'>
                <Input name='name' label={'Category Name'} navbar placeholder="Category Name" type="text" bg={false} onChange={handleChange} />
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

export default CreateCategoryModal