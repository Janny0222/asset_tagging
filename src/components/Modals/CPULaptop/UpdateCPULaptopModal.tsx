import React, { ChangeEvent, FormEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import {  ChildrenModalProps, Option, ComputerInventoryProps } from '@/lib/definition'
import { Input, InputCost, InputDate, Select, TextArea } from '@/components/UserInput'
import { HiCheckCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { MonitorContext } from '@/context/MonitorContext'
import {  getSpecificComputerInventory, updateSpecificComputerInventory } from '@/services/ComputerInventory/computerService'
import { MdOutlineArchive } from 'react-icons/md'
import ArchiveSpecificComputerModal from './ArchiveSpecificComputerModal'
import { useMessage } from '@/context/MessageContext'
import { useStatusToggle } from '@/context/ToggleContext'
import { BiTransferAlt } from 'react-icons/bi'
import TransferComputerDataModal from './TransferComputerDataModal'
import { formatInTimeZone } from 'date-fns-tz'
import { ComputerInventoryContext } from '@/context/ComputerContext'
import { useCompanyStore } from '@/stores/companyStore'

const UpdateCPULaptopModal = ({modalOpen, setModalOpen, id, name, onSubmit} : ChildrenModalProps ) => {
  const {monitorList, selectedMonitor} = useContext(MonitorContext)
  const { status } = useStatusToggle()
  const { computerInventoryListRefresh } = useContext(ComputerInventoryContext)
  const {selectedCompany} = useCompanyStore();
  const [formData, setFormData] = useState<ComputerInventoryProps>({});
  const [error, setError] = useState<string>('');
  const [archived, setArchived] = useState<boolean>(false)
  const [transferData, setTransferData] = useState<boolean>(false)
  const [archivedId, setArchivedId] = useState<number>(0)
  const { message, setMessage } = useMessage()

  const formatToPesos = (value: string) => {
    const numberValue = parseFloat(value.replace(/,/g, '')); // Remove existing commas to parse the number
    if (isNaN(numberValue)) return '';
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(numberValue).replace('PHP', '₱'); // Use ₱ symbol instead of PHP
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    // Set the cleaned value for cost
    setFormData({ ...formData, [e.target.name]: e.target.value, table_name: selectedCompany?.id });
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^0-9.]/g, '');;
      setFormData((prevData) => ({
          ...prevData,
          cost: cleanedValue,
      }));
  
  }
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedCost = formatToPesos(value);
    setFormData({ ...formData, [name]: formattedCost });
  };

    const monitorOptions: Option[] = monitorList.map((port) => ({
        value: port.id!,
        title: port.brand!+ ' ' + port.serial_number!,
    })) 

    useEffect(() => {
      if(modalOpen && id) {
        const fetchComputerData = async () => {
          try {
            const response = await getSpecificComputerInventory(id);
            setFormData(response);
            console.log('response:', response)
          } catch (error) {
            setError('Error fetching data');
            console.error(error)
          }
        }
        fetchComputerData()
      }
    }, [modalOpen, id])

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        await updateSpecificComputerInventory(id!, formData);
        computerInventoryListRefresh()
        setModalOpen(false)
        setError('')
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(`Changing ${field} to ${value}`); // Log the change

    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
        table_name: selectedCompany?.id,
    }));
  };

  const handleCloseModal = () => {
    setModalOpen(false)
    setError('')
    setMessage('')
  }

  const handleArchiveSubmit = async (e: MouseEvent, id: number | undefined) => {
    e.preventDefault();
    console.log(id)
    setArchivedId(id!)
    setArchived(true);
  }

   const handleTransferSubmit = async (e: MouseEvent, id: number | undefined) => {
    e.preventDefault();
    setArchivedId(id!)
    setTransferData(true);
  }
  
  return (
    <>
    <TransferComputerDataModal modalOpen={transferData} setModalOpen={setTransferData} id={archivedId} onSubmit={onSubmit} />
    <ArchiveSpecificComputerModal modalOpen={archived} setModalOpen={setArchived} id={archivedId} onSubmit={onSubmit} />
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
    
        <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
            <div className='text-left flex flex-col gap-2'>
                  <h2 className='text-3xl  font-bold text-text'> Updating Data:</h2>
                  <span className='text-navbar/50 text-xs font-bold underline'>{formData.name}</span>
              </div>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
            <div className='col-span-4'>
              <Input name='name' label='Assigned To' disabled value={formData?.name || ''} navbar placeholder="Assigned To" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='department' label='Department' value={formData?.department || ''} navbar placeholder="Department" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Input name='computer_type' label='Computer Type' value={formData?.computer_type || ''} navbar placeholder="Computer Type" type="text" bg={false} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <InputCost name='cost' label='Cost' navbar value={formData?.cost || ''} placeholder="Cost" type="text" bg={false} onChange={handleCostChange} onBlur={handleBlur} />
            </div>
            <div className='col-span-2'>
              <Input name='supplier' label='Supplier' value={formData?.supplier || ''} navbar placeholder="Supplier" type="text" bg={false} onChange={handleChange} />
            </div>
            
            <div className='col-span-2'>
              <TextArea name='specs' label='Specs' navbar placeholder="Specs" value={formData?.specs || ''} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <TextArea name='pc_details' label='PC Details' navbar placeholder="PC Details" value={formData?.pc_details || ''} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <TextArea name='remote_details' label='Remote Details' navbar placeholder="Remote Details" value={formData?.remote_details || ''} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Select label='Monitor' navbar options={monitorOptions} name={'monitor'} selectedValue={formData.monitor || ''} onChange={handleSelectChange('monitor')} />
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Purchased' name='date_purchased' type='date' value={formData.date_purchased || ''} onChange={handleChange}/>
            </div>
            <div className='col-span-2'>
              <InputDate label='Date Installed' name='date_installed' type='date'  value={formData.date_installed || ''} onChange={handleChange}/>
            </div>
            <div className='col-span-2'>
            { status === 'active' ? (
              <>
                <button onClick={(e) => handleArchiveSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar text-sm gap-2 px-2 rounded py-1 flex-btn ">
                          <MdOutlineArchive className="text-navbar w-6 h-6" />Archive this Data
                </button>
                <span className='text-navbar'> </span>
              </>
              ) : (
                <>
                <button onClick={(e) => handleArchiveSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar text-sm gap-2 px-2 rounded py-1 flex-btn ">
                          <MdOutlineArchive className="text-navbar w-6 h-6" />Re-archived this Data
                </button>
                <span className='text-navbar'> </span>
              </>
              )
            }
            </div>
            <div className='col-span-2'>
              <button onClick={(e) => handleTransferSubmit(e, formData.id!)} aria-label="Archive item" className=" border-2 border-black text-navbar text-sm gap-2 px-2 rounded py-1 flex-btn ">
                          <BiTransferAlt className="text-navbar w-6 h-6" />Transfer this Data
                </button>
                <span className='text-navbar'> </span>
            </div>
            <div className='col-span-6'>
              <span className='text-green-600 font-bold italic'>{message}</span>
              <span className='text-red-600 font-bold italic'>{error}</span>
              
                <button type='submit' className='w-full flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-text hover:text-navbar text-white'>
                  <HiCheckCircle />  UPDATE
                </button>
            </div>
            <div className='absolute right-4 top-4'>
                  <button onClick={handleCloseModal} className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                      <IoClose />
                  </button>
            </div>
            <div className='flex flex-row gap-1 font-bold absolute text-xs text-gray-500/70 bottom-1 left-2 justify-end items-end text-right'>
                  <p className=' '>Last Update:</p>
                  <span className='  '>{formData.updatedAt && formatInTimeZone(new Date(formData.updatedAt), 'Asia/Manila', 'yyyy-MM-dd | HH:mm:ss')}
                  </span>
              </div>
            <div className='flex flex-row gap-1 font-bold absolute text-xs text-gray-500/70 bottom-1 right-2 justify-end items-end text-right'>
                  <p className=' '>Date Created:</p>
                  <span className='  '>{formData.createdAt?.slice(0, 10)}</span>
              </div>
            </form>
        </div>
    </MainModal>
    </>
  )
}

export default UpdateCPULaptopModal