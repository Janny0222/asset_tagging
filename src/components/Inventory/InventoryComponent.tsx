import React, { useEffect, useMemo, useState } from 'react'
import { FaEdit, FaSearch, FaTag } from 'react-icons/fa'
import { CreateInventory } from '../ui/buttons'
import { useCompanyStore } from '@/stores/companyStore'
import { MdDelete } from 'react-icons/md';
import { AssetInventoryProps, TableColumn } from '@/lib/definition';
import Toggle from '../Toggle';
import Table from '../Table/Table';
import { useAssetInventoryStore } from '@/stores/assetInventoryStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useStatusToggleChange } from '@/stores/statusToggleStore';
import CreateAssetInventoryModal from '../Modals/AssetInventory/CreateAssetInventoryModal';
import GenerateTaggingModal from '../Modals/Tagging/GenerateTaggingModal';
import EditAssetInventoryModal from '../Modals/AssetInventory/EditAssetInventoryModal';
import ArchiveSpecificAssetInventoryModal from '../Modals/AssetInventory/ArchiveSpecificAssetInventoryModal';
import RemoveAssetDataInventory from '../Modals/AssetInventory/RemoveAssetDataInventory';

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-5 py-3';



const InventoryComponents = () => {
    const {selectedCompany} = useCompanyStore()
    const { selectedCategory } = useCategoryStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [modalGenerateTaggingData, setModalGenerateTaggingData] = useState(false)
    const [modalEditAssetInventory, setModalEditAssetInventory] = useState(false)
    const [modalDeleteAssetInventory, setModalDeleteAssetInventory] = useState(false)
    const { status } = useStatusToggleChange()
    const { assetInventoryData, fetchAssetInventoryData, fetchSpecificAssetInventoryData, fetchAllAssetInventoryData } = useAssetInventoryStore()

        // Table Header
const tableHead: TableColumn[] = [
    { key: 'person_in_charge', label: 'Person In Charge' },
    { key: 'department', label: 'Department' },
    { key: 'invoice_number', label: 'Invoice Number' },
    { key: 'invoice_date', label: 'Invoice Date' },
    { key: 'cost', label: 'Cost' },
    { key: 'model_number', label: 'Model Number' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'asset_info', label: 'Asset Info' },
    { key: 'specs', label: 'Specifications' },
    { key: status === 'active' ? 'date_deployed' : 'date_returned', label: status === 'active' ? 'Date Deployed' : 'Date Returned' },
    { key: 'actions', label: 'Actions' },
  ];
    
    useEffect(() => {
        if (selectedCompany) {
            if(!selectedCategory) {
                fetchAllAssetInventoryData()
            } else {
                fetchAssetInventoryData();
            }
        }
    }, [selectedCompany, fetchAssetInventoryData, selectedCategory, status, fetchAllAssetInventoryData])
    
    // Search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }
    const filteredAssetInventory = assetInventoryData.filter((data) => data.company_id === selectedCompany?.id!)
    const filteredData = filteredAssetInventory.filter((data) => {
        return (
            data.person_in_charge?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.asset_info?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.model_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.specs?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.cost?.toString().includes(searchQuery.toLowerCase())
        )
    })
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
    useEffect(() => {
        if (selectedCompany?.id !== filteredAssetInventory[0]?.company_id!) {
            
            setCurrentPage(1)
        }
    }, [selectedCompany, filteredAssetInventory])
    
    // Pagination and data
    const itemsPerPage = 7
    
    const handlePageChange = (pageNumber: number) => {
        if(pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }
    
    const {paginated, totalPages, totalFilteredCount} = useMemo(() => {
        const filteredItems = filteredData.filter((data) => {
            return (
                data.person_in_charge?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.asset_info?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.model_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.specs?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.cost?.toString().includes(searchQuery.toLowerCase())
            )
        })
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
        const paginated = filteredItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        return {paginated, totalPages, totalFilteredCount: filteredItems.length}
    }, [ searchQuery, currentPage, itemsPerPage, filteredData])
    
    // Action and Modal
    const handleGenerateTaggingData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalGenerateTaggingData(true)
        fetchSpecificAssetInventoryData(id!)
    }
    const handleCreate = () => {
        setModalOpen(true)
    }
    const handleEditData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalEditAssetInventory(true)
    }
    const hanldeDeleteData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalDeleteAssetInventory(true)
    }
    // Table Data
    const renderRow = (data: AssetInventoryProps) => {
        return (
            <>
                <td className={`${Text} truncate`}>{highlightText(data.person_in_charge || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.department || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.invoice_number || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.invoice_date || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.cost || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.model_number || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.supplier || '', searchQuery)}</td>
                <td className={`${Text} `}>{data.asset_info?.split(',').map((asset, index) => (index >= 0 && (<div key={index}>{highlightText(asset.trim(), searchQuery)}</div>)))}</td>
                <td className={`${Text} `}>{data.specs?.split(',').map((spec, index) => (index >= 0 && (<div key={index}>{highlightText(spec.trim(), searchQuery)}</div>)))}</td>
                <td className={`${Text} `}>{status === 'active' ? data.date_deployed || '' : data.date_returned || ''}</td>
                <td className={` ${Text} `}>
                    <div className='flex gap-2 justify-center items-center'>
                        <button onClick={() => handleEditData(data.id)} aria-label="Edit item" className=" bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                            <FaEdit  className="text-text" />
                        </button>
                        <button onClick={() => handleGenerateTaggingData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                            <FaTag className="text-blue-700" />
                        </button>
                        <button onClick={() => hanldeDeleteData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                            <MdDelete className="text-red-500" />
                        </button>
                    </div>
                </td>
            </>
        )
    }
  return (
    <>
    <GenerateTaggingModal 
        modalOpen={modalGenerateTaggingData}
        setModalOpen={setModalGenerateTaggingData}
        id={selectedId}
    />
    <RemoveAssetDataInventory id={selectedId} modalOpen={modalDeleteAssetInventory} setModalOpen={setModalDeleteAssetInventory} />
    <EditAssetInventoryModal id={selectedId} modalOpen={modalEditAssetInventory} setModalOpen={setModalEditAssetInventory} />
        <CreateAssetInventoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <div className='bg-gray-200 min-h-full'>
                <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="10"
                    data-aos-offset="200"
                    className='pt-5 min-h-screen bg-gray-200 px-5 '>
                    <div className='bg-white text-black p-5 rounded-md'>
                        <h1 className='text-2xl font-medium text-text'>{selectedCategory?.name} Inventory </h1>
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
                                <h3 className='text-lg font-bold my-6 text-navbar'> {totalFilteredCount ? `Total ${totalFilteredCount} item/s Found`  : `${totalFilteredCount} item/s Found`} </h3>
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
                                    <span>No Data Found</span>
                                </div>
                            )}
                        </div>
                </div>
        
        </div>
    </>
  )
}

export default InventoryComponents