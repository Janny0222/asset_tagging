import React, { useEffect, useRef, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps } from '@/lib/definition'
import { useTaggingStore } from '@/stores/taggingStore'
import { useCompanyStore } from '@/stores/companyStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import domtoimage from 'dom-to-image';
import QRGenerator from '@/components/QRCodeGenerator/QRGenerator'
import { useAssetInventoryStore } from '@/stores/assetInventoryStore'

const ReprintTaggingModal = ({ modalOpen, setModalOpen, name} : ChildrenModalProps) => {
    const { fetchSpecificTaggingDatas, selectedTagging } = useTaggingStore()
    const { fetchSelectedCompanyData, selectedCompany } = useCompanyStore()
    const { fetchSpecificCategoryData, selectedCategory } = useCategoryStore()
    const {selectedAssetInventory} = useAssetInventoryStore()
    const [error, setError] = useState<string >('')

    const taggingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(modalOpen && name) {
            fetchSelectedCompanyData(selectedTagging?.table_id!)
            fetchSpecificTaggingDatas(name!)
            fetchSpecificCategoryData(selectedTagging?.asset_id!)
        }
    }, [fetchSpecificTaggingDatas, fetchSelectedCompanyData, fetchSpecificCategoryData, selectedTagging?.asset_id, name, modalOpen, selectedTagging?.table_id])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        generateImage();
    }

    const generateImage = async () => {
        // Create a canvas element
        if (taggingRef.current) {
            
            try {
                const dataUrl = await domtoimage.toPng(taggingRef.current);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${selectedCompany?.name}_control_${selectedTagging?.tagging}.png`;
                link.click();
              } catch (error) {
                console.error(error);
            }
          }
      };

    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
    }
  return (
    
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border  border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-6 transform  h-full bg-main text-white'>
            <h1 className='text-navbar text-left'>Reprint Tagging {name}</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2 text-left '>
                <div className='col-span-6'>
                    <div className='flex justify-center items-center gap-2 border text-navbar border-navbar rounded-sm p-2'>
                        
                        <div
                            ref={taggingRef}
                            style={{
                                width: '600px',
                                height: '300px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                            >
                            <div className=" m-0 p-0 justify-between grid grid-cols-2 ">
                                <div
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        height: '300px',
                                        width: '300px',
                                        textAlign: 'center',
                                        borderRight: '2px solid black',
                                        backgroundColor: '#10402c'
                                    }}
                                    className='text-center text-white flex justify-center items-center'>   
                                    <div className='flex flex-col gap-2'>
                                            <div className=''>
                                                <QRGenerator text={selectedAssetInventory?.asset_info!} />
                                            </div>
                                            <span className='text-white'>
                                                {selectedTagging?.tagging}
                                            </span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center font-bold rounded-md">
                                    <div className=' flex flex-col gap-2 '>
                                        <div style={{
                                            width: '170px',
                                            height: '200px',
                                            backgroundImage: `url('/uploads/${selectedCompany?.logo_image}')`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                        }} className='self-center'></div>
                                        <span className='text-lg'>{selectedCompany?.name}</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-6'>
                    <span className='text-red-600 font-bold italic'>{error}</span>
                    <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                        <HiPlusCircle />  REPRINT TAGGING
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

export default ReprintTaggingModal