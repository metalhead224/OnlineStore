import React from 'react'
import { Product } from '../../app/models/Products';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductSkeleton';



interface props {
    products: Product[];
}

const ProductList = ({ products }: props) => {

    const { productsLoaded } = useAppSelector(state => state.catalog)

    return (
        <>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={4} key={product.id}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton />
                        ) : (<ProductCard product={product} />)}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductList