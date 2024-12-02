import { CompanyContext } from '@/context/CompanyContext'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FaEdit, FaSearch, FaTag } from 'react-icons/fa'
import { CreateInventory } from '../ui/buttons'
import { CellphoneInventoryProps, TableColumn } from '@/lib/definition';
import Toggle from '../Toggle';
import { useStatusToggle } from '@/context/ToggleContext';
import { MdDelete } from 'react-icons/md';
import Table from '../Table/Table';
import CreateCellphoneModal from '../Modals/Cellphone/CreateCellphoneModal';
import UpdateCellphoneModal from '../Modals/Cellphone/UpdateCellphoneModal';
import { useCompanyStore } from '@/stores/companyStore';
import GenerateTaggingModal from '../Modals/Tagging/GenerateTaggingModal';
import { useCellphoneInventoryStore } from '@/stores/cellphoneInventoryStore';
import { useStatusToggleChange } from '@/stores/statusToggleStore';



const CellphoneList = ({ tabName} : {tabName: string}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [modalDeleteData, setModalDeleteData] = useState(false)
    const [modalGenerateTaggingData, setModalGenerateTaggingData] = useState(false)
    const { selectedCompany} = useCompanyStore()
    const { cellphoneInventoryList, fetchCellphones } = useCellphoneInventoryStore()
    const {status } = useStatusToggleChange()

const tableHead: TableColumn[] = [
    { key: 'assigned_to', label: 'Assigned to' },
    { key: 'department', label: 'Department' },
    { key: 'brand', label: 'Brand' },
    { key: 'cost', label: 'Cost' },
    { key: 'cp_details', label: 'CP Details' },
    { key: 'inclusion', label: 'Inclusions' },
    { key: 'email_password', label: 'Email and Password' },
    { key: 'specs', label: 'Model and Specs' },
    { key: 'date_purchased', label: 'Date Purchased' },
    { key: status === 'active' ? 'date_deployed' : 'date_returned', label: status === 'active' ? 'Date Deployed' : 'Date Returned' },
    ];

    const itemsPerPage = 7
    // // Pagination
    // useEffect(() => {
    //     fetchCellphones()
    // }, [fetchCellphones, status, selectedCompany?.id])
    const {paginated, totalPages, totalFilteredCount} = useMemo(() => {
        const filteredItems = cellphoneInventoryList.filter((cellphone) => {
            return (
                cellphone.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cellphone.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cellphone.cp_details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cellphone.specs?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cellphone.brand?.toString().includes(searchQuery.toLowerCase()) ||
                cellphone.email_password?.toString().includes(searchQuery.toLowerCase()) ||
                cellphone.cost?.toString().includes(searchQuery.toLowerCase()) ||
                cellphone.inclusion?.toString().includes(searchQuery.toLowerCase()) 
            )
        })
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
        const paginated = filteredItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        return {paginated, totalPages, totalFilteredCount: filteredItems.length}
    }, [cellphoneInventoryList, searchQuery, currentPage, itemsPerPage]) 

    // Highlight
    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-yellow-300">{part}</span>
            ) : (
                part
            )
        );
    };
    // Edit Button
    const handleEditData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalEditOpen(true)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    const handlePageChange = (pageNumber: number) => {
        if(pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }
    const handleCreate = () => {
        setCreateModalOpen(true)
    }
    
    const handleDeleteData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalDeleteData(true)
    }

    const handleGenerateTaggingData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalGenerateTaggingData(true)
    }
   

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-5 py-3';
    
    const renderRow = (data: CellphoneInventoryProps) => {
        
        return (
            <>
                <td className={`${Text} truncate`}>{highlightText(data.name || '', searchQuery)}</td>
                <td className={`${Text}`}>{highlightText(data.department || '', searchQuery)}</td>
                <td className={`${Text}`}>{highlightText(data.brand || '', searchQuery)}</td>
                <td className={`${Text}`}>{highlightText(data.cost || '', searchQuery)}</td>
                <td className={`${Text} truncate`}>{data.cp_details?.split(",").map((details, index) => (index >= 0 && (<div key={index}>{highlightText(details.trim(), searchQuery)}</div>)))}</td>
                <td className={`${Text}`}>{highlightText(data.inclusion || '', searchQuery)}</td>
                <td className={`${Text}`}>{highlightText(data.email_password?.match(/Email:\s*([^\s]+,?\s*)/i)?.join('Email')?.split(',')[0] || '', searchQuery)}</td>
                <td className={`${Text} truncate`}>{data.specs?.split(",").map((details, index) => (index >= 0 && (<div key={index}>{highlightText(details.trim(), searchQuery)}</div>)))}</td>
                <td className={`${Text}`}>{data.date_ordered}</td>
                <td className={`${Text}`}>{data.date_deployed}</td>
                <td className={` ${Text} `}>
                    <div className='flex gap-2 justify-center items-center'>
                        <button onClick={() => handleEditData(data.id)} aria-label="Edit item" className=" bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                                <FaEdit className="text-text" />
                        </button>
                        <button onClick={() => handleGenerateTaggingData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                            <FaTag className="text-blue-700" />
                        </button>
                        <button onClick={() => handleDeleteData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                            <MdDelete className="text-red-500" />
                        </button>
                    </div>
                
                </td>
            </>
        )
    }
  return (
    <>
    <GenerateTaggingModal modalOpen={modalGenerateTaggingData} setModalOpen={setModalGenerateTaggingData} id={selectedId} asset_type={'CP'}/>
    <UpdateCellphoneModal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen} id={selectedId} />
        <CreateCellphoneModal modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} onSubmit={() => ({})}/>
        <div className='bg-gray-200 min-h-full'>
            <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="10"
                data-aos-offset="200"
                className='pt-5 min-h-screen bg-gray-200 px-5 '>
                <div className='bg-white text-black p-5 rounded-md'>
                    <h1 className='text-2xl font-medium text-text'> {tabName} Inventory </h1>
                    <h1 className='uppercase font-semibold'>{selectedCompany?.name}</h1>
                    <div className='py-2 mt-5'>
                        <div className=' grid grid-cols-8 sm:gap-10 gap-'>
                            <form className='sm:col-span-7 col-span-6 text-sm bg-white border rounded flex gap-2'>
                                <div className='bg-subMain w-12 flex-colo h-12 text-text py-2 rounded'>
                                    <FaSearch />
                                </div>
                                <input type='text' onChange={handleSearch} placeholder='Search....'
                                className='font-medium placeholder:text-border w-11/12 text-sm h-12 border-none rounded-md text-black' aria-label='Search Computer' />
                            </form>
                            <div className='col-span-2 sm:col-span-1'>
                                <CreateInventory onClick={handleCreate} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-colo mx-auto justify-between'>
                    <div className='w-full px-5 flex justify-between flex-row-reverse items-center'>
                        <Toggle />
                        <h3 className='text-lg font-bold my-6 text-navbar'> {totalFilteredCount ? `Total ${totalFilteredCount} item/s Found`  : 'No item/s Found'}</h3>
                    </div>
                    {paginated.length > 0 ? (
                        <>

                        <Table tableHead={tableHead} rowData={paginated} rowRender={renderRow} />

                        <div className="relative right-auto flex my-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded mr-2"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-navbar text-white' : 'bg-gray-200'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded ml-2"
                        >
                            Next
                        </button>
                    </div>
                        </>
                    ) : (
                        <div className='flex flex-colo text-navbar '>
                            <span>No {tabName} data found</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default CellphoneList