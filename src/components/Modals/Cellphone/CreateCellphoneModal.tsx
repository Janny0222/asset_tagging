import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import MainModal from '../MainModal'
import { CellphoneInventoryProps, ChildrenModalProps } from '@/lib/definition'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { InputDate, TextArea, Input, InputCost } from '@/components/UserInput'
import { createCellphoneInventory } from '@/services/Cellphone/cellphoneService'
import { CompanyContext } from '@/context/CompanyContext'
import { useCellphone } from '@/context/CellphoneContext'


const CreateCellphoneModal = ({modalOpen, setModalOpen, onSubmit}: ChildrenModalProps) => {
    const [error, setError] = useState('')
    const { cellphoneInventoryListRefresh } = useCellphone()
    const { selectedCompany } = useContext(CompanyContext)
    const [formData, setFormData] = useState<CellphoneInventoryProps>({})

    const formatToPesos = (value: string) => {
        const numberValue = parseFloat(value.replace(/,/g, '')); // Remove existing commas to parse the number
        if (isNaN(numberValue)) return '';
        return new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
          minimumFractionDigits: 2,
        }).format(numberValue).replace('PHP', '₱'); // Use ₱ symbol instead of PHP
      };
      const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formattedCost = formatToPesos(value);
        setFormData({ ...formData, [name]: formattedCost });
      };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        // Set the cleaned value for cost
        setFormData({ ...formData, [e.target.name]: e.target.value, table_name: selectedCompany?.id });
    };
    const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/[^0-9.]/g, '');;
          setFormData((prevData) => ({
              ...prevData,
              cost: cleanedValue,
          }));
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await createCellphoneInventory(formData);
            
            cellphoneInventoryListRefresh();
            setFormData({
                name: '',
                department: '',
                brand: '',
                cost: '',
                cp_details: '',
                inclusion: '',
                email_password: '',
                specs: '',
                plan: '',
                remarks: '',
                table_name: '',
                date_ordered: '',
                date_deployed: '',
            })
            setModalOpen(false)
            setError('')
        } catch (error: unknown) {
          if(error instanceof Error && error.message) {
            setError(error.message);
            
          }
        }
    };
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setFormData({
            name: '',
            department: '',
            brand: '',
            cost: '',
            plan: '',
            cp_details: '',
            remarks: '',
            table_name: '',
            specs: '',
            date_ordered: '',
            date_deployed: '',
        })
      }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border  border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-6 transform  h-full bg-main text-white'>
        <h2 className='text-3xl font-bold text-text'> Create </h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2 text-left mt-6'>
            <div className='col-span-4'>
              <Input name='name' label='Assigned To' value={formData?.name || ''} navbar placeholder="Assigned To" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='department' label='Department' value={formData?.department || ''} navbar placeholder="Department" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='brand' label='Brand' value={formData?.brand || ''} navbar placeholder="Brand" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputCost name='cost' label='Cost' navbar placeholder="₱0.00" value={formData?.cost || ''} type="text" bg={false} onChange={handleCostChange} onBlur={handleBlur} />
            </div>
            <div className='col-span-2'>
              <Input name='inclusion' label='Inclusion' value={formData?.inclusion || ''} navbar placeholder="Inclusion" type="text" bg={false} onChange={handleChange} />
            </div>
            
            <div className='col-span-3'>
            
              <TextArea name='cp_details' label='CP Details' value={formData?.cp_details || ''} navbar placeholder="CP Details" onChange={handleChange} />
              <span className='text-[10px] text-red-500 '><em>*Separate with a comma</em></span>
            </div>
            <div className='col-span-3'>
              <TextArea name='plan' label='Plan' value={formData?.plan || ''} navbar placeholder="plan" onChange={handleChange} />
            </div>
            <div className='col-span-2 leading-3'>
              
                <TextArea name='specs' label='Specs' navbar placeholder="Specs" value={formData?.specs || ''} onChange={handleChange} />
                <span className='text-[10px] text-red-500 '><em>*Separate with a comma</em></span>
            </div>
            <div className='col-span-2 leading-3'>
              <TextArea name='email_password' label='Email & Password' navbar placeholder="Email & Password" value={formData?.email_password || ''} onChange={handleChange} />
              <span className='text-[10px] text-red-500 '><em>*Separate with a comma</em></span>
            </div>
            <div className='col-span-2'>
              <TextArea name='remarks' label="Remarks" navbar placeholder='Remarks' value={formData.remarks || ''} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Ordered' name='date_ordered' type='date' value={formData.date_ordered || ''} onChange={handleChange}/>
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Deployed' name='date_deployed' type='date'  value={formData.date_deployed || ''} onChange={handleChange}/>
            </div>
            
            <div className='col-span-6'>
            <span className='text-red-600 font-bold italic'>{error}</span>
              <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                <HiPlusCircle/>  ADD
              </button>
            </div>
            <div className='absolute right-4 top-4'>
                    <button onClick={handleCloseModal} className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                        <IoClose />
                    </button>
            </div>
            </form>

        </div>
    </MainModal>
  )
}

export default CreateCellphoneModal