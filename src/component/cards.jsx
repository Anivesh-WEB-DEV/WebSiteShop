// import React, { useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions} from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchShops } from '../redux/slice/api';
// import './card.css'
// import { addToCart } from '../redux/slice/cart';
// import NotFound from './NotFound';;
// export default function Cards() {
//   const dispatch = useDispatch();
//   const shopsData = useSelector((state) => state.shop.data);
//   const isLoading = useSelector((state) => state.shop.isLoading);
//   const isError = useSelector ((state) => state.shop.isError)
//   const  handleAddToCart=(e)=>{
//     dispatch(addToCart(e))
   
//   } 

//   useEffect(() => {
//     dispatch(fetchShops());
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className='outer_card'>
//         <div className='card_box'>
//           {[1, 2, 3].map((placeholder, index) => (
//             <Card key={index} sx={{ maxWidth: 345 }} className='card'>
//               {/* Your loading skeleton content goes here */}
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   Loading...
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Loading...
//                 </Typography>
//                 <h4>Loading...</h4>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }
//   if (isError) {
//     return  <NotFound/>
   
//   }

//   return (
//     <div className='outer_card'>
//     <div className='card_box'>
//           {   
//               shopsData && (
//                   <div className='card_box'>
//                       {shopsData.map((e)=>(
//                   <Card key={e.id} sx={{ maxWidth: 345 }} className='card'>
//                   <CardActionArea>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={e.image}
//                       alt="green iguana"
//                       className='cardImages'
//                     />
//                     <CardContent className='card_content'>
//                       <Typography gutterBottom variant="h5" component="div">
//                       {(e.title.slice(0,18))}...
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" className='card_discription'>
//                        {(e.description.slice(0,53))}...
//                       </Typography>
//                       <h4 className='card_price'>
//                       ${e.price}
//                       <span className='card_rating'>Rating : {e.rating.rate}</span>
//                       </h4>
//                     </CardContent>
//                   </CardActionArea>
//                   <CardActions>
//                     <Button size="small" color="primary" onClick={()=> handleAddToCart(e)}>
//                       Add to Cart
//                     </Button>
//                     <span className='card_count'>Only {e.rating.count} pieces left</span>
                    
//                   </CardActions>
//                 </Card>
//                 ))}
//                   </div>
//               )
              
//           }


//           </div>
//   </div>
//   );
// }


import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Skeleton } from '@mui/material';  // Import Skeleton here
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../redux/slice/api';
import './card.css';
import { addToCart } from '../redux/slice/cart';
import NotFound from './NotFound';



export default function Cards() {
  const dispatch = useDispatch();
  const shopsData = useSelector((state) => state.shop.data);
  const isLoading = useSelector((state) => state.shop.isLoading);
  const isError = useSelector((state) => state.shop.isError);

  const handleAddToCart = (e) => {
    dispatch(addToCart(e));
  };

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  if (isLoading && !shopsData) {
    // While data is loading, render skeletons
    return (
      <div className='outer_card'>
        <div className='card_box'>
          {[1,2,3,4,5,6,7,8,9,10,11,].map((placeholder, index) => (
            <Card key={index} sx={{ maxWidth: 345 }} className='card'>
              {/* Skeleton content */}
              <CardActionArea>
                <Skeleton variant="rectangular" height={140} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton count={2} />
                  </Typography>
                  <h4>
                    <Skeleton width={80} />
                  </h4>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" disabled>
                  Add to Cart
                </Button>
                <span className='card_count'>
                  <Skeleton width={120} />
                </span>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className='outer_card'>
      <div className='card_box'>
        {shopsData &&
          shopsData.map((e) => (
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
    </div>
  );
}

