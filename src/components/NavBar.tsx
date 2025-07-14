
import React, { Fragment,  useEffect, useState } from 'react'
import { Listbox, Menu, Transition } from '@headlessui/react'
import { FaAngleDown, FaCheck, FaChevronDown,  FaChevronRight, FaUser } from 'react-icons/fa';
import  Link  from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCompanyStore } from '@/stores/companyStore';
import { usePathname } from 'next/navigation';

const NavBar = () => {
    // const { tableData, selectedCompany, setSelectedCompany } = useContext(CompanyContext);
    const {data: session} = useSession()
    const [openMaintenance, setOpenMaintenance] = useState(false)
    const [openOthers, setOpenOthers] = useState(false)
    // const [openInventory, setOpenInventory] = useState(false)
    const {fetchCompanyData, selectedCompany, companyData, setSelectedCompany } = useCompanyStore()

    const pathname = usePathname()

    const toggleMaintenance = () => setOpenMaintenance(!openMaintenance)
    const toggleOthers = () => setOpenOthers(!openOthers)

    // const toggleInventory = () => setOpenInventory(!openInventory)

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' })
    }
    // useEffect(() => {
    //     if (companyList && companyList.length > 0) {
    //             setSelectedCompany(companyList[0]);
    //     }
    // }, [companyList, setSelectedCompany]);
    useEffect(() => {
        
        fetchCompanyData()
    }, [fetchCompanyData])
    useEffect(() => {
        if(companyData.length > 0) {
            setSelectedCompany(companyData[0])
        }
    }, [companyData, setSelectedCompany])

  return (
    <>
    <div className='bg-navbar container sticky z-50 min-w-full py-2'>
        <div className=' w-full gap-4 flex justify-end items-center p-3'>
            <div className=' mx-auto md:flex hidden absolute left-4 top-2 gap-2'>
                <div className=''>
                    <Image src="/logo/greenstone-logo.png" className='' width={42} height={42} alt="logo" />
                </div>
                <div className=' flex-colo  text-white space-x-1'> 
                    <h1 className=' text-xl  tracking-widest  font-bold'> 
                        GREENSTONE 
                    </h1>
                    <span className='text-xs font-bold bg-white/70 rounded text-navbar px-1'> COMPANY EQUIPMENT</span>
                </div>
                <div className='border border-l-2'></div>
            </div>
            
            
            {session && (pathname.startsWith('/dashboard/') || pathname.startsWith('/maintenance/')) && (
            <Listbox  value={selectedCompany} onChange={setSelectedCompany}>
            <div className=''>
                <Listbox.Button className='text-white flex gap-2 text-sm hover:bg-hover p-2 rounded-md relative'>
                <span className='uppercase font-bold'>Select Company :</span>
                <span className="flex truncate">{selectedCompany ? selectedCompany.code?.toUpperCase() : "Select Company"}
                    
                    <FaAngleDown className="w-5 h-5 " aria-hidden="true" />
                </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 bg-white border border-gray-800 text-black rounded-md shadow-lg-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {companyData?.map((option, i) => (
                            <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                `relative cursor-default hover:text-white select-none py-2 pl-10 pr-4 ${active ? "bg-subMain text-black" : "text-black"}`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                <>
                                    <span
                                    className={`block truncated ${selected ? "font-semibold " : "font-normal"}`}
                                    >
                                    {option.name}
                                    </span>
                                    {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FaCheck className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    ) : null}
                                </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
            </Listbox>
           )}
            {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full rounded-md  px-2 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 ">
                        <span> IT Equipment </span>
                        <FaAngleDown className=' h-5 w-5  ' aria-hidden="true"/>
                    </Menu.Button>
                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <Link href="/inventory" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 gap-2 py-2 text-sm">
                                <span className=''> <MdComputer className='h-5 w-5' /> </span> Computer and Laptops
                             </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/cellphone" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 gap-2 py-2 text-sm">
                                <span className=''> <FaMobileAlt className='h-5 w-5' /> </span> Cellphone
                             </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/monitor" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 gap-2 py-2 text-sm">
                                <span className=''> <FiMonitor className='h-5 w-5' /> </span> Monitor
                             </Link>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                    </Transition>
                </div>
            </Menu> */}
            <Menu as="div" className="inline-block relative text-left">
                <div>
                    <Menu.Button className="inline-flex w-full rounded-md  px-2 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 ">
                        <FaUser className={`h-5 w-5`} 
                        aria-hidden="true"/>
                        <FaAngleDown
                        className=" h-5 w-5  "
                        aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            <Link href={`${session ? '/profile' : '/login'}`} className={`hover:bg-navbar hover:text-white text-gray-800 group w-full flex px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                {session ? 'Profile' : 'Login'}  
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href={`/change-password`} className={`hover:bg-navbar hover:text-white text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                Change Password 
                            </Link>
                        </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                        <Menu.Item>
                            <Link href={`/dashboard`} className={`hover:bg-navbar hover:text-white text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href={`/dashboard/inventory`} className={`hover:bg-navbar hover:text-white text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                    Assets
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href="/dashboard/asset-tagging" className={`hover:bg-navbar hover:text-white text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                    Asset Tagging
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <>
                            <button onClick={toggleOthers} className='flex  justify-start gap-2 items-center w-full text-left text-gray-800  rounded-md'>
                                <Link href={'#'} className={`  text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                    Others
                                </Link>
                                <span className="ml-auto ">
                                        {openOthers ? <FaChevronDown /> : <FaChevronRight />}
                                </span>
                            </button>
                            {openOthers && (
                                <div className={`w-full p-2 bg-gray-100 transitions text-black`}>
                                    <Link href="/others/supplies" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 py-2 text-sm">
                                        IT Supplies
                                    </Link>
                                    <Link href="/others/server-accounts" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 py-2 text-sm">
                                        Server Accounts
                                    </Link>
                                    {/* <Link href="/maintenance/inventory-type" className="hover:font-bold over:font-bold hover:border-b-2 border-dry group w-full flex px-2 py-2 text-sm">
                                        Add Inventory Type
                                    </Link> */}
                                   {/* <Link href="/maintenance/category" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 py-2 text-sm">
                                        Category List
                                    </Link> */}
                                </div>
                            )}
                            </>
                        </Menu.Item>
                        <Menu.Item>
                            <>
                            <button onClick={toggleMaintenance} className='flex justify-start gap-2 items-center w-full text-left text-gray-800  rounded-md'>
                                <Link href={'#'} className={`  text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                    Maintenance
                                </Link>
                                <span className="ml-auto">
                                        {openMaintenance ? <FaChevronDown /> : <FaChevronRight />}
                                </span>
                            </button>
                            {openMaintenance && (
                                <div className={`w-full p-2 bg-gray-100 text-black`}>
                                    <Link href="/maintenance/company" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 py-2 text-sm">
                                        Company List
                                    </Link>
                                    {/* <Link href="/maintenance/inventory-type" className="hover:font-bold over:font-bold hover:border-b-2 border-dry group w-full flex px-2 py-2 text-sm">
                                        Add Inventory Type
                                    </Link> */}
                                   <Link href="/maintenance/category" className="hover:font-bold hover:border-b-2 border-dry  group w-full flex px-2 py-2 text-sm">
                                        Category List
                                    </Link>
                                </div>
                            )}
                            </>
                        </Menu.Item>
                    </div>
                    
                    <div className='px-1 py-1'>
                        <Menu.Item>
                            <button onClick={handleLogout} className={`hover:bg-dry text-gray-800 group w-full ${!session?.user ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                    Logout
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
                </Transition>
            </Menu>
        </div>
    </div>
    </>
  )
}

export default NavBar