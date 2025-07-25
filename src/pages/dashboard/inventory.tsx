import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head';
import { SelectCategory } from '@/components/UserInput';
import { useCategoryStore } from '@/stores/categoryStore';
import { Option } from '@/lib/definition';
import InventoryComponents from '@/components/Inventory/InventoryComponent';
import Aos from 'aos';

const Index = () => {

  return (
    <Layout>
        <Head>
            <title>GPC | Asset Equipment</title>
            <meta name="description" content="Company Asset Equipment" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <div className=' bg-white min-h-screen'>
            
            <div > 
              <InventoryComponents/>
            </div>
        </div>
        
    </Layout>
  )
}

export default Index