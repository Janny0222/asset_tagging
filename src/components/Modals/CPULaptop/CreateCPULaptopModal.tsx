import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import {  ChildrenModalProps, Option, ComputerInventoryProps } from '@/lib/definition'
import { Input, InputCost, InputDate, Select, SelectMonitor, TextArea } from '@/components/UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { PortContext } from '@/context/PortCompatibilityContex'
import { MonitorContext } from '@/context/MonitorContext'
import {CompanyContext} from '@/context/CompanyContext'
import { createComputerInvetory } from '@/services/ComputerInventory/computerService'
import { formatDate } from 'date-fns'
import { ComputerInventoryContext } from '@/context/ComputerContext'
import { useCompanyStore } from '@/stores/companyStore'

const CreateCPULaptopModal = ({modalOpen, setModalOpen} : ChildrenModalProps ) => {
  const { selectedPort } = useContext(PortContext)
  const {computerInventoryListRefresh} = useContext(ComputerInventoryContext)
  const {monitorList, selectedMonitor} = useContext(MonitorContext)
  const {selectedCompany} = useCompanyStore()
  const [formData, setFormData] = useState<ComputerInventoryProps>({
    cost: '',
    table_name: selectedCompany?.id});
    const[error, setError] = useState<string>('');

    const formatToPesos = (value: string) => {
      const numberValue = parseFloat(value.replace(/,/g, '')); // Remove existing commas to parse the number
      if (isNaN(numberValue)) return '';
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
      }).format(numberValue).replace('PHP', '₱'); // Use ₱ symbol instead of PHP
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
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const formattedCost = formatToPesos(value);
      setFormData({ ...formData, [name]: formattedCost });
    };
    const monitorOptions: Option[] = monitorList.map((port) => ({
        value: port.id!,
        title: port.brand!+ ' ' + port.serial_number!,
    })) 

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const res = await createComputerInvetory(formData);
        
        computerInventoryListRefresh();
        setFormData({
            name: '',
            department: '',
            computer_type: '',
            cost: '',
            monitor: '',
            remote_details: '',
            pc_details: '',
            table_name: '',
            specs: '',
            date_purchased: '',
            date_installed: '',
        })
        setModalOpen(false)
        setError('')
    } catch (error: unknown) {
      if(error instanceof Error && error.message) {
        setError(error.message);
        
      }
    }
    };
  const handleSelectChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(`Changing ${field} to ${value}`); // Log the change
    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalOpen(false)
    setError('')
    setFormData({
        name: '',
        department: '',
        computer_type: '',
        cost: '',
        monitor: '',
        remote_details: '',
        pc_details: '',
        table_name: '',
        specs: '',
        date_purchased: '',
        date_installed: '',
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
              <Input name='computer_type' label='Computer Type' value={formData?.computer_type || ''} navbar placeholder="Computer Type" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputCost name='cost' label='Cost' navbar placeholder="₱0.00" value={formData?.cost || ''} type="text" bg={false} onChange={handleCostChange} onBlur={handleBlur} />
            </div>
            <div className='col-span-2'>
              <Input name='supplier' label='Supplier' value={formData?.supplier || ''} navbar placeholder="Supplier" type="text" bg={false} onChange={handleChange} />
            </div>
            
            <div className='col-span-2 leading-3'>
              <TextArea name='specs' label='Specs' navbar placeholder="Specs" value={formData?.specs || ''} onChange={handleChange} />
              <span className='text-[10px] text-red-500 pt-[-2em]'><em>*Separate specs with a comma</em></span>
            </div>
            <div className='col-span-2 leading-3'>
              <TextArea name='pc_details' label='PC Details' navbar placeholder="PC Details" value={formData?.pc_details || ''} onChange={handleChange} />
              <span className='text-[10px] text-red-500 pt-[-2em]'><em>*Separate PC Details with a comma</em></span>
            </div>
            <div className='col-span-2'>
              <TextArea name='remote_details' label='Remote Details' navbar placeholder="Remote Details" value={formData?.remote_details || ''} onChange={handleChange} />
            </div>
            <div className='col-span-6'>
              <TextArea name='remarks' label="Remarks" navbar placeholder='Remarks' value={formData.remarks || ''} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Select label='Monitor' navbar options={monitorOptions} name={'monitor'} selectedValue={selectedMonitor?.id} onChange={handleSelectChange('monitor')} />
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Purchased' name='date_purchased' type='date' value={formData.date_purchased || ''} onChange={handleChange}/>
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Installed' name='date_installed' type='date'  value={formData.date_installed || ''} onChange={handleChange}/>
            </div>
            
            <div className='col-span-6'>
            <span className='text-red-600 font-bold italic'>{error}</span>
              <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                <HiPlusCircle />  ADD
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

export default CreateCPULaptopModal