import Layout from '@/components/Layout'
import AssetDisposalComponent from '@/components/Others/AssetDisposalComponent'
import Head from 'next/head'
import React from 'react'

const index = () => {
  return (
    <Layout>
            <Head>
            <title>Asset Disposal</title>
            <meta name="List of Asset Disposal" content="Asset Disposal" />
            </Head>
            <div className='bg-white min-h-screen p-1'>
                <div>
                    <AssetDisposalComponent />
                </div>
            </div>
        </Layout>
  )
}

export default index