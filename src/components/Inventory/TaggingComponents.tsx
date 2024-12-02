import Layout from "@/components/Layout";
import { Input, TextArea } from "@/components/UserInput";
import {  TaggingProps } from "@/lib/definition";
import { getSpecificTagging } from "@/services/Tagging/taggingService";
import { useAssetInventoryStore } from "@/stores/assetInventoryStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useCompanyStore } from "@/stores/companyStore";
import { useTaggingStore } from "@/stores/taggingStore";
import {  FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStatusStore } from "@/stores/statusStore";
import ReprintTaggingModal from "../Modals/Tagging/ReprintTaggingModal";


const TaggingComponents = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [submitted, setSubmitted] = useState(false) 
  const { companyData } = useCompanyStore()
  const { fetchSpecificStatusData, selectedStatus } = useStatusStore()
  const { selectedAssetInventory, fetchSpecificAssetInventoryData} = useAssetInventoryStore()
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { selectedTagging, fetchSpecificTaggingDatas, fetchTaggingSuggestions, suggestions} = useTaggingStore()
  const { fetchCategoryData, categoryData } = useCategoryStore()
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reprintModal, setReprintModal] = useState(false);
  const [showMore, setShowMore] = useState(false);


  useEffect(() => {
    if(inputValue.length > 0 && submitted) {
      fetchSpecificTaggingDatas(inputValue)
    }
  }, [inputValue, submitted,fetchSpecificStatusData, fetchSpecificTaggingDatas])

  useEffect(() => {
    if (submitted && inputValue !== '') {
      
      fetchSpecificAssetInventoryData(selectedTagging?.asset_id!)
      fetchSpecificStatusData(selectedAssetInventory?.is_active!)
      fetchCategoryData()
      const fetchComputerTagging = async () => {
        try {
          const response: TaggingProps = await getSpecificTagging(inputValue)
          // setSelectedTagging(response[0])
          
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            setFetchError(error.message);
          } else {
            setFetchError('An error occurred while fetching the data.');
          }
        }
      }
      fetchComputerTagging()
      
    }
  }, [inputValue,selectedAssetInventory?.is_active, submitted, fetchSpecificAssetInventoryData, selectedTagging?.asset_id!, fetchCategoryData])
  
  console.log('Selected Status: ', selectedStatus?.name)
  console.log('Selected Asset: ', selectedAssetInventory)
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSubmitted(true)
      setSearchQuery(inputValue)
      setDropdownVisible(false)
  }
  const handleSuggestionClick = (tagging: TaggingProps) => {
    setInputValue(tagging.tagging!); // Set input to selected suggestion
    setDropdownVisible(false); // Hide dropdown after selection
    fetchSpecificTaggingDatas(tagging.tagging!); // Fetch detailed data based on the selected tagging
    setSubmitted(true);
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      setInputValue(value)
      setSubmitted(false)
      setFetchError(null)
      if(value.length > 0) {
        fetchTaggingSuggestions(value)
        setDropdownVisible(true)
      } else {
        setDropdownVisible(false)
        
      }
  }
  
  const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowMore(!showMore)
  }
 
  const handleReprint = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReprintModal(true)
  }

  

 return (
    <>
    <ReprintTaggingModal modalOpen={reprintModal} setModalOpen={setReprintModal} name={selectedTagging?.tagging} />
    <div className='bg-gray-200 min-h-full container mx-auto'>
        <div 
            className='pt-5 min-h-screen bg-gray-200 px-5 '>
            <div className='bg-navbar text-black p-5 rounded-md'>
                <h1 className='text-2xl font-medium text-white'> ASSET TAGGING </h1>
                {/* <h1 className='uppercase font-semibold'>{selectedCompany?.name}</h1> */}
                <div className='py-2 mt-5'>
                    <div className=' grid grid-cols-8 sm:gap-10 gap-'>
                        <form onSubmit={handleSearchSubmit} className='sm:col-span-7 col-span-6 text-sm bg-white border rounded flex gap-2'>
                            <div className='bg-subMain w-12 flex-colo h-12 text-text py-2 rounded'>
                                <button type="submit"><FaSearch /> </button> 
                            </div>
                            <input type='text' onChange={handleInputChange} value={inputValue} placeholder='Search by Control No.'
                            className='font-medium placeholder:text-border w-11/12 text-sm h-12 border-none rounded-md text-black' aria-label='Search Computer' />
                            {dropdownVisible && suggestions?.length > 0 && (
                              <ul className="absolute bg-white border rounded-md shadow-lg z-10 w-auto mt-12 ml-12">
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    >
                                      {suggestion.tagging}
                                    </li>
                                ))}
                              </ul>
                            )}
                        </form>
                    </div>
                </div>
        
            </div>
            
            <div className="container w-auto my-2 bg-navbar rounded-md text-white p-5">
              <h1> Tagging Details</h1>
              { inputValue === selectedTagging?.tagging ? (
                <form className="border border-md rounded-md grid gap-2 grid-cols-6 p-5">
                  <div className="col-span-1 p-1">
                    <Input label="Control Number" placeholder={selectedTagging?.tagging || ''} disabled bg name="tagging" onChange={() => {}} value={selectedTagging?.tagging || ''} type="text" />
                  </div>
                  <div className="col-span-3"></div>
                  <div className="col-span-2 flex justify-center items-center">
                    <span>Status: <em className={`${selectedStatus?.name === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{ selectedStatus?.name}</em></span>
                  </div>
                  <div className="col-span-2 p-1">
                    <Input label="Asset Type" value={categoryData.find((data) => data.id === selectedTagging?.id)?.name || ''} bg />
                  </div>
                  <div className="col-span-2 p-1">
                    <Input type="text" disabled name="table_id" onChange={() => {}} label="Company" value={companyData.find((data) => data.id === selectedTagging?.table_id)?.name || ''} bg />
                  </div>
                  <div className={`col-span-2 p-1 `}>
                    <Input label="Assigned To" disabled onChange={() => {}} value={selectedAssetInventory?.person_in_charge! || ''} bg  />
                  </div>
                  <div className="col-span-2 p-1">
                    <Input label="Invoice Number" disabled onChange={() => {}} value={selectedAssetInventory?.invoice_number! || ''} bg />
                  </div>
                  <div className={`col-span-2 p-1 text-white `}>
                    <Input label="Invoice Date" disabled onChange={() => {}} value={selectedAssetInventory?.invoice_date! || ''} bg  />
                  </div>
                  <div className={`col-span-2 p-1 `}>
                    <Input label="Cost" disabled onChange={() => {}} value={selectedAssetInventory?.cost! || 'Cost not set'} bg  />
                  </div>
                  {showMore && 
                  <>
                    <div className="col-span-2 p-1">
                      <TextArea label="Asset Information" disabled onChange={() => {}} value={selectedAssetInventory?.asset_info! || ''} rows={2} name="asset_info" />
                    </div>
                    <div className="col-span-2 p-1">
                      <TextArea label="Specification" disabled onChange={() => {}} value={selectedAssetInventory?.specs! || ''} rows={2} name="specs" />
                    </div>
                    <div className="col-span-2 p-1">
                      <TextArea label="Remarks" disabled onChange={() => {}} value={selectedAssetInventory?.remarks! || ''} rows={2} name="remarks" />
                    </div>
                    <div className="col-span-3 flex flex-row gap-2 text-center">
                      
                        <form onClick={handleReprint} className="border w-full border-black rounded p-2 bg-green-500 text-black">
                          <button type="submit">Re-print Tagging</button>
                        </form>
                        <div className="border w-full border-black rounded p-2 bg-blue-300 text-black">
                          <button>Export Data</button>
                        </div>
                      
                    </div>
                  </>
                  }
                  <div className="col-span-4"></div>
                  <div className="col-span-2 flex-col flex items-end justify-end w-auto">
                    <button onClick={handleShowMore} className={``}><span> {showMore ? `See Less <<<`  : `See More >>>` }</span></button>
                  </div>
                  
                </form>
              ): (
                
                <div className="text-red-500 flex items-center justify-center">{fetchError}</div>
              )}
            </div>
            
        </div>
    </div>
  </>   
  )
}
export default TaggingComponents