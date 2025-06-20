import React, { FormEvent, useContext } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps } from '@/lib/definition'
import { CgCheck, CgClose } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { ComputerInventoryContext } from '@/context/ComputerContext'
import { archiveComputerInventory, reArchivedComputerInventory } from '@/services/ComputerInventory/computerService'
import { useMessage } from '@/context/MessageContext'
import { useStatusToggle } from '@/context/ToggleContext'
import { archiveAssetInventory, reActivateAssetInventory } from '@/services/AssetInventory/assetInventoryService'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'
import { useStatusToggleChange } from '@/stores/statusToggleStore'

const ArchiveSpecificAssetInventoryModal = ({ modalOpen, setModalOpen, onSubmit, id }: ChildrenModalProps) => {
    const { assetInventoryRefresh } = useAssetInventoryStore()
    const { setMessage } = useMessage()
    const { status } = useStatusToggleChange()

    const handleSubmit = async () => {
        try {
            if( status === 'active') {
                const response = await archiveAssetInventory(id!);
                setMessage('Successfully archived this data!')
                setModalOpen(false)
                assetInventoryRefresh() 
            } else {
                const response = await reActivateAssetInventory(id!);
                setMessage('Successfully re-activate this data!')
                setModalOpen(false)
                assetInventoryRefresh()
            }
            
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <h2 className='text-2xl font-bold text-text'> 
               {status === 'active' ? 'ARE YOU SURE YOU WANT TO ARCHIVE THIS DATA?' : 'RETRIEVE THIS DATA?'} 
            </h2>
            <p className='text-lg text-text'></p>
            <form  className='grid grid-cols-4 gap-6 text-left mt-6'>
            <button onClick={handleSubmit} tabIndex={0} className='w-full col-span-2 flex-rows gap-2 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'> 
                <CgCheck /> <span className='hidden sm:block'>YES</span> 
            </button>
            <button type='button' onClick={() => setModalOpen(false)} className='w-full col-span-2 flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'>
                <CgClose />  <span className='hidden sm:block'>NO</span> 
            </button>
            <div className='absolute right-4 top-4'>
                    <button onClick={() => setModalOpen(false)} tabIndex={0} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                        <IoClose />
                    </button>
            </div>
            </form>
        </div>
    </MainModal>
  )
}

export default ArchiveSpecificAssetInventoryModal