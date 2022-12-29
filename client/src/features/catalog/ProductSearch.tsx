import { debounce, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { setProductParams } from './catalogSlice'

const ProductSearch = () => {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 2000)
    return (
        <div>
            <TextField
                label='Search Products'
                variant='outlined'
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
        </div>
    )
}

export default ProductSearch