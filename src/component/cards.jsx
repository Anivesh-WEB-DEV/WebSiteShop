import React, { useEffect, useState } from "react";
import ScrollDialog from "./CardPopUp";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../redux/slice/api";
import NotFound from "./NotFound";
import "./card.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Skeleton } from "@mui/material";

export default function Cards() {
  const dispatch = useDispatch();
  const shopsData = useSelector((state) => state.shop.data);
  const isLoading = useSelector((state) => state.shop.isLoading);
  const isError = useSelector((state) => state.shop.isError);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);
  const openPopup = (card) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };
  if (isLoading && !shopsData) {
    return (
      <div className="outer_card">
        <div className="card_box">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((placeholder, index) => (
            <Card key={index} sx={{ maxWidth: 345 }} className="card">
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
                <span className="card_count">
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
  if (shopsData && Array.isArray(shopsData)) {
    return (
      <div className="outer_card">
        <div className="card_box">
          {shopsData.map((e) => (
            <Card
              key={e.id}
              sx={{ maxWidth: 345 }}
              className="card"
              onClick={() => openPopup(e)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={e.thumbnail}
                  alt="Product Image"
                  className="cardImages"
                />
                <CardContent className="card_content">
                  <Typography gutterBottom variant="h5" component="div">
                    {e.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="card_discription"
                  >
                    {e.description}
                  </Typography>
                  <h4 className="card_price">
                    ${e.price}
                    <span className="card_rating">
                      Rating : {(Math.round(e.rating * 10) / 10).toFixed(1)}
                    </span>
                  </h4>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <span className="card_count">Only {e.stock} pieces left</span>
              </CardActions>
            </Card>
          ))}
        </div>

        {selectedCard && (
          <ScrollDialog car={selectedCard} onClose={closePopup} />
        )}
      </div>
    );
  }
}
