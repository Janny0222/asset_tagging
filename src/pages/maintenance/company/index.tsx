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
        <AddCompanyComponent />
    </Layout>
  )
}

export default Index