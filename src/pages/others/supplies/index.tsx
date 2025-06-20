import Layout from '@/components/Layout'
import SuppliesComponents from '@/components/Others/SuppliesComponents'
import Head from 'next/head'
import React from 'react'

const index = () => {
  return (
    <Layout>
        <Head>
        <title>IT Supplies</title>
        <meta name="description" content="IT Supplies" />
        </Head>
        <div className='bg-white min-h-screen p-1'>
            <div>
                <SuppliesComponents />
            </div>
        </div>
    </Layout>
  )
}

export default index