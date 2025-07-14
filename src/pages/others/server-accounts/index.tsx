import Layout from '@/components/Layout'
import ServerAccountsComponent from '@/components/Others/ServerAccountsComponent'
import Head from 'next/head'
import React from 'react'

const index = () => {
  return (
    <Layout>
        <Head>
        <title>Server Accounts</title>
        <meta name="List of Server Accounts" content="Server Accounts" />
        </Head>
        <div className='bg-white min-h-screen p-1'>
            <div>
                <ServerAccountsComponent />
            </div>
        </div>
    </Layout>
  )
}

export default index