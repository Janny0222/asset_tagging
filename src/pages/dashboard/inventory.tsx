import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head';
import { Select } from '@/components/UserInput';
import { useCategoryStore } from '@/stores/categoryStore';
import { Option } from '@/lib/definition';
import InventoryComponents from '@/components/Inventory/InventoryComponents';
import Aos from 'aos';

const Index = () => {

const { categoryData, fetchCategoryData, selectedCategory, setSelectedCategory } = useCategoryStore();

    useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData])

    const categoryList: Option[] = categoryData.map((category) => ({
        value: category.id!,
        title: category.name!
    }))
    console.log("Category List: " ,selectedCategory)
    const handleCategoryChange = (value: number) => {
        const selected = categoryData.find(category => category.id === value!);
        
        Aos.refresh();
        if (selected) {
        setSelectedCategory(selected); // Set the selected category in the store
        
        }
        
    };
  return (
    <Layout>
        <Head>
            <title>GPC | Asset Equipment</title>
            <meta name="description" content="Company Asset Equipment" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <div className=' bg-white min-h-screen'>
            <div className='p-2 w-full border-b bg-navbar/80 border-black flex'>
                <div className='flex-btn gap-2 justify-evenly'>
                    <div>
                        <label className='text-white mx-auto'>Select Category</label>
                    </div>
                    <div>
                        <Select selectedValue={selectedCategory?.id || 'Please select'} options={categoryList} onChange={(e) => handleCategoryChange(+e.target.value)} />
                    </div>
                </div>
            </div>
            <div > 
              {selectedCategory && <InventoryComponents/> }
            </div>
        </div>
        
    </Layout>
  )
}

export default Index