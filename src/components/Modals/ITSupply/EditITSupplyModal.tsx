import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, SupplyInventoryProps } from '@/lib/definition'
import { IoClose } from 'react-icons/io5'
import { Box, Button, Link, Stack } from '@mui/material';
import { Input, InputCost, InputDate } from '@/components/UserInput';
import { HiCheckCircle, HiPlusCircle } from 'react-icons/hi';
import { useSupplyInventoryStore } from '@/stores/suppliesInventoryStore';
import { createSupplyInventory, updateSupplyInventory } from '@/services/SupplyInventory/suppliesInventoryServices';

const EditITSupplyModal = ({modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const [formData, setFormData] = React.useState<SupplyInventoryProps>({})
    const { fetchSpecificSupplyInventoryData, specificSupplyInventoryData, fetchAllSuppliesInventoryData } = useSupplyInventoryStore();
    const [error, setError] = React.useState<string>('');

    useEffect(() => {
        fetchSpecificSupplyInventoryData(id);
    }, [fetchSpecificSupplyInventoryData, id]);

    useEffect(() => {
        if(specificSupplyInventoryData) {
        setFormData(specificSupplyInventoryData!);
        }
    }, [specificSupplyInventoryData]);
        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    };  

    const handleCloseModal = () => {
        setModalOpen(false)
        // setError('')
        // setFormData({});
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await updateSupplyInventory(specificSupplyInventoryData?.id!, formData);
            fetchAllSuppliesInventoryData()
            console.log(formData);
            setModalOpen(false)
            setFormData({});
      } catch (error: unknown) {
        if(error instanceof Error) {
          setError(error.message);
          console.log(error);
        }
      }
    };

    const handleQTYChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        setFormData((prevData) => ({
            ...prevData,
            stocks: Number(cleanedValue),
        }));
    }

    const handleAddQty = (e: FormEvent) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
                stocks: (prevData.stocks || 0) + 1,
        }));
    }

    const handleMinusQty = (e: FormEvent) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            stocks: Math.max((prevData.stocks || 0) - 1, 0), // Ensure stocks don't go below 0
        }));
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-md md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-white text-navbar'>
          <h2 className='text-2xl font-bold text-black text-left'> Edit IT Supply </h2>
          <hr />
          <form onSubmit={handleSubmit} className='grid grid-cols-8 gap-2 text-left mt-6'>
            <div className='col-span-2'>
                <Input name='item_code' disabled label={'Item Code'} navbar placeholder="Item Code" type="text" bg={false} onChange={handleChange} value={formData?.item_code || ''} />
            </div>
            <div className='col-span-2'>
                <Input name='item_name' disabled label={'Item Name'} value={formData?.item_name || ''} navbar placeholder="Item Name" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='manufacturer' disabled label={'Manufacturer'} value={formData?.manufacturer || ''} navbar placeholder="Manufacturer" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='description' disabled label={'Description'} value={formData?.description || ''} navbar placeholder="Description" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputCost name='item_cost' label='Item Cost' navbar placeholder="₱0.00" value={formData?.item_cost || ''} type="text" bg={false} disabled />
            </div>
            <div className='col-span-2'>
                <div className=''>
                    <div className='flex gap-1 mt-5 align-middle justify-center items-center'>
                        <button onClick={handleMinusQty} className='border rounded p-2'> - </button>
                        
                        <input name='stocks' value={formData.stocks || ''} onChange={handleQTYChange} className=' text-center bg-white border border-border rounded-md p-2' type='text' />
                        <button onClick={handleAddQty} className='border rounded  p-2'> + </button>
                    </div>
                </div>
            </div>
            <div className='col-span-2'>
                <Input name='invoice_number' disabled label={'Invoice Number'} value={formData?.invoice_number || ''} navbar placeholder="Model Number" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <InputDate name='invoice_date' disabled label={'Invoice Date'} value={formData?.invoice_date || ''} navbar type="date" bg={false} onChange={handleChange} /> 
            </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-8'>
                <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white hover:text-black'>
                  <HiCheckCircle />  UPDATE
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

export default EditITSupplyModal