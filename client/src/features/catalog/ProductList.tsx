import React from 'react'
import { Product } from '../../app/models/Products';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';



interface props {
    products: Product[];
}

const ProductList = ({ products }: props) => {
    return (
        <>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={3} key={product.id}> 
                         <ProductCard  product={product}/>
                    </Grid>
                   
                ))}
            </Grid>
        </>
    )
}

export default ProductList