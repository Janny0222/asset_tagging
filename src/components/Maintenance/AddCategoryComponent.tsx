import { CreateInventory } from '@/components/ui/buttons'
import Layout from '@/components/Layout'
import Table from '@/components/Table/Table'
import React, {  useEffect, useState } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { TableColumn } from '@/lib/definition'
import { useCategoryStore } from '@/stores/categoryStore'
import CreateCategoryModal from '@/components/Modals/Category/CreateCategoryModal'
import EditCategoryModal from '@/components/Modals/Category/EditCategoryModal'


const AddCategoryComponent = () => {
  const[modalOpen, setModalOpen] = useState(false)
  const{categoryData, categoryRefresh, fetchCategoryData} = useCategoryStore()
  const[selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const[editModalOpen, setEditModalOpen] = useState(false)
  const Text = 'text-sm text-center leading-4 whitespace-nowrap px-5 py-3';
  const handleClick = () => {
    setModalOpen(true)
  }
  useEffect(() => {
    fetchCategoryData()
  }, [fetchCategoryData])
  const handleEditButton = (id: any) => {
    setSelectedId(id)
    setEditModalOpen(true)
  }
  const tableHead: TableColumn[] = [
    {
        key: 'no',
        label: 'No'
    },
    {   
        key: 'category_name',
        label: 'Category Name'
    },
    { key: 'actions', label: 'Actions' },
  ]

  return (
    <Layout>
        {modalOpen && <CreateCategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} name= 'Company Name' onSubmit={categoryRefresh} /> }
        {editModalOpen && <EditCategoryModal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} onSubmit={categoryRefresh} id={selectedId} /> }
        {/* {archiveModalOpen && <ArchiveCompanyModal modalOpen={archiveModalOpen} setModalOpen={setArchiveModalOpen} onSubmit={companyRefresh} id={selectedId} /> } */}
        <div  
            data-aos="fade-up"  
            className='container mx-auto px-2'>
            <div className='bg-dry text-navbar p-5 mt-2 rounded-md'>
                <h1 className='uppercase font-semibold text-2xl'>LIST OF CATEGORY</h1>
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
            <Table tableHead={tableHead} rowData={categoryData} rowRender={(data, i) => (
              <>
                <td key={i} className={`${Text} truncate`}>{i + 1}</td>
                <td className={`${Text}`}>{data.name}</td>
                <td className={` ${Text} `}>
                  <div className='flex gap-2 justify-center items-center'>
                      <button onClick={() => handleEditButton(data?.id!)} aria-label="Edit item" className=" bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                              <FaEdit className="text-text" />
                      </button>
                      {/* <button onClick={() => handleDeleteData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                          <MdDelete className="text-red-500" />
                      </button> */}
                    </div>
                  </td>
              </>
            )}/>
        </div>
    </Layout>
  )
}

export default AddCategoryComponent