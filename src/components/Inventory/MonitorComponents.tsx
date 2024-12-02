
import Table from '@/components/Table/Table'
import React, {useMemo, useState } from 'react'
import { useContext } from 'react'
import { MonitorContext } from '@/context/MonitorContext'
import { CreateInventory } from '@/components/ui/buttons'
import { FaEdit, FaSearch, FaTag } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import CreateMonitorModal from '@/components/Modals/Monitor/CreateMonitorModal'
import { MonitorProps, PortProps, TableColumn } from '@/lib/definition'
import { CompanyContext } from '@/context/CompanyContext'
import { PortContext } from '@/context/PortCompatibilityContex'
import UpdateMonitorModal from '@/components/Modals/Monitor/UpdateMonitorModal'
import GenerateTaggingModal from '../Modals/Tagging/GenerateTaggingModal'


const tableHead: TableColumn[] = [
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'cost', label: 'Cost' },
    { key: 'serial_number', label: 'Serial Number' },
    { key: 'port_compatibility', label: 'Port Compatibility' },
    { key: 'date_purchased', label: 'Date Purchased' },
    { key: 'date_installed', label: 'Date Installed' },
  ];


export const MonitorList = ({tabName}: {tabName: string}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [modalDeleteData, setModalDeleteData] = useState(false)
    const [modalGenerateTaggingData, setModalGenerateTaggingData] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const {selectedCompany} = useContext(CompanyContext)
    const {portList} = useContext(PortContext)
    const {monitorList, monitorRefresh} = useContext(MonitorContext)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(1)
    const [fetchError, setFetchError] = useState<string | null>(null);

    const itemsPerPage = 7

   
    const {paginated, totalPages} = useMemo(() => {
        const filteredItems = monitorList.filter((monitor) => {
            const portName = portList.find((port: PortProps) => port.id === monitor.port_compatibility_id)?.name
            
            return (
                monitor.assigned_to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                monitor.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                monitor.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                monitor.serial_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                monitor.cost?.toString().includes(searchQuery.toLowerCase()) ||
                portName?.toLowerCase().includes(searchQuery.toLowerCase())
                
            ) 
        })
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
        const paginated = filteredItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        
        return {paginated, totalPages}
    }, [monitorList, searchQuery, currentPage, itemsPerPage, portList]) 

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
    const handleClick = () => {
        setModalOpen(true)
    }

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

    const handleDeleteData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalDeleteData(true)
    }
    const handleGenerateTaggingData = (id: number | undefined) => {
        setSelectedId(id!)
        setModalGenerateTaggingData(true)
    }

const Text = 'text-sm sm:text-xs text-center leading-6 whitespace-nowrap px-5 py-3';
const renderRow = (data: MonitorProps) => {
    const portType = portList.find((port: PortProps) => port.id === data.port_compatibility_id)?.name || 'Unknown Port'
    return (
        <>
            <td className={`${Text} truncate`}>{highlightText(data.brand || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.model || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.cost || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(data.serial_number || '', searchQuery)}</td>
            <td className={`${Text}`}>{highlightText(portType || '', searchQuery)}</td>
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
        <GenerateTaggingModal modalOpen={modalGenerateTaggingData} setModalOpen={setModalGenerateTaggingData} id={selectedId} asset_type={'MON'} onSubmit={monitorRefresh} />
        <CreateMonitorModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={1} name={'1'} onSubmit={monitorRefresh}/>
          <UpdateMonitorModal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen} id={selectedId} name={selectedId.toString()} onSubmit={monitorRefresh}/>
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
                            <div className=' grid grid-cols-8 gap-10'>
                                <form className='sm:col-span-7 col-span-6 text-sm bg-white border rounded flex gap-2'>
                                    <div className='bg-subMain w-12 flex-colo h-12 text-text py-2 rounded'>
                                        <FaSearch />
                                    </div>
                                    <input type='text' onChange={handleSearch} placeholder='Search....'
                                    className='font-medium placeholder:text-border w-11/12 text-sm h-12 border-none rounded-md text-black' aria-label='Search Monitors' />
                                </form>
                                <div className='col-span-2 sm:col-span-1'>
                                    <CreateInventory onClick={handleClick} />
                                </div>
                            </div>
                        </div>
                
                    </div>
                    <div className='flex flex-colo mx-auto justify-between'>
                        <h3 className='text-xl font-medium my-6 text-text'> </h3>
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
                                <span>No Monitor's Data Found</span>
                            </div>
                        )}
                    </div>
                    {fetchError && <div className="text-red-500">{fetchError}</div>}
                </div>
            </div>
        </>
  )
}

