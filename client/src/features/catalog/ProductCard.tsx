import React from 'react'
import { Product } from '../../app/models/Products';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface props {
    product: Product;
}

const ProductCard = ({ product }: props) => {
    return (
        <>
            <Card>
                <CardHeader 
                    avatar={
                        <Avatar sx={{backgroundColor: 'secondary.main'}}>
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx:{fontWeight: 'bold', color: 'primary.main', backgroundColor: ''}
                    }}
                />
                <CardMedia
                    sx={{height:140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                    image={product.pictureUrl}
                />
                <CardContent>
                    <Typography gutterBottom color="secondary" variant="h5">
                        Rs.{(product.price / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to cart</Button>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard