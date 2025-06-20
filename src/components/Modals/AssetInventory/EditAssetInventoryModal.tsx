import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { AssetInventoryProps, ChildrenModalProps, CompanyProps } from '@/lib/definition'
import { Input, InputCost, InputDate, TextArea } from '../../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'
import { useCompanyStore } from '@/stores/companyStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { createAssetInventory, updateSpecificAssetInventory } from '@/services/AssetInventory/assetInventoryService'
import { MdOutlineArchive } from 'react-icons/md'
import { BiTransferAlt } from 'react-icons/bi'
import { useStatusToggleChange } from '@/stores/statusToggleStore'
import { useTaggingStore } from '@/stores/taggingStore'
import ArchiveSpecificAssetInventoryModal from './ArchiveSpecificAssetInventoryModal'
import { useMessage } from '@/context/MessageContext'
import TransferAssetDataModal from './TransferAssetDataModal'

const EditAssetInventoryModal = ({modalOpen, setModalOpen, id} : ChildrenModalProps ) => {
  const { fetchSpecificAssetInventoryData, selectedAssetInventory, assetInventoryRefresh} = useAssetInventoryStore()
  const { selectedCompany} = useCompanyStore()
  const { selectedCategory } = useCategoryStore()
  const { selectedTagging, fetchAllTaggingData, taggingData } = useTaggingStore()
  const [archivedId, setArchivedId] = useState<number>(0)
  const [archived, setArchived] = useState<boolean>(false)
  const [transferData, setTransferData] = useState<boolean>(false)
  const {message, setMessage} = useMessage()
  const { status } = useStatusToggleChange()
  const [formData, setFormData] = useState<AssetInventoryProps>({...selectedAssetInventory});
  const[error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      if(modalOpen && id) {
        fetchSpecificAssetInventoryData(id!)
        fetchAllTaggingData(selectedCompany?.id!, selectedCategory?.id!)
      }
      
    }, [modalOpen, fetchSpecificAssetInventoryData, id, fetchAllTaggingData, selectedCompany?.id, selectedCategory?.id])
    
    useEffect(() => {
        setFormData({...selectedAssetInventory})
    }, [selectedAssetInventory])

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const tableNameData = {
            ...formData,
            company_id: selectedCompany?.id,
            category_id: selectedCategory?.id
        }
        const res = await updateSpecificAssetInventory(id!, tableNameData);
        assetInventoryRefresh()
        setModalOpen(false)
    } catch (error: unknown) {
      if(error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
      
    }
    };
    const formatToPesos = (value: string): string => {
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

    const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/[^0-9.]/g, '');;
          setFormData((prevData) => ({
              ...prevData,
              cost: cleanedValue,
          }));
      }
    const assetTag = taggingData.find((tag) => tag.asset_id === selectedAssetInventory?.id)?.tagging
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
        setMessage('')
        setFormData({...selectedAssetInventory});
    }

    const handleArchiveSubmit = async (e: MouseEvent, id: number | undefined) => {
        e.preventDefault();
        console.log(id)
        setArchivedId(id!)
        setArchived(true);
    }
    
    const handleTransferSubmit = async (e: MouseEvent, id: number | undefined) => {
    e.preventDefault();
    setArchivedId(formData.id!);
    setTransferData(true);
    }
    
    const width = '50%'
  
  return (
    <>
    <TransferAssetDataModal modalOpen={transferData} setModalOpen={setTransferData} id={archivedId}/>
    <ArchiveSpecificAssetInventoryModal modalOpen={archived} setModalOpen={setArchived} id={archivedId}/>
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-5/6 border border-border shadow-xl rounded-2xl md:w-4/6 lg:w-3/6 w-full align-middle p-10 transform  h-full bg-main text-navbar'>
        <span className={`absolute left-4 top-3 text-xs ${width}`}>{width ? selectedCompany?.name : selectedCompany?.code} </span>
        <span className='absolute right-14 sm:top-3 top-5 text-xs'>Tagging: {assetTag ? assetTag : 'No tagging yet'}</span>
            <h2 className='text-2xl font-bold text-black text-left'> Edit {selectedAssetInventory?.person_in_charge}  </h2>
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
                  <InputDate name='invoice_date' label={'Invoice Date'} value={formData?.invoice_date || ''} navbar type="date" bg onChange={handleChange} /> 
              </div>
              <div className='col-span-2'>
                <InputCost name='cost' label='Cost' navbar placeholder="₱0.00" value={formData?.cost || ''} type="text" bg onChange={handleCostChange} onBlur={handleBlur} />
              </div>
              <div className='col-span-2'>
                  <Input name='supplier' label={'Supplier'} value={formData.supplier || ''} navbar placeholder="Supplier" type="text" bg onChange={handleChange} />
              </div>
              <div className='col-span-2'>
                  <Input name='model_number' label={'Model Number'} value={formData?.model_number || ''} navbar placeholder="Model Number" type="text" bg onChange={handleChange} />
              </div>
              <div className='col-span-3 leading-3'>
                <TextArea name='asset_info' label={'Asset Info'} bg value={formData?.asset_info || ''} navbar placeholder="Asset Info" onChange={handleChange} />
                <span className='text-[10px] text-red-500'><em>*Separate Asset Info with a comma</em></span>
              </div>
              <div className='col-span-3 leading-3'>
                <TextArea name='specs' label={'Specification'} bg value={formData?.specs || ''} navbar placeholder="Specification" onChange={handleChange} />
                <span className='text-[10px] text-red-500'><em>*Separate Specification with a comma</em></span>
              </div>
              <div className='col-span-2 leading-3'>
                <TextArea name='remarks' label={'Remarks'} bg value={formData?.remarks || ''} navbar placeholder="Remakrs" onChange={handleChange} />
                <span className='text-[10px] text-red-500'><em>*Separate Remarks with a comma</em></span>
              </div>
              <div className='col-span-8 grid grid-cols-5 gap-2'>
                  <div className='col-span-3 flex flex-col gap-1'>
                      <InputDate name='date_deployed' disabled={status !== 'active'} label={'Date Deployed'} value={formData?.date_deployed || ''} navbar type="date" bg onChange={handleChange} />
                      {status !== 'active' && (
                        
                          <InputDate name='date_returned' label={'Date Returned'} value={formData?.date_returned || ''} navbar type="date" bg={false} onChange={handleChange} />
                        
                      )}
                  </div>
                  <div className='col-span-2 gap-2 flex flex-colo justify-between items-center '>
                    <div className='w-full'>
                      { status === 'active' ? (
                        <>
                          <button onClick={(e) => handleArchiveSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar w-full text-sm gap-2 px-2 rounded py-1 flex justify-center items-center ">
                                    <MdOutlineArchive className="text-navbar w-6 h-6" />Archive this Data
                          </button>
                          <span className='text-navbar'> </span>
                        </>
                        ) : (
                          <>
                          <button onClick={(e) => handleArchiveSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar w-full text-sm gap-2 px-2 rounded py-1 flex justify-center items-center ">
                                    <MdOutlineArchive className="text-navbar w-6 h-6" />Re-archived this Data
                          </button>
                          <span className='text-navbar'> </span>
                        </>
                        )
                      }
                    </div>
                    <div className='w-full'>
                      <button onClick={(e) => handleTransferSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar text-sm w-full gap-2 px-2 rounded py-1 flex justify-center items-center ">
                                  <BiTransferAlt className="text-navbar w-6 h-6" />Transfer this Data
                        </button>
                        <span className='text-navbar'> </span>
                    </div>
                  </div>
              </div>
              <div className='col-span-8'>
              <span className='text-red-600 font-bold italic'>{error}</span>
              <span className='text-green-600 font-bold italic'>{message}</span>
                  <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text text-white'>
                    <HiPlusCircle />  UPDATE
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
    </>
  )
}

export default EditAssetInventoryModal