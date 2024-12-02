import ProfileComponents from '@/components/Users/ProfileComponents'
import Head from 'next/head'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { TiArrowBack} from 'react-icons/ti'

const Index = () => {
    const handleBack = () => {
        window.history.back()
    }
  return (
    <>
      <Head>
          <title>User Profile</title>
          <meta name="description" content="Profile" />
      </Head>
      <ProfileComponents />
    </>
  )
}

export default Index