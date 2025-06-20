import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, SupplyInventoryProps } from '@/lib/definition'
import { IoClose } from 'react-icons/io5'
import { Box, Button, Link, Stack } from '@mui/material';
import { Input, InputCost, InputDate } from '@/components/UserInput';
import { HiPlusCircle } from 'react-icons/hi';
import { useSupplyInventoryStore } from '@/stores/suppliesInventoryStore';
import { createSupplyInventory } from '@/services/SupplyInventory/suppliesInventoryServices';

const CreateITSupplyModal = ({modalOpen, setModalOpen} : ChildrenModalProps) => {
  const [formData, setFormData] = React.useState<SupplyInventoryProps>({})
  const { fetchAllSuppliesInventoryData } = useSupplyInventoryStore();
  const [error, setError] = React.useState<string>('');

  useEffect(() => {
      fetchAllSuppliesInventoryData();
  }, [fetchAllSuppliesInventoryData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

  const handleCloseModal = () => {
        setModalOpen(false)
        // setError('')
        // setFormData({});
    }
    const formatToPesos = (value: string) => {
      const numberValue = parseFloat(value.replace(/,/g, ''));
        if (isNaN(numberValue)) return '';
        return new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
          minimumFractionDigits: 2,
      }).format(numberValue).replace('PHP', '');
    };
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formattedCost = formatToPesos(value);
        setFormData({ ...formData, [name]: formattedCost });
       
      };
    
    const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const cleanedValue = value.replace(/[^0-9.]/g, '');
        setFormData((prevData) => ({
            ...prevData,
            item_cost: cleanedValue,
      }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await createSupplyInventory(formData);
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
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-md md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-white text-navbar'>
          <h2 className='text-2xl font-bold text-black text-left'> Add New IT Supply </h2>
          <hr />
          <form onSubmit={handleSubmit} className='grid grid-cols-8 gap-2 text-left mt-6'>
            <div className='col-span-2'>
                <Input name='item_code' label={'Item Code'} navbar placeholder="Item Code" type="text" bg={false} onChange={handleChange} value={formData?.item_code || ''} />
            </div>
            <div className='col-span-2'>
                <Input name='item_name' label={'Item Name'} value={formData?.item_name || ''} navbar placeholder="Item Name" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='manufacturer' label={'Manufacturer'} value={formData?.manufacturer || ''} navbar placeholder="Manufacturer" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='description' label={'Description'} value={formData?.description || ''} navbar placeholder="Description" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputCost name='item_cost' label='Item Cost' navbar placeholder="₱0.00" value={formData?.item_cost || ''} type="text" bg={false} onChange={handleCostChange} onBlur={handleBlur} />
            </div>
            <div className='col-span-2'>
                <Input name='stocks' label={'Stocks'} value={formData.stocks || ''} navbar placeholder="Stocks" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='invoice_number' label={'Invoice Number'} value={formData.invoice_number || ''} navbar placeholder="Model Number" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <InputDate name='invoice_date' label={'Invoice Date'} value={formData.invoice_date} navbar type="date" bg={false} onChange={handleChange} /> 
            </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-8'>
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

export default CreateITSupplyModal