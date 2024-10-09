import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../layout/Loader/loader.js';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { addItemsToCart } from '../../actions/cartAction.js';
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component"
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData.js';



const categories = [
    "Laptop",
    "Footwear",
    "Bottles",
    "Trimmres",
    "Watches",
    "Earbudes",
    "Camera",
    "Mobile",
    "Bags",
    "Television",
   "Refrigerators","Speakers","Earphones","Bags"
];

function Products() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100000]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Array for selected categories
    const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();

    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(state => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const handleAddToCart = (e, id) => {
        e.preventDefault();
        dispatch(addItemsToCart(id, 1));
        alert.success("Item Added to cart");
    };

    const handleCategoryChange = (e, category) => {
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, category]); // Select category
        } else {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category) // Deselect category
            );
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, selectedCategories.join(","), ratings));
    }, [dispatch, keyword, currentPage, price, selectedCategories, ratings, alert, error]);

    let count = filteredProductsCount;

    const options = {
        edit:false,
        color: "rgba(20,20,20,0.1)",
        size:window.innerWidth<600?20:25,
        activeColor: "green",
        isHalf: true,
    }
    const prcnt = 0.8;

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ShopEase" />
                    <h2 className="text-2xl font-serif text-center mt-8">Products</h2>

                    <div className="productsPage flex gap-6 px-4 mt-6">
                        {/* Filter Box */}
                        <div className="filterBox bg-gray-100 p-4 rounded-lg shadow w-60 h-screen sticky top-0 ">
                            <Typography className="font-semibold mb-2">Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={100000}
                                className="mb-6"
                            />

                            <Typography className="font-semibold mb-2">Categories</Typography>
                            <ul className="categoryBox space-y-2">
                                {categories.map((category) => (
                                    <li className="flex items-center" key={category}>
                                        <input
                                            type="checkbox"
                                            id={category}
                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded hover:text-red-300"
                                            checked={selectedCategories.includes(category)} // Check if category is selected
                                            onChange={(e) => handleCategoryChange(e, category)} // Handle category change
                                        />
                                        <label
                                            htmlFor={category}
                                            className="cursor-pointer hover:text-red-600"
                                        >
                                            {category}
                                        </label>
                                     </li>
                                ))}
                            </ul>

                            <fieldset className="mt-6">
                                <Typography component="legend" className="font-semibold mb-2">
                                    Rating Above
                                </Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => setRatings(newRating)}
                                    aria-labelledby="continuous-slider"
                                    min={0}
                                    max={5}
                                    className="mb-6"
                                />
                            </fieldset>
                        </div>

                        {/* Products Grid */}
                        <div className="allProduct grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                            { products && products.length > 0 ? (
                            products.map((product) => (
                                
                                <Link
                                    to={"/product/" + product._id}
                                    className='bg-white rounded-sm shadow aspect-[3/4] scale-90'
                                    key={product._id}
                                >
                                    <div className='bg-slate-200 h-44 p-2 flex justify-center items-center'>
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="h-full object-contain"
                                        />
                                    </div> 
                                    <div className='px-2'>
                                        <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>
                                        <p className="text-gray-500 text-sm">{product.category}</p>
                                        <div className='detailsBlock-2 flex flex-row'>
                                            <ReactStars {...options}
                                            value={product.ratings ? product.ratings : 0}
                                            />
                                            <span className='font-cursive mx-1 mt-3 text-black-200 text-[1.2vmax]'>({product.reviews?product.reviews.length: 0} )</span>
                                        </div>
                                        <div className="flex gap-3  text-sm py-2">
                                            <p className="text-black font-medium">
                                                ₹{Math.trunc(product.price * prcnt.toFixed(2))}
                                            </p>{" "}
                                            <p className="text-slate-500 line-through">
                                                ₹{product.price}
                                            </p>{" "}
                                            <p className="text-green-500 ">
                                                {Math.trunc((1-prcnt) * 100)}% off
                                            </p>{" "}
                                        </div>
                                        <button
                                            className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                                            onClick={(e) => handleAddToCart(e, product._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div> 
                                </Link>
                            ))):(
                                <p>No products found</p>
                            )}
                        </div>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox mt-8 flex justify-center">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="page-item inline-block px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-lg mx-1"
                                linkClass="page-link no-underline"
                                activeClass="bg-red-600 text-white border-none"
                                activeLinkClass="bg-red-600 text-white"
                            />
                        </div>
                    )}

                </Fragment>
            )}
        </Fragment>
    );
}

export default Products;
