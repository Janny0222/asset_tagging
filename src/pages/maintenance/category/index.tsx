import React from 'react'
import AddCategoryComponent from '@/components/Maintenance/AddCategoryComponent'
import Head from 'next/head'


const Index = () => {

  return (
    <>
      <Head>
        <title>Category Maintenance</title>
        <meta name="description" content="Category Maintenance" />
      </Head>
      <div className='bg-white min-h-screen p-1'>
        <div>
          <AddCategoryComponent />
        </div>
      </div>
        
    </>
  )
}

export default Index