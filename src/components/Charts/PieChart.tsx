import * as React from 'react'
import { useCategoryStore } from '@/stores/categoryStore';
import { useAssetInventoryStore } from '@/stores/assetInventoryStore';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useCompanyStore } from '@/stores/companyStore';


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));


function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}


export default function PieChartComponent() {
  const { categoryData, fetchCategoryData} = useCategoryStore();
  const { companyData, fetchCompanyData } = useCompanyStore();
  const { assetInventoryData, fetchAllAssetInventoryData } = useAssetInventoryStore();
  React.useEffect(() => {
    fetchCategoryData();
    fetchAllAssetInventoryData()
    fetchCompanyData()
  }, [fetchCategoryData, fetchAllAssetInventoryData, fetchCompanyData])

 
  

  console.log(companyData.map((company) => company.code))

  const assetCountByCategory = React.useMemo(() => {
    return categoryData.map((category) => {
      const totalData = companyData.reduce((count, company) => {
        const assetData = assetInventoryData.filter(
          (asset) => asset.company_id === company.id && asset.category_id === category.id
        ).length;
        return count + assetData;
      }, 0);
      return totalData;
    });
  }, [categoryData, companyData, assetInventoryData]);

  const data = categoryData.map((category, index) => ({
    value: assetCountByCategory[index],
    label: category.name
  }))
  
  const size = {
    width: 450,
    height: 200,
  };
  

  return (
    <div className='flex gap-2 flex-wrap'>
      {companyData.map((company) => {
        const assetCountByCategory = categoryData.map((category) => {
          return assetInventoryData.filter(
            (asset) => asset.category_id === category.id && asset.company_id === company.id
          ).length;
        });

        const data = categoryData.map((category, index) => ({
          value: assetCountByCategory[index],
          label: category.name,
        }));

        const size = {
          width: 550,
          height: 250,
        };
        const totalAssets = data.reduce((sum, item) => sum + item.value, 0);
        return (
          <div key={company.id} className=''>
            {totalAssets > 0 ? (
              <>
              <h3>{company.name}</h3>
              <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
                <PieCenterLabel>
                  {company.code?.toUpperCase()}
                </PieCenterLabel>
            </PieChart>
            </>
            ) : (
              null
              
            )}
          </div>
        );
      })}
    </div>
  );
}
