
import Table from '@/components/Table/Table'
import React, { useMemo, useState } from 'react'
import { useContext } from 'react'
import { MonitorContext } from '@/context/MonitorContext'
import { CreateInventory } from '@/components/ui/buttons'
import { FaEdit, FaSearch, FaTag } from 'react-icons/fa'
import {  MdDelete, MdOutlineArchive } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { ComputerInventoryProps, MonitorProps, PortProps, TableColumn } from '@/lib/definition'
import { CompanyContext } from '@/context/CompanyContext'
import { ComputerInventoryContext } from '@/context/ComputerContext'
import CreateCPULaptopModal from '../Modals/CPULaptop/CreateCPULaptopModal'
import UpdateCPULaptopModal from '../Modals/CPULaptop/UpdateCPULaptopModal'
import StatusToggle from '../StatusToggle'
import RemoveCPULaptopModal from '../Modals/CPULaptop/RemoveCPULaptopModal'
import Toggle from '../Toggle'
import { useStatusToggle } from '@/context/ToggleContext'
import GenerateTaggingModal from '../Modals/Tagging/GenerateTaggingModal'
import { useCompanyStore } from '@/stores/companyStore'

const tableHead: TableColumn[] = [
    { key: 'assigned_to', label: 'Assigned to' },
    { key: 'department', label: 'Department' },
    { key: 'computer_type', label: 'Computer Type' },
    { key: 'cost', label: 'Cost' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'monitor', label: 'Monitor' },
    { key: 'remote_details', label: 'Remote Details' },
    { key: 'details', label: 'Computer Info' },
    { key: 'specs', label: 'Sepcifications' },
    { key: 'date_ordered', label: 'Date Ordered' },
    { key: 'date_installed', label: 'Date Installed' },
  ];


export const CPULaptopList = ({tabName}: {tabName: string}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [modalDeleteData, setModalDeleteData] = useState(false)
    const [modalGenerateTaggingData, setModalGenerateTaggingData] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const {selectedCompany} = useCompanyStore()
    const {computerInventoryList, computerInventoryListRefresh} = useContext(ComputerInventoryContext)
    const {monitorList} = useContext(MonitorContext)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(1)
    const [fetchError, setFetchError] = useState<string | null>(null);
    const { status } = useStatusToggle();

    const itemsPerPage = 7
    // Pagination
   
    const {paginated, totalPages, totalFilteredCount} = useMemo(() => {
        const filteredItems = computerInventoryList.filter((computer) => {
            return (
                computer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                computer.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                computer.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                computer.pc_details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                computer.cost?.toString().includes(searchQuery.toLowerCase())
            )
        })
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
        const paginated = filteredItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        return {paginated, totalPages, totalFilteredCount: filteredItems.length}
    }, [computerInventoryList, searchQuery, currentPage, itemsPerPage]) 

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
        setModalOpen(true)
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

const renderRow = (data: ComputerInventoryProps) => {
    const monitorData = monitorList.find((monitor: MonitorProps) => monitor.id === data.monitor)
    const monitorBrand = monitorData?.brand
    const monitorSN = monitorData?.serial_number
    return (
        <>
            <td className={`${Text} truncate`}>{highlightText(data.name || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.department || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.computer_type || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.cost || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.supplier || '', searchQuery)}</td>
            <td className={`${Text}`}>{monitorBrand && monitorSN ? `${monitorBrand} - ${monitorSN}` : 'No Monitor'}</td>
            <td className={`${Text}`}>{highlightText(data.remote_details || '', searchQuery)}</td>
            <td className={`${Text} truncate`}>{data.pc_details?.split(",").map((details, index) => (index >= 0 && (<div key={index}>{highlightText(details.trim(), searchQuery)}</div>)))}</td>
            <td className={`${Text} truncate`}>{data.specs?.split(",").map((details, index) => (index >= 0 && (<div key={index}>{highlightText(details.trim(), searchQuery)}</div>)))}</td>
            <td className={`${Text}`}>{data.date_purchased}</td>
            <td className={`${Text}`}>{data.date_installed}</td>
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
        <GenerateTaggingModal asset_type='DESK' modalOpen={modalGenerateTaggingData} setModalOpen={setModalGenerateTaggingData} id={selectedId}/>
        <CreateCPULaptopModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={1} name={'1'} onSubmit={computerInventoryListRefresh}/>
          <UpdateCPULaptopModal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen} id={selectedId} name={selectedId.toString()} onSubmit={computerInventoryListRefresh}/>
            <RemoveCPULaptopModal modalOpen={modalDeleteData} setModalOpen={setModalDeleteData} id={selectedId} onSubmit={computerInventoryListRefresh}/>
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
                            <h3 className='text-lg font-bold my-6 text-navbar'> {totalFilteredCount ? `Total ${totalFilteredCount} item/s Found`  : 'No item/s Found'} </h3>
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
                                <span>No CPU / Laptop's Data Found</span>
                            </div>
                        )}
                    </div>
                    {fetchError && <div className="text-red-500">{fetchError}</div>}
                </div>
            </div>
        </>
  )
}

