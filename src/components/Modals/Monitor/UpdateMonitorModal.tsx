import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'

import { InputDate, Input, Select } from '@/components/UserInput'
import {  HiCheckCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { ChildrenModalProps, MonitorProps, Option } from '@/lib/definition'
import { PortContext } from '@/context/PortCompatibilityContex'
import { CompanyContext } from '@/context/CompanyContext'
import { useButtonContext } from '@/context/ButtonContext'
import { MonitorContext } from '@/context/MonitorContext'
import { getSpecificMonitor, updateMonitor } from '@/services/MonitorInventory/monitorService'

const UpdateMonitorModal = ({modalOpen, setModalOpen, id,} : ChildrenModalProps ) => {
  const {  setSelectedMonitor, monitorRefresh } = useContext(MonitorContext);
  const [formData, setFormData] = useState<MonitorProps>({});
  const { selectedCompany } = useContext(CompanyContext);
  const [error, setError] = useState<string>('');
  const { portList } = useContext(PortContext);
  
  
  
useEffect(() => {
  if(modalOpen && id) {
    const fetchMonitorData = async () => {
      try {
        const response = await getSpecificMonitor(id);
        setFormData(response);
        console.log('response:', response)
      } catch (error) {
        setError('Error fetching data');
        console.error(error)
      }
    }
    fetchMonitorData()
  }
}, [modalOpen, id, setSelectedMonitor])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setModalOpen(false);
    setError('');
  }
  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateMonitor(id!, formData);
      monitorRefresh();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  }
  

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block transitions inset-0 sm:w-5/5 border border-border shadow-xl rounded-lg md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
                <div className='text-left flex flex-col gap-2'>
                  <h2 className='text-3xl  font-bold text-text'> Updating Data:</h2>
                  <span className='text-navbar/50 text-xs font-bold underline'>{formData.serial_number}</span>
                </div>

                <form onSubmit={handleUpdateSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
                
                <div className='col-span-3'>
                  <Input name='brand' label='Brand' navbar placeholder="Brand" type="text" bg={false} onChange={handleChange} value={formData?.brand}/>
                </div>
                <div className='col-span-3'>
                  <Input name='model' label='Model' navbar placeholder="Model" type="text" bg={false} onChange={handleChange} value={formData?.model} />
                </div>
                <div className='col-span-2'>
                  <Input name='serial_number' label='Serial Number' navbar placeholder="Serial Number" type="text" bg={false} onChange={handleChange} value={formData?.serial_number}/>
                </div>
                <div className='col-span-2'>
                  <Input name='cost' label='Cost' navbar placeholder="Cost" type="text" bg={false} onChange={handleChange} value={formData?.cost} />
                </div>
                <div className='col-span-2'>
                  <Select label='Port Compatibility' navbar options={[]} name={'port_compatibility_id'} selectedValue={formData?.port_compatibility_id} onChange={handleSelectChange('port_compatibility_id')} />
                </div>
                <div className='col-span-2'>
                  <InputDate label='Date Purchased' name='date_purchased' type='date' value={formData?.date_purchased} onChange={handleChange}/>
                </div>
                <div className='col-span-2'>
                  <InputDate label='Date Installed' name='date_installed' type='date'  value={formData?.date_installed} onChange={handleChange}/>
                </div>
                
                <div className='col-span-6'>
                <span className='text-red-600 font-bold italic'>{error}</span>
                  <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                    <HiCheckCircle />  UPDATE
                  </button>
                </div>
                <div className='absolute right-4 top-4'>
                        <button onClick={handleCloseModal} className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                            <IoClose />
                        </button>
                </div>
                <div className='flex flex-row gap-1 font-bold absolute text-xs text-gray-500/70 bottom-1 right-2 justify-end items-end text-right'>
                  <p className=' '>Date Created:</p>
                  <span className='  '>{formData.createdAt?.slice(0, 10)}</span>
                </div>
                </form>
            </div>
        </MainModal>
      )
}

export default UpdateMonitorModal