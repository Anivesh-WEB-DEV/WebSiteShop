import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../redux/slice/api';
import './card.css'
import { addToCart } from '../redux/slice/cart';


export default function Cards() {
  const dispatch = useDispatch();
  const shopsData = useSelector((state) => state.shop.data);
  const isLoading = useSelector((state) => state.shop.isLoading);
  const  handleAddToCart=(e)=>{
    dispatch(addToCart(e))
   
  } 

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading......</h1>;
  }

  return (
    <div className='outer_card'>
    <div className='card_box'>
          {   
              shopsData && (
                  <div className='card_box'>
                      {shopsData.map((e)=>(
                  <Card key={e.id} sx={{ maxWidth: 345 }} className='card'>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={e.image}
                      alt="green iguana"
                      className='cardImages'
                    />
                    <CardContent className='card_content'>
                      <Typography gutterBottom variant="h5" component="div">
                      {(e.title.slice(0,18))}...
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className='card_discription'>
                       {(e.description.slice(0,53))}...
                      </Typography>
                      <h4 className='card_price'>
                      ${e.price}
                      <span className='card_rating'>Rating : {e.rating.rate}</span>
                      </h4>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={()=> handleAddToCart(e)}>
                      Add to Cart
                    </Button>
                    <span className='card_count'>Only {e.rating.count} pieces left</span>
                    
                  </CardActions>
                </Card>
                ))}
                  </div>
              )
              
          }



          </div>
  </div>
  );
}
