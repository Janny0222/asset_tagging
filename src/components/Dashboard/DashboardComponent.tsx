import { useAssetInventoryStore } from '@/stores/assetInventoryStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useCompanyStore } from '@/stores/companyStore'
import React, { useEffect, useState } from 'react'
import { lato } from '@/styles/font';
import Aos from 'aos';
const DashboardComponent = () => {
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
    <div className='p-1 border rounded shadow-2xl relative min-h-screen  bg-white'>
            <div className="p-3 rounded-t-md bg-navbar mb-1">
              <h1 className={`${lato.className} text-xl md:text-xl text-white sm:text-left`}>Summary</h1>
              </div>
              <div className='container mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3'>
                {companyData.map((company, index) => (
                  <div key={index} className='col-span-1 lg:col-span-2 border-2 border-black rounded' data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-offset="100">
                    <div>
                      <h1 className='text-center border-b-2 font-bold text-green-800 border-black py-4'>
                        {company.name}
                      </h1>
                      <table style={{ width: '100%' }} className='table-auto'>
                        <thead className='border-b-2 border-grassy-500'>
                          <tr role='row' className=' border-x-2 border-b-2' key={index}>
                            <th className='text-left border-x-2 p-2'>Asset Category</th>
                            <th className='text-left border-x-2 p-2'>Total Assets</th>
                            <th className='text-left border-x-2 p-2'>Total Costs</th>
                            <th className='text-left border-x-2 p-2'>New Unit</th>
                          </tr>
                          
                        </thead>
                        <tbody>
                        {categoryData.map((category, index) => {
                          const totalAssets = assetInventoryData.filter(
                            (asset) => asset.company_id === company.id && asset.category_id === category.id
                          ).length;
                          const totalCost = assetInventoryData
                            .filter((asset) => asset.company_id === company.id && asset.category_id === category.id)
                            .reduce((total, asset) => total + cleanCost(asset.cost!), 0);
                            const formattedTotalCost = totalCost.toLocaleString();
                          return (
                            <tr role='row' className='border-b-2 ' key={index}>
                              <td className='border-x-2 p-2'>{category.name}</td>
                              <td className='border-x-2 p-2'>{totalAssets}</td>
                              <td className='border-x-2 p-2'>₱ {formattedTotalCost}</td>
                            </tr>
                          );
                        })}
                        </tbody>
                        <tfoot>
                          <tr className='border-b-2'>
                            <td className='border-x-2 p-2 font-bold'>Total</td>
                            <td className='border-x-2 p-2 font-bold'>
                              {categoryData.reduce((total, category) => {
                                const totalAssets = assetInventoryData.filter(
                                  (asset) => asset.company_id === company.id && asset.category_id === category.id
                                ).length;
                                return total + totalAssets;
                              }, 0)}
                            </td>
                            <td className='border-x-2 p-2 font-bold'>
                              ₱ {assetInventoryData
                                .filter((asset) => asset.company_id === company.id)
                                .reduce((total, asset) => total + cleanCost(asset.cost!), 0)
                                .toLocaleString()}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
          </div>
  )
}

export default DashboardComponent