import React, { useEffect, useMemo, useState } from 'react'
import Table from '../Table/Table'
import { Select } from '../UserInput'
import { useCompanyStore } from '@/stores/companyStore'
import { Option, ServerAccountsProps } from '@/lib/definition'
import { useServerAccountsStore } from '@/stores/serverAccountsStore'
import CreateServerAccountsModal from '../Modals/ServerAccounts/CreateServerAccountsModal'
import EditServerAccountsModal from '../Modals/ServerAccounts/EditServerAccountsModal'


const tableHead = [
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'server_user', label: 'Server User' },
  { key: 'status', label: 'Status' },
  { key: 'remarks', label: 'Remarks' },
  { key: 'actions', label: 'Actions' },
]

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-5 py-3';



const ServerAccountsComponent = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const { companyData, selectedCompany, fetchSelectedCompanyData } = useCompanyStore()
    const { fetchAllServerAccountsData, serverAccountsData, fetchSpecificServerAccountData } = useServerAccountsStore()
    const [companyId, setCompanyId] = React.useState<number>(selectedCompany?.id! || 1);
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    
    
    const companyList: Option[] = companyData.map((company) => ({
        value: company.id!,
        title: company.name!
    }))

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedItem = companyData.find(item => item.id === +selectedValue);
        if (selectedItem) {
            // Update the selected company in the store or state
            // This is a placeholder, replace with actual state management logic
            console.log('Selected Company:', selectedItem);
            setCompanyId(+selectedValue);
        }
    }

    const handleCreateAccount = () => {
        setCreateModalOpen(true)
    }

    const handleEditAccount = (id: number) => {
        setEditId(id)
        setEditModalOpen(true)
        fetchSpecificServerAccountData(id)
    }

    useEffect(() => {
        // Fetch the selected company data when the component mounts
        
            fetchSelectedCompanyData(companyId);
        
    }, [fetchSelectedCompanyData, companyId]);

    useEffect(() => {

        if(selectedCompany?.id) {
            fetchAllServerAccountsData(selectedCompany.id);
        }
    }, [fetchAllServerAccountsData, selectedCompany?.id]);

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

    
    const itemsPerPage = 5;
    const {serverAccountsPaginated, totalPages, totalFilteredCount} = useMemo(() => {
                const supplyFilteredData = serverAccountsData.filter((data) => {
                    return (
                        data.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        data.server_user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        data.server_password?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        data.status?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                })
                const totalPages = Math.ceil(supplyFilteredData.length / itemsPerPage)
                const serverAccountsPaginated = supplyFilteredData.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                )
                return {serverAccountsPaginated, totalPages, totalFilteredCount: supplyFilteredData.length}
        }, [ searchQuery, currentPage, itemsPerPage, serverAccountsData])
    const serverAccountRow = (data: ServerAccountsProps) => {
                return (
                    <>
                        <td className={`${Text} truncate`}>{highlightText(data.name || '', searchQuery)}</td>
                        <td className={`${Text} `}>{highlightText(data.department || '', searchQuery)}</td>
                        <td className={`${Text} `}>{highlightText(data.server_user || '', searchQuery)}</td>
                        <td className={`${Text} `}>{highlightText(data.status || '', searchQuery)}</td>
                        <td className={`${Text} `}>{highlightText(data.remarks || '', searchQuery)}</td>
                        <td className={` ${Text} `}>
                            <div className='flex flex-row gap-2 justify-center items-center'>
                                
                                <button onClick={() => handleEditAccount(data.id!)} aria-label="Deploy Supply" className=" bg-white border-2 text-white px-2 rounded  py-1 flex-colo">
                                    <span className='text-xs font-bold text-navbar'>Edit</span>
                                </button>
                            </div>
                        </td>
                    </>
                )
        }
  return (
    <>  
        <EditServerAccountsModal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} id={editId!} />
        <CreateServerAccountsModal modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} id={companyId} />
        <div className='bg-gray-200 min-h-screen container mx-auto p-5'>
            <div>
                <h1 className='text-2xl font-bold mb-5'>Server Accounts</h1>
                
                <div className='bg-white p-5 rounded shadow-md'>
                    <div className='w-72'>
                        <Select label='Select Company' selectedValue={companyId} navbar options={companyList} onChange={handleSelectChange} />
                    </div>
                    <hr />
                    
                        <div className='flex gap-3'>
                            <input type='text' onChange={() => {}} placeholder='Search....' className='font-medium p-2 placeholder:text-border w-full text-sm h-16 = rounded-md mt-3 border text-black' aria-label='Search' />
                            <button onClick={handleCreateAccount} className='bg-gray-400 transitions hover:bg-gray-300 text-black font-bold w-48 px-4 py-1 rounded mt-3'>
                                New Account
                            </button>
                        </div>
                        
                    <div className='mt-5'>
                        <div className='bg-white rounded shadow-md flex flex-col gap-2'>
                            <div className='p-2'>
                                {selectedCompany?.name}
                            </div>
                            <Table tableHead={tableHead} rowData={serverAccountsPaginated} rowRender={serverAccountRow}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ServerAccountsComponent