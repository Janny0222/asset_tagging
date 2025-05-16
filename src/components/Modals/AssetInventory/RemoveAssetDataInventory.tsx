import { ChildrenModalProps } from '@/lib/definition'
import React, { FormEvent, useEffect } from 'react'
import MainModal from '../MainModal'
import { CgCheck, CgClose } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'

const RemoveAssetDataInventory = ({modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const { fetchSpecificAssetInventoryData, selectedAssetInventory, removeAsset, assetInventoryRefresh } = useAssetInventoryStore()

    useEffect(() => {
        if(modalOpen) fetchSpecificAssetInventoryData(id!)
    }, [modalOpen, fetchSpecificAssetInventoryData, id])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await removeAsset(selectedAssetInventory?.id!)
        setModalOpen(false)
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <h2 className='text-2xl font-bold text-text'>Are you sure you want to remove this data?</h2>
            <p className='text-lg text-text'>{selectedAssetInventory?.person_in_charge}</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-6 text-left mt-6'>
            <button type='submit' className='w-full col-span-2 flex-rows gap-2 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'> 
                  <CgCheck /> <span className='hidden sm:block'>YES</span> 
              </button>
              <button type='button' onClick={() => setModalOpen(false)} className='w-full col-span-2 flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'>
                  <CgClose />  <span className='hidden sm:block'>NO</span> 
              </button>
              <div className='absolute right-4 top-4'>
                      <button onClick={() => setModalOpen(false)} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                          <IoClose />
                      </button>
              </div>
            </form>
        </div>
    </MainModal>
  )
}

export default RemoveAssetDataInventory