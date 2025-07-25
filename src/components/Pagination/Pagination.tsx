import  Pagination  from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import React from 'react'


interface PaginationProps {  
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationComponent = ({count, page, onPageChange} : PaginationProps) => {
  return (
    <Stack spacing={2}>
      <Pagination 
        count={count} 
        variant="outlined" 
        shape="rounded"
        onChange={onPageChange}
        page={page}
        size="large"
        siblingCount={1}
        boundaryCount={1} 
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#011c13',
                color: 'white',
              },
              '&:hover': {
                fontColor: '#013021',
                color: 'black',
              },
            }}
          />
        )}
        />
    </Stack>
  );
}

export default PaginationComponent