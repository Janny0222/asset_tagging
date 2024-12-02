import { CreateInventory } from '@/components/ui/buttons'
import Layout from '@/components/Layout'
import CreateCompanyModal from '@/components/Modals/Company/CreateCompanyModal'
import Table from '@/components/Table/Table'
import React, { useState } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { TableColumn } from '@/lib/definition'
import EditCompanyModal from '@/components/Modals/Company/EditCompanyModal'
import { useCompanyStore } from '@/stores/companyStore'


const AddCompanyComponent = () => {
  const[modalOpen, setModalOpen] = useState(false)
  const{companyData,  companyRefresh} = useCompanyStore()
  const[selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const[editModalOpen, setEditModalOpen] = useState(false)
  const Text = 'text-sm text-center leading-4 whitespace-nowrap px-5 py-3';
  const handleClick = () => {
    setModalOpen(true)
  }
  const handleEditButton = (id: number | undefined) => {
    setSelectedId(id)
    setEditModalOpen(true)
  }
  const tableHead: TableColumn[] = [
    {
        key: 'no',
        label: 'No'
    },
    {   
        key: 'coampany_name',
        label: 'Company Name'
    },
    {   
        key: 'table_name',
        label: 'Table Name'
    },
  ]

  return (
    <>
        {modalOpen && <CreateCompanyModal modalOpen={modalOpen} setModalOpen={setModalOpen} name= 'Company Name' onSubmit={companyRefresh} /> }
        {editModalOpen && <EditCompanyModal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} onSubmit={companyRefresh} id={selectedId} /> }
        <div  
            data-aos="fade-up"  
            className='container mx-auto px-2'>
            <div className='bg-dry text-navbar p-5 mt-2 rounded-md'>
                <h1 className='uppercase font-semibold text-2xl'>LIST OF COMPANY</h1>
                <div className='py-2 mt-5'>
                    <div className=' grid grid-cols-8 gap-10'>
                        <form className='sm:col-span-7 col-span-6 text-sm bg-white rounded flex gap-2'>
                            <button type='submit' className='bg-subMain w-12 flex-colo h-12 text-text py-2 rounded'>
                                <FaSearch />
                            </button>
                            <input type='text' placeholder='Search....'
                            className='font-medium placeholder:text-border w-11/12 text-sm h-12 border-none rounded-md text-black' />
                        </form>
                        <div className='col-span-2 sm:col-span-1'>
                            <CreateInventory onClick={handleClick} />
                        </div>
                    </div>
                </div>
                
            </div>
            <h3 className='text-xl font-medium my-6 text-text'> </h3>
            <Table tableHead={tableHead} rowData={companyData} rowRender={(data, i) => (
              <>
                <td key={i} className={`${Text} truncate`}>{i + 1}</td>
                <td className={`${Text}`}>{data.name}</td>
                <td className={`${Text}`}>{data.table_name}</td>
                <td className={`${Text} float-right flex-rows gap-2`}>
                <button onClick={() => handleEditButton(data.id)} aria-label="Edit item" className="border border-border bg-dry flex-rows gap-2 text-text rounded py-1 px-2">
                        Edit <FaEdit className="text-text" />
                    </button>
                <button aria-label="Delete item" className="bg-subMain text-red-500 px-2 rounded py-1 flex-colo w-6 h-6">
                    <MdDelete />
                </button>
                </td>
              </>
            )}/>
        </div>
    </>
  )
}

export default AddCompanyComponent