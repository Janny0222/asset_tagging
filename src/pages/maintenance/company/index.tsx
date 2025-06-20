import Layout from '@/components/Layout'
import React from 'react'
import AddCompanyComponent from '@/components/Maintenance/AddCompanyComponent'
import Head from 'next/head'


const Index = () => {

  return (
    <Layout>
      <Head>
        <title>Company Maintenance</title>
        <meta name="description" content="Company Maintenance" />
      </Head>
        <div className='bg-white min-h-screen p-1'>
        <div>
          <AddCompanyComponent />
        </div>
      </div>
    </Layout>
  )
}

export default Index