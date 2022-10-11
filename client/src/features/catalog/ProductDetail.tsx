import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/Loading';
import { Product } from '../../app/models/Products';

const ProductDetail = () => {
  const { basket, setBasket } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setsubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id)

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(parseInt(id!))
      .then(response => setProduct(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item])

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(event?.target.value)
    }
  }

  function handleUpdateCart() {
    setsubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setsubmitting(false))
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .catch(error => console.log(error))
        .finally(() => setsubmitting(false));
    }
  }

  if (loading) return <LoadingComponent message='Loading product...' />

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h3' color='secondary'>Rs. {(product.price / 100).toFixed(2)} </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              type='number'
              label='Quantity in cart'
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={submitting}
              onClick={handleUpdateCart}
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              {item ? 'update quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductDetail

function removeItem(arg0: number, quantity: number): any {
  throw new Error('Function not implemented.');
}
