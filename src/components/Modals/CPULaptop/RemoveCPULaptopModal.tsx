import React, { FormEvent, useContext, useEffect } from 'react'
import MainModal from '../MainModal';
import { CgCheck, CgClose } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { ComputerInventoryContext } from '@/context/ComputerContext';
import { deleteComputerInventory, getSpecificComputerInventory } from '@/services/ComputerInventory/computerService';
import { ChildrenModalProps } from '@/lib/definition';
import { CompanyContext } from '@/context/CompanyContext';

const RemoveCPULaptopModal = ({modalOpen, setModalOpen, id, onSubmit} : ChildrenModalProps) => {
    const {selectedComputer, setSelectedComputer, computerInventoryListRefresh} = useContext(ComputerInventoryContext)
    const { selectedCompany } = useContext(CompanyContext);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
          await deleteComputerInventory(id);
          computerInventoryListRefresh()
          setModalOpen(false)
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        if(modalOpen && id) {
            const fetchSpecificComputer = async () => {
                try {
                  const response = await getSpecificComputerInventory(id);
                  setSelectedComputer(response);
                } catch (error) {
                  console.log(error);
                }
              }
            fetchSpecificComputer()
        }
    }, [modalOpen, id, setSelectedComputer])
    return (
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <div className='inline-block transitions inset-0 sm:w-4/5 border border-border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-main text-white'>
              <h2 className='text-2xl font-bold text-text'> ARE YOU SURE YOU WANT TO REMOVE THE DATA OF? </h2>
              <p className='text-lg text-text'>"{selectedComputer?.name}"</p>
              <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-6 text-left mt-6'>
              <button type='submit' className='w-full col-span-2 flex-rows gap-2 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'> 
                  <CgCheck /> <span className='hidden sm:block'>YES</span> 
              </button>
              <button type='button' onClick={() => setModalOpen(false)} className='w-full col-span-2 flex-rows gap-2 py-3 text-lg transitions border-2 border-subMain hover:bg-dry rounded bg-subMain text-white'>
                  <CgClose />  <span className='hidden sm:block'>NO</span> 
              </button>
              <div className='absolute right-4 top-4'>
                      <button onClick={() => setModalOpen(false)} type='button' className='items-center w-9 h-9 flex-colo text-xl transitions  font-extrabold text-white bg-subMain border border-border rounded-full hover:bg-dry'>
                          <IoClose />
                      </button>
              </div>
              </form>
          </div>
      </MainModal>
    )
  }

export default RemoveCPULaptopModal