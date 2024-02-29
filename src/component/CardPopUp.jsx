import * as React from "react";
import "./CardPopUp.css";
import { addToCart } from "../redux/slice/cart";
import { useDispatch } from "react-redux";
import Navbar from "./navbar";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import StarIcon from "@mui/icons-material/Star";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScrollDialog = ({ car, onClose }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState(car.thumbnail);

  const handleThumbnailHover = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (car) => {
    dispatch(addToCart(car));
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={!!car}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <Navbar />
        <AppBar
          sx={{
            position: "relative",
            right: "1",
            backgroundColor: "white",
            height: "25px",
            width: "100%",
            boxShadow: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <KeyboardBackspaceIcon
                onClick={() => onClose()}
                sx={{
                  color: "black",
                  margin: "10px 0px 0px 18px",
                }}
              />
            </div>
            <div>
              <IconButton
                color="inherit"
                onClick={onClose}
                aria-label="close"
                sx={{
                  color: "black",
                  margin: "10px 0px 0px 18px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </AppBar>
        <div className="product-description-container">
          <div className="main-img">
            <div className="thumbnail-list">
              {car.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === image ? "selected" : ""
                  }`}
                  onMouseEnter={() => handleThumbnailHover(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
            <div className="product-image-container">
              <TransformWrapper
                initialScale={1}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div className="tools">
                      <button onClick={() => zoomIn()}>+</button>
                      <button onClick={() => zoomOut()}>-</button>
                      <button onClick={() => resetTransform()}>x</button>
                    </div>
                    <TransformComponent>
                      <img
                        src={selectedImage}
                        alt="Wristwatch by Ted Baker London"
                        style={{ width: 500, height: 400 }} 
                      />
                      
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </div>
          </div>
          <div className="product-details">
            <h2 className="product-title">{car.title}</h2>
            <p className="product-description">{car.description}</p>
            <div className="product-rating-reviews">
              <span className="product-rating">
                {(Math.round(car.rating * 10) / 10).toFixed(1)}
                <StarIcon
                  sx={{ marginLeft: 0.5, marginRight: 0.5, fontSize: 20 }}
                />
              </span>
              <span> 3,09,245 Ratings & 27,932 Reviews </span>
            </div>

            <div className="product-price">
              <div className="price">
                $
                {((car.price * (100 - car.discountPercentage)) / 100).toFixed(
                  2
                )}
              </div>
              <div className="del">${car.price}</div>
            </div>
            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(car)}
              >
                Add to Cart
              </button>
              <span className="stock-info">
                Hurry up only {car.stock} pieces left
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default ScrollDialog;
