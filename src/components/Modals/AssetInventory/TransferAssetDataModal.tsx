import { AssetInventoryProps, ChildrenModalProps, Option } from '@/lib/definition'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'
import React, { useState } from 'react'
import MainModal from '../MainModal'
import { Select } from '@/components/UserInput'
import { HiCheckCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useCompanyStore } from '@/stores/companyStore'
import { useStatusToggleChange } from '@/stores/statusToggleStore'
import { useMessage } from '@/context/MessageContext'

const TransferAssetDataModal = ({modalOpen, setModalOpen} : ChildrenModalProps) => {
    const {selectedAssetInventory, transferAsset} = useAssetInventoryStore()
    const { companyData} = useCompanyStore()
    const [formData, setFormData] = useState<AssetInventoryProps>({})
    const {message, setMessage} = useMessage()
    
    const companyList: Option[] = companyData.map((company) => ({
        value: company.id!,
        title: company.name!
    }))
    const handleSelectChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(`Changing ${field} to ${value}`); // Log the change
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
      };
    const handleTransfer = async () => {
        if(selectedAssetInventory) {
            await transferAsset(selectedAssetInventory?.id!, formData)
            setMessage('Successfully transferred this data!')
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setFormData({})
    }
  return (
    
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <h2 className='text-2xl font-bold text-text'> 
               ARE YOU SURE YOU WANT TO TRANSFER THIS DATA?'
            </h2>
            <p className='text-lg text-text'></p>
            <form  className='grid grid-cols-4 gap-6 text-left mt-6'>
            <div className='col-span-3'>
                <Select label='Select Company:' navbar options={companyList} name={'company_id'} selectedValue={selectedAssetInventory?.company_id} onChange={handleSelectChange('company_id')} />
            </div>
            <div className='col-span-6 mt-5'>
                <span className='text-green-600 font-bold italic'>{message}</span>
                    <button onClick={handleTransfer} className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
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

export default TransferAssetDataModal