import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { AssetInventoryProps, ChildrenModalProps, CompanyProps } from '@/lib/definition'
import { Input, InputCost, InputDate, TextArea } from '../../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'
import { useCompanyStore } from '@/stores/companyStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { createAssetInventory } from '@/services/AssetInventory/assetInventoryService'
import { toast } from 'react-toastify'

const CreateAssetInventoryModal = ({modalOpen, setModalOpen} : ChildrenModalProps ) => {
  const { fetchAssetInventoryData} = useAssetInventoryStore()
  const { selectedCompany} = useCompanyStore()
  const { selectedCategory } = useCategoryStore()
  const[formData, setFormData] = useState<AssetInventoryProps>({
    category_id: selectedCategory?.id!,
    company_id: selectedCompany?.id
  });
    const[error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const tableNameData = {
            ...formData,
            company_id: selectedCompany?.id,
            category_id: selectedCategory?.id
        }
        const res = await createAssetInventory(tableNameData);
        toast.success(res.message)
        fetchAssetInventoryData()
        setModalOpen(false)
        setFormData({});
        setError('')
    } catch (error: unknown) {
      if(error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
        console.log(error);
      }
      
    }
    };
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
              cost: cleanedValue,
          }));
      }

    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setFormData({});
    }
  
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-2xl md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-main text-navbar'>
        <span className='absolute left-4 top-3 text-xs'>{selectedCompany?.name}</span>
            <h2 className='text-2xl font-bold text-black text-left'> Create {selectedCategory?.name}  </h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-8 gap-6 text-left mt-6'>
            <div className='col-span-4'>
                <Input name='person_in_charge' label={'Person In-charge'} navbar placeholder="Person In-charge" type="text" bg onChange={handleChange} value={formData?.person_in_charge || ''} />
            </div>
            <div className='col-span-2'>
                <Input name='department' label={'Department'} value={formData?.department || ''} navbar placeholder="Department" type="text" bg onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='invoice_number' label={'Invoice Number'} value={formData?.invoice_number || ''} navbar placeholder="Invoice Number" type="text" bg onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <InputDate name='invoice_date' label={'Invoice Date'} value={formData.invoice_date} navbar type="date" bg onChange={handleChange} /> 
            </div>
            <div className='col-span-2'>
              <InputCost name='cost' label='Cost' navbar placeholder="₱0.00" value={formData?.cost || ''} type="text" bg onChange={handleCostChange} onBlur={handleBlur} />
            </div>
            <div className='col-span-2'>
                <Input name='supplier' label={'Supplier'} value={formData.supplier || ''} navbar placeholder="Supplier" type="text" bg onChange={handleChange} />
            </div>
            <div className='col-span-2'>
                <Input name='model_number' label={'Model Number'} value={formData.model_number || ''} navbar placeholder="Model Number" type="text" bg onChange={handleChange} />
            </div>
            <div className='col-span-3 leading-3'>
              <TextArea name='asset_info' label={'Asset Info'} value={formData.asset_info || ''} navbar placeholder="Asset Info" bg onChange={handleChange} />
              <span className='text-[10px] text-red-500'><em>*Separate Asset Info with a comma</em></span>
            </div>
            <div className='col-span-3 leading-3'>
              <TextArea name='specs' label={'Specification'} value={formData.specs || ''} navbar placeholder="Specification" bg onChange={handleChange} />
              <span className='text-[10px] text-red-500'><em>*Separate Specification with a comma</em></span>
            </div>
            <div className='col-span-2 leading-3'>
              <TextArea name='remarks' label={'Remarks'} value={formData.remarks || ''} navbar placeholder="Remakrs" bg onChange={handleChange} />
              <span className='text-[10px] text-red-500'><em>*Separate Remarks with a comma</em></span>
            </div>
            <div className='col-span-8 grid grid-cols-6'>
              <div className='col-span-3'>
                <InputDate name='date_deployed' label={'Date Deployed'} value={formData.date_deployed} navbar type="date" bg onChange={handleChange} />
              </div>
            </div>
            <span className='text-red-600 font-bold italic'>{error}</span>
            <div className='col-span-8'>
                <button type='submit' className='w-full flex-rows  gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white'>
                  <HiPlusCircle />  ADD
                </button>
            </div>
            <div className='absolute right-4 top-4'>
                    <button onClick={handleCloseModal} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-text border border-border rounded-full hover:bg-dry'>
                        <IoClose />
                    </button>
            </div>
            </form>
        </div>
    </MainModal>
  )
}

export default CreateAssetInventoryModal