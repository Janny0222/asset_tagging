import React, { FormEvent, useContext, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, Option } from '@/lib/definition'
import { IoClose } from 'react-icons/io5'
import { Select } from '@/components/UserInput'
import {  useCompanyContext } from '@/context/CompanyContext'
import { HiCheckCircle } from 'react-icons/hi'
import { useMessage } from '@/context/MessageContext'
import { transferComputerInventory } from '@/services/ComputerInventory/computerService'
import { ComputerInventoryContext } from '@/context/ComputerContext'
import { useStatusToggle } from '@/context/ToggleContext'

const TransferComputerDataModal = ({modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const { tableData, setSelectedCompany, selectedCompany } = useCompanyContext()
    const { status } = useStatusToggle()
    const {  computerInventoryListRefresh } = useContext(ComputerInventoryContext)
    const { setMessage } = useMessage()
    const [formData, setFormData] = useState({
        table_name: 0,
    });
    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const companyData: Option[] = tableData.map((data) => ({
        value: data.id!,
        title: data.name!,
    }))

    const handleSelectChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(`Changing ${field} to ${value}`); // Log the change
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
      };

    const handleTransferSubmit = async () => {
        try {
            const res = await transferComputerInventory(id, formData);
            setMessage('Successfully transferred this data!');
            setModalOpen(false);
            computerInventoryListRefresh();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <h2 className='text-2xl font-bold text-text'> 
               {status === 'active' ? 'ARE YOU SURE YOU WANT TO ARCHIVE THIS DATA?' : 'RETRIEVE THIS DATA?'} 
            </h2>
            <p className='text-lg text-text'></p>
            <form  className='grid grid-cols-4 gap-6 text-left mt-6'>
            <div className='col-span-3'>
                <Select label='Select Company:' navbar options={companyData} name={'table_name'} selectedValue={formData.table_name} onChange={handleSelectChange('table_name')} />
            </div>
            <div className='col-span-6 mt-5'>
                    <button onClick={handleTransferSubmit} className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                    <HiCheckCircle />  TRANSFER
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

export default TransferComputerDataModal