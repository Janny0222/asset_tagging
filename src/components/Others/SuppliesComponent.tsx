import React, { useEffect, useMemo, useState } from 'react'
import Table from '../Table/Table'
import { useSupplyInventoryStore } from '@/stores/suppliesInventoryStore'
import {  DeployedSuppliesProps, ReturnedSuppliesProps, SupplyInventoryProps } from '@/lib/definition'
import CreateITSupplyModal from '../Modals/ITSupply/CreateITSupplyModal'
import DeployITSupplyModal from '../Modals/ITSupply/DeployITSupplyModal'
import { useDeployedSuppliesStore } from '@/stores/deployedSuppliesStore'
import ReturnITSupplyModal from '../Modals/ITSupply/ReturnITSupplyModal'
import { useReturnedSuppliesStore } from '@/stores/returnedSuppliesStore'
import EditITSupplyModal from '../Modals/ITSupply/EditITSupplyModal'

const tableHeaders = {
    supplies: [
        { key: 'item_code', label: 'Item Code' },
        { key: 'item_name', label: 'Item Name' },
        { key: 'manufacturer', label: 'Manufacturer' },
        { key: 'description', label: 'Description' },
        { key: 'item_cost', label: 'Item Cost' },
        { key: 'stocks', label: 'Stocks' },
        { key: 'actions', label: 'Actions' },
    ],
    deployed: [
        { key: 'person_in_charge', label: 'Person In Charge' },
        { key: 'item_code', label: 'Item Code' },
        { key: 'date_deployed', label: 'Date Deployed' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'remarks', label: 'Remarks' },
        { key: 'actions', label: 'Actions' },
    ],
    return_history: [
        { key: 'person_in_charge', label: 'Person In Charge' },
        { key: 'item_code', label: 'Item Code' },
        { key: 'date_deployed', label: 'Date Deployed' },
        { key: 'date_returned', label: 'Date Returned' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'remarks', label: 'Remarks' },
    ]
}

const tabs = [
  { key: 'supplies', label: 'Supplies' },
  { key: 'deployed', label: 'Deployed' },
  { key: 'return_history', label: 'Return History' },]

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-5 py-3';
const itemsPerPage = 10;

const useFilteredPaginatedData = (data: any[], query: string, currentPage: number, keys: string[]) => {
    const filtered = useMemo(() =>
        data.filter(item => keys.some(key => item[key]?.toString().toLowerCase().includes(query.toLowerCase()))
    ), [data, query, keys]);
    const paginated = useMemo(() => 
    filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filtered, currentPage]);   
    return {
        data: paginated,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        totalFilteredCount: filtered.length
    }
}

const highlightText = (text: string, query: string) => {
    if (!query) return text
    return text.split(new RegExp(`(${query})`, 'gi')).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <span key={index} className="bg-yello-300">{part}</span> : part)
};

const SuppliesComponents = () => {
    const [activeTab, setActiveTab] = useState<'supplies' | 'deployed' | 'return_history'>('supplies');
    const [openCreateSupplyModal, setOpenCreateSupplyModal] = useState(false);
    const [openEditSupplyModal, setOpenEditSupplyModal] = useState(false);
    const [openDeploySupplyModal, setOpenDeploySupplyModal] = useState(false);
    const [openReturnSupplyModal, setOpenReturnSupplyModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [allTableHead, setAllTableHead] = useState<{key: string; label: string }[]>([]);
    const { fetchAllSuppliesInventoryData, fetchSpecificSupplyInventoryData, suppliesInventoryData } = useSupplyInventoryStore();
    const { fetchDeployedSuppliesData, deployedSuppliesData,specificDeployedSupply, fetchSpecificDeployedSupply } = useDeployedSuppliesStore();
    const { fetchReturnedSuppliesData, returnedSuppliesData } = useReturnedSuppliesStore();
    
    useEffect(() => {
        if(activeTab === 'supplies' && suppliesInventoryData.length === 0) {
            fetchAllSuppliesInventoryData();
        } else if (activeTab === 'deployed' && deployedSuppliesData.length === 0) {
            fetchDeployedSuppliesData();
        } else if (activeTab === 'return_history' && returnedSuppliesData.length === 0) {
            fetchReturnedSuppliesData()
        }
    }, [fetchAllSuppliesInventoryData, returnedSuppliesData, suppliesInventoryData, deployedSuppliesData, fetchDeployedSuppliesData, fetchReturnedSuppliesData, activeTab]);

    const handleCreate = () => {
        setOpenCreateSupplyModal(true)
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
        }
    const handleDeploy = (id: number) => {
        fetchSpecificSupplyInventoryData(id);
        setOpenDeploySupplyModal(true);
    }

    const handleEdit = (id: number) => {
        fetchSpecificSupplyInventoryData(id);
        setOpenEditSupplyModal(true);
    }
    const handleReturn = (id: number) => {
        fetchSpecificDeployedSupply(id)
        setOpenReturnSupplyModal(true);
    }

    const filteredSupplies = useFilteredPaginatedData(suppliesInventoryData, searchQuery, currentPage, ['item_code', 'item_name', 'manufacturer', 'description', 'item_cost', 'stocks']);
    const filteredDeployed = useFilteredPaginatedData(deployedSuppliesData, searchQuery, currentPage, ['person_in_charge', 'item_code', 'date_deployed', 'quantity', 'remarks']);
    const filteredReturned = useFilteredPaginatedData(returnedSuppliesData, searchQuery, currentPage, ['person_in_charge', 'item_code', 'date_deployed', 'date_returned', 'quantity', 'remarks']);
    
    const rowRenderers = {
        supplies: (data: SupplyInventoryProps) => (
            <>
                <td className={`${Text} truncate`}>{highlightText(data.item_code || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.item_name || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.manufacturer || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.description || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data?.item_cost?.toString()!, searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.stocks?.toString() || '', searchQuery)}</td>
                <td className={` ${Text} `}>
                    <div className='flex flex-row gap-2 justify-center items-center'>
                        <button onClick={() => handleDeploy(data.id!)} aria-label="Deploy Supply" className=" bg-white border-2 text-white px-2 rounded  py-1 flex-colo">
                            <span className='text-xs font-bold text-navbar'>Deploy</span>
                        </button>
                        |
                        <button onClick={() => handleEdit(data.id!)} aria-label="Deploy Supply" className=" bg-white border-2 text-white px-2 rounded  py-1 flex-colo">
                            <span className='text-xs font-bold text-navbar'>Edit</span>
                        </button>
                    </div>
                </td>
            </>
        ),
        deployed: (data: DeployedSuppliesProps) => (
            <>
                <td className={`${Text} truncate`}>{highlightText(data.person_in_charge || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.item_code || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.date_deployed || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.quantity?.toString() || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.remarks || '', searchQuery)}</td>
                <td className={` ${Text} `}>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <button onClick={() => handleReturn(data.id!)} aria-label="Deploy Supply" className=" bg-white border-2 text-white px-2 rounded w-full py-1 flex-colo">
                            <span className='text-xs text-navbar font-bold'>Return</span>
                        </button>
                    </div>
                </td>
            </>
        ),
        return_history: (data: ReturnedSuppliesProps) => (
            <>
                <td className={`${Text} truncate`}>{highlightText(data.person_in_charge || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.item_code || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.date_deployed || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.date_returned || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.quantity?.toString() || '', searchQuery)}</td>
                <td className={`${Text} `}>{highlightText(data.remarks || '', searchQuery)}</td>
            </>
        )
    }

  return (
    <>  
        <EditITSupplyModal modalOpen={openEditSupplyModal} setModalOpen={setOpenEditSupplyModal} id={specificDeployedSupply?.id} />
        <ReturnITSupplyModal modalOpen={openReturnSupplyModal} setModalOpen={setOpenReturnSupplyModal} id={specificDeployedSupply?.id} />
        <DeployITSupplyModal modalOpen={openDeploySupplyModal} setModalOpen={setOpenDeploySupplyModal} id={0} />
        <CreateITSupplyModal modalOpen={openCreateSupplyModal} setModalOpen={setOpenCreateSupplyModal} />
        <div className='bg-gray-200 min-h-screen container mx-auto p-5'>
            <div>
                <h1 className='text-2xl font-bold mb-5'>IT Supplies Management</h1>
                
                <div className='bg-white p-5 rounded shadow-md'>
                    <div className='flex gap-1 mb-1 mt-5 text-xl'>
                        {tabs.map(({key, label}) => (
                            <button 
                                key={key} 
                                className={`px-4 py-2 rounded ${activeTab === key ? 'bg-navbar text-white' : 'bg-gray-300 text-gray-700'}`}
                            
                                onClick={() => setActiveTab(key as typeof activeTab)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <hr />
                    
                        <div className='flex gap-3'>
                            <input type='text' onChange={handleSearch} placeholder='Search....'
                                    className='font-medium p-2 placeholder:text-border w-full text-sm h-16 = rounded-md mt-3 border text-black' aria-label='Search' />
                        {
                        activeTab === 'supplies' && 
                            (  <button onClick={handleCreate} className='bg-gray-400 transitions hover:bg-gray-300 text-black font-bold w-36 px-4 py-2 rounded mt-3'>
                                Add Supply
                            </button>
                            )
                        }
                        </div>
                        
                    <div className='mt-5'>
                        <Table 
                        tableHead={tableHeaders[activeTab]}
                        rowData={activeTab === 'supplies' ? filteredSupplies.data : activeTab === 'deployed' ? filteredDeployed.data : filteredReturned.data}
                        rowRender={rowRenderers[activeTab]}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuppliesComponents