import { useCompanyStore } from '@/stores/companyStore';
import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import { Select } from '../UserInput';
import { Option } from '@/lib/definition';
import PaginationComponent from '../Pagination/Pagination';


const tableHead = [
  { key: 'asset_type', label: 'Asset Type' },
  { key: 'brand', label: 'Brand' },
  { key: 'serial_number', label: 'Serial Number' },
  { key: 'status', label: 'Status' },
  { key: 'remarks', label: 'Remarks' },
  { key: 'actions', label: 'Actions' },
]

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-5 py-3';
const AssetDisposalComponent = () => {
  const { companyData, selectedCompany, fetchSelectedCompanyData } = useCompanyStore()
  const [companyId, setCompanyId] = React.useState<number>(selectedCompany?.id! || 1);
  const [currentPage, setCurrentPage] = useState(1)
  const companyList: Option[] = companyData.map((company) => ({
      value: company.id!,
      title: company.name!
  }))

  useEffect(() => {
      // Fetch the selected company data when the component mounts
      
          fetchSelectedCompanyData(companyId);
      
  }, [fetchSelectedCompanyData, companyId]);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      const selectedItem = companyData.find(item => item.id === +selectedValue);
      setCurrentPage(1)
      if (selectedItem) {
          // Update the selected company in the store or state
          // This is a placeholder, replace with actual state management logic
          console.log('Selected Company:', selectedItem);
          setCompanyId(+selectedValue);
          
      }
  }

  const handleCreateAccount = () => {
    // Logic to create a new account
    console.log('Create New Account');
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setCurrentPage(1);
    // Implement search logic here
    console.log('Search Term:', searchTerm);
  }
  return (
    <div className='bg-gray-100 min-h-screen container mx-auto p-5'>
        <div>
            <h1 className='text-2xl font-bold mb-5'>Asset Disposal</h1>
            <span> {selectedCompany?.name} </span>
            <div className='bg-white p-5 rounded shadow-md'>
                <div className='w-72'>
                    <Select label='Select Company' selectedValue={companyId} navbar options={companyList} onChange={handleSelectChange} />
                </div>
                <hr />
                
                    <div className='flex gap-3'>
                        <input type='text' onChange={handleSearch} placeholder='Search....' className='font-medium p-2 placeholder:text-border w-full text-sm h-16 = rounded-md mt-3 border text-black' aria-label='Search' />
                        <button onClick={handleCreateAccount} className='bg-gray-400 transitions hover:bg-gray-300 text-black font-bold w-48 px-4 py-1 rounded mt-3'>
                            New Account
                        </button>
                    </div>
                    
                <div className='mt-5'>
                    <div className='bg-white rounded shadow-md flex flex-col gap-2'>
                        <div className='p-2'>
                            {selectedCompany?.name}
                        </div>
                        {serverAccountsPaginated.length > 0 ? (
                        <>
                            <Table tableHead={tableHead} rowData={serverAccountsPaginated} rowRender={serverAccountRow}  />
                            <div className='flex justify-center items-center my-4'>
                                <PaginationComponent count={totalPages} page={currentPage} onPageChange={(_, value) => handlePageChange(value)} />
                            </div>
                            {/* <div className="relative right-auto flex my-4">
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
                            </div> */}
                        </>
                        ) :  (
                            <div className='flex flex-colo text-navbar '>
                                <span>No Data Found</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AssetDisposalComponent