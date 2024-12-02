/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps, TaggingProps } from '@/lib/definition'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useTaggingStore } from '@/stores/taggingStore'
import { useCompanyStore } from '@/stores/companyStore'
import { createTagging } from '@/services/Tagging/taggingService'
import domtoimage from 'dom-to-image';
import { useCategoryStore } from '@/stores/categoryStore'
import QRGenerator from '@/components/QRCodeGenerator/QRGenerator'
import Image from 'next/image'

const GenerateTaggingModal = ({modalOpen, setModalOpen, id} : ChildrenModalProps) => {
    const [error, setError] = useState<string >('')
    const { selectedCompany } = useCompanyStore()
    const {selectedCategory} = useCategoryStore()
    const { taggingData, selectedTagging, fetchAllTaggingData } = useTaggingStore()
    const [tagging, setTagging] = useState<TaggingProps>({
        tagging: '',
    })
    const taggingRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = () => {
        setModalOpen(false)
        setError('')
    }
    console.log('taggingData:' , taggingData)
    useEffect(() => {
        if(modalOpen && id) {
            fetchAllTaggingData(selectedCompany?.id!, selectedCategory?.id!)
        }
        
    }, [ fetchAllTaggingData, modalOpen, selectedTagging?.tagging, id, selectedCategory?.id, selectedCompany?.id])

    const control_no = '10000' + (taggingData.length + 1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setTagging(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const generateImage = async () => {
        // Create a canvas element
        if (taggingRef.current) {
            
            try {
                const dataUrl = await domtoimage.toPng(taggingRef.current);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${selectedCompany?.name}_control_${selectedCategory?.name + control_no}.png`;
                link.click();
              } catch (error) {
                console.error(error);
            }
          }
      };
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const data = await createTagging({
                ...tagging,
                asset_id: id,
                asset_type: selectedCategory?.id,
                table_id: selectedCompany?.id,
                tagging: selectedCompany?.code?.toUpperCase()+ '-' + selectedCategory?.name?.toUpperCase().slice(0, 3)! + control_no
            })
            generateImage()
        } catch (error: unknown) {
            if(error instanceof Error && error.message) {
              setError(error.message);
              
            }
        }
    }
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        
        <div className='relative inline-block transitions inset-0 w-full lg:max-w-lg xl:max-w-2xl border border-border shadow-xl rounded-2xl p-6 bg-main text-white'>
            <h1 className='text-navbar text-left'>Generate Tagging {selectedCompany?.logo_image}</h1>
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
                                                <QRGenerator text={selectedCompany?.code?.toUpperCase()+ '-' + selectedCategory?.name?.toUpperCase().slice(0, 3)! + control_no} />
                                            </div>
                                            <span className='text-white'>
                                                {selectedCompany?.code?.toUpperCase()+ '-' + selectedCategory?.name?.toUpperCase().slice(0, 3)! + control_no}
                                            </span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center font-bold rounded-md">
                                    <div className=' flex justify-center items-center flex-col '>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
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
                        <HiPlusCircle />  GENERATE TAGGING
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

export default GenerateTaggingModal