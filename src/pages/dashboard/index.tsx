import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { lato } from '@/styles/font';
import Head from 'next/head';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useCompanyStore } from '@/stores/companyStore';
import { useAssetInventoryStore } from '@/stores/assetInventoryStore';
import { useCategoryStore } from '@/stores/categoryStore';
import DashboardComponent from '@/components/Dashboard/DashboardComponent';

export default function Page() {
  const { companyData } = useCompanyStore()
  const { assetInventoryData, fetchAllAssetInventoryData } = useAssetInventoryStore()
  const { categoryData, fetchCategoryData } = useCategoryStore()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
    fetchAllAssetInventoryData();
  }, [fetchCategoryData, fetchAllAssetInventoryData]);
  useEffect(() => {
    Aos.init({
      duration: 800,
      // easing: 'ease-in-out',
      once: false, // Allows repeat animations   // whether animation should happen only once
    });
  }, []);
  const cleanCost = (value: string | number) => typeof value === 'string' ? parseFloat(value.replace(/[₱,]/g, '')) : Number(value);
  return (
    <Layout>
      
      <Head>
            <title>GPC | Dashboard</title>
            <meta name="description" content="Summary of the inventory" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
      <DashboardComponent />
      
    </Layout>
  );
}
