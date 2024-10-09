import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import HorizontalCardProduct from "../page/HorizontalCardProduct.js";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  // State for zoom image functionality
  const [zoomImage, setZoomImage] = useState(false);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [activeImage, setActiveImage] = useState(""); // State for the active image
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, reviewError, success]);

  // Setting the active image once product is loaded
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].url); // Set the first image as default
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    dispatch(addItemsToCart(id, 1));
    alert.success("Item Added to cart");
  };

  const handleBuyProduct = (id) => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(id, 1));
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  // Handle zoom image functionality
  const handleZoomImage = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomImage(false); // Reset zoom when mouse leaves the image
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "green",
    value: product?.ratings,
    isHalf: true,
  };

  const prcnt = 0.8;
  const sellingPrice = product.price * prcnt;

  return (
    <div className="container mx-auto p-4 bg-slate-100">
      {activeImage ? (
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
          <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
            <div
              className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleMouseLeave} // Reset zoom when mouse leaves
            >
              <img
                src={activeImage} // Use active image here
                className={`h-full w-full object-scale-down mix-blend-multiply ${
                  zoomImage ? "zoomed" : ""
                }`} // Add zoomed class if zoom is active
                alt={product.name}
              />
              {zoomImage && (
                <div
                  className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0"
                  style={{ zIndex: 10 }}
                >
                  <div
                    className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="h-full">
              <div className="flex gap-2 lg:flex-col  h-full">
                {product.images.map((img) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={img._id}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      alt={product.name}
                      onClick={() => setActiveImage(img.url)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-1 ">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {product.category}
            </p>
            <h2 className="text-xl text-slate-600 lg:text-4xl font-medium">
              {product.name}
            </h2>
            <p className="capitalize text-slate-500">{product.category}</p>

            <div className="detailsBlock-2 flex flex-row">
              <ReactStars {...options} />
              <span className="font-cursive mx-1 mt-3 text-black-200 text-[1.2vmax]">
                ({product.reviews ? product.reviews.length : 0} )
              </span>
            </div>

            <div className="flex gap-3  text-sm py-2">
              <p className="text-black font-medium">
                ₹{sellingPrice.toFixed(2)}
              </p>{" "}
              <p className="text-slate-500 line-through">₹{product.price}</p>{" "}
              <p className="text-green-500 ">
                {Math.trunc((1 - prcnt) * 100)}% off
              </p>{" "}
            </div>
            <p>
              state:{" "}
              <b
                className={`${
                  product.Stock < 1 ? "text-red-500 text-sm font-semibold" : "text-green-700 text-sm font-semibold"
                }`}
              >
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>

            <div className="flex flex-col gap-2">
              <button
                className="text-sm w-60 bg-yellow-500  hover:bg-yellow-700 hover:text-yellow-50 text-slate-800 px-3 py-0.5 rounded-full"
                onClick={() => handleBuyProduct(product._id)}
              >
                Buy now
              </button>

              <button
                className="text-sm w-60 bg-tomato hover:bg-orange-700 text-slate-800 hover:text-yellow-50 px-3 py-0.5 rounded-full"
                onClick={(e) => handleAddToCart(e, product._id)}
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p className="text-sm ">{product.description}</p>
            </div>
            <button
              className="text-sm w-60 bg-green-500 hover:bg-green-700 text-slate-800 hover:text-yellow-50 px-3 py-0.5 rounded-full"
              onClick={submitReviewToggle}
            >
              Submit Review
            </button>
          </div>
        </div>
      ) : (
        <div>No product found.</div> // Handle case when product is not found
      )}
      {product.category && (
        <HorizontalCardProduct
          category={product?.category}
          heading={"Recommended Product"}
        />
      )}

      <h3 className="text-xl font-bold mb-4 text-center">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle className="text-lg font-semibold">
          Submit Review
        </DialogTitle>
        <DialogContent className="p-6">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="mt-4 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300  focus:border-blue-500 "
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </DialogContent>
        <DialogActions className="justify-between p-4">
          <Button
            onClick={submitReviewToggle}
            color="secondary"
            className="text-gray-700 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={reviewSubmitHandler}
            color="primary"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {product &&
      Array.isArray(product.reviews) &&
      product.reviews.length > 0 ? (
        <div className="reviews flex flex-row gap-1 my-2">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </div>
  );
};

export default ProductDetails;
