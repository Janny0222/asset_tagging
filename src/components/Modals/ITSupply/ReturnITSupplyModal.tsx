import React, { ChangeEvent, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, DeployedSuppliesProps, Option, ReturnedSuppliesProps } from '@/lib/definition'
import { Input, InputDate, Select, TextArea } from '@/components/UserInput'
import { useSupplyInventoryStore } from '@/stores/suppliesInventoryStore'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { createDeployedSupply } from '@/services/DeploySupplies/deploySuppliesServices'
import { useDeployedSuppliesStore } from '@/stores/deployedSuppliesStore'
import { createReturnSupply } from '@/services/ReturnedSupplies/returnedSuppliesServices'

const ReturnITSupplyModal = ({ modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const {  specificSupplyInventoryData, fetchAllSuppliesInventoryData } = useSupplyInventoryStore()
    const { specificDeployedSupply, fetchDeployedSuppliesData } = useDeployedSuppliesStore();
    const [formData, setFormData] = useState<ReturnedSuppliesProps>({});
    const [error, setError] = React.useState<string>('');
    
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setFormData({});
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleQTYChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          const cleanedValue = value.replace(/[^0-9.]/g, '');
            setFormData((prevData) => ({
                ...prevData,
                quantity: Number(cleanedValue)
          }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            const newFormData = {
            ...formData,
            item_code: specificDeployedSupply?.item_code,
            date_deployed: specificDeployedSupply?.date_deployed,
            person_in_charge: specificDeployedSupply?.person_in_charge,
            quantity: formData.quantity,
        }
            const res = await createReturnSupply(newFormData);
            fetchAllSuppliesInventoryData();
            fetchDeployedSuppliesData();

            setModalOpen(false);
            setFormData({});
            setError('');
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                console.log(error);
            }
        }
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-md md:w-3/6 lg:w-2/6 w-full align-middle p-10 transform  h-full bg-white text-navbar'>
            <h2 className='text-2xl font-bold text-black text-left'> Return IT Supply </h2>
            <hr />
            <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-2 text-left mt-6'>
            <div className='col-span-2'>
                <Input name='item_code' disabled label={'Item Code'} value={specificDeployedSupply?.item_code || ''} navbar placeholder="Item Name" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='person_in_charge' disabled label={'Person In Charge'} value={specificDeployedSupply?.person_in_charge || ''} navbar placeholder="Person In-Charge" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                
                <Input name='quantity' label={'Quantity'} value={formData?.quantity || ''} navbar placeholder="Quantity"  bg={false} onChange={handleQTYChange} />
            </div>
            
            <div className='col-span-2'>
                <InputDate name='date_returned' label={'Date Returned'} value={formData?.date_returned || ''} navbar type="date" bg={false} onChange={handleChange} /> 
            </div>
            <div className='col-span-4'>
                <TextArea name='remarks' label={'Remarks'} value={formData?.remarks || ''} navbar placeholder="Remarks" bg={false} onChange={handleChange} />
            </div>
            <span className='text-red-600 font-bold italic w-full col-span-2'>{error}</span>
            <div className='col-span-4'>
                <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white hover:text-black'>
                    <HiPlusCircle />  RETURN
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

export default ReturnITSupplyModal