import { Box, Typography, Pagination } from '@mui/material'
import React from 'react'
import { MetaData } from '../models/Pagination';

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

const AppPagination = ({metaData, onPageChange}: Props) => {

    const {currentPage, totalPages, totalCount, pageSize} = metaData;

  return (
    <div>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying {(currentPage - 1)*pageSize + 1}-
            {currentPage*pageSize > totalCount 
            ? totalCount 
            : currentPage*pageSize} of {totalCount} items
          </Typography>
          <Pagination
            color='secondary'
            size='large'
            count={metaData?.totalPages}
            page={metaData?.currentPage}
            onChange={(e, page) => onPageChange(page)}
          />
        </Box>
    </div>
  )
}

export default AppPagination