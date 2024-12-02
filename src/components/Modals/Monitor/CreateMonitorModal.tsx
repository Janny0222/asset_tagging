import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { MonitorProps, ChildrenModalProps, Option } from '@/lib/definition'
import { Input, InputDate, Select } from '@/components/UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { createMonitor } from '@/services/MonitorInventory/monitorService'
import { PortContext } from '@/context/PortCompatibilityContex'
import {CompanyContext} from '@/context/CompanyContext'

const CreateMonitorModal = ({modalOpen, setModalOpen, name, onSubmit} : ChildrenModalProps ) => {
  const {portList, selectedPort} = useContext(PortContext)
  const {selectedCompany} = useContext(CompanyContext)
  const[formData, setFormData] = useState<MonitorProps>({});
    const[error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ 
        ...formData, 
        [e.target.name]: 
        e.target.value });
    };

    
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const res = await createMonitor(formData);
        
        setFormData({
            brand: '',
            model: '',
            serial_number: '',
            cost: '',
            port_compatibility_id: '',
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
        company_table: selectedCompany?.id,
    }));
  };

  const handleCloseModal = () => {
    setModalOpen(false)
    setError('')
  }
  
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <h2 className='text-3xl font-bold text-text'> Create </h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
            <div className='col-span-3'>
              <Input name='brand' label='Brand' navbar placeholder="Brand" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-3'>
              <Input name='model' label='Model' navbar placeholder="Model" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='serial_number' label='Serial Number' navbar placeholder="Serial Number" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='cost' label='Cost' navbar placeholder="Cost" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Select label='Port Compatibility' navbar options={[]} name={'port_compatibility_id'} selectedValue={selectedPort?.id} onChange={handleSelectChange('port_compatibility_id')} />
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Purchased' name='date_purchased' type='date' value={formData.date_purchased} onChange={handleChange}/>
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Installed' name='date_installed' type='date'  value={formData.date_installed} onChange={handleChange}/>
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

export default CreateMonitorModal