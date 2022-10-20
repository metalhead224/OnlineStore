import { Product } from '../../app/models/Products';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

interface props {
    product: Product;
}

const ProductCard = ({ product }: props) => {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();


    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: { fontWeight: 'bold', color: 'primary.main', backgroundColor: '' }
                    }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                    image={product.pictureUrl}
                />
                <CardContent>
                    <Typography gutterBottom color="secondary" variant="h5">
                       {currencyFormat(product.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={status.includes('pendingAddItem' + product.id)}
                        onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                        size="small">Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard