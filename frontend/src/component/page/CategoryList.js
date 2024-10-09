import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryProduct } from '../../actions/productAction'; // Assume action is defined here

const CategoryList = () => {
    const dispatch = useDispatch();
    const { categoryProducts, loading } = useSelector((state) => state.categoryProducts); // Redux se state access

    const categoryLoading = new Array(13).fill(null);

    useEffect(() => {
        dispatch(getCategoryProduct()); // Redux action dispatch karna
    }, [dispatch]);

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div
                            className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProducts &&
                    categoryProducts.map((product, index) => (
                        <Link
                            to={"/product/" + (product?._id  || 'default-category')}
                            className='cursor-pointer'
                            key={product?._id || index}
                        >
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img
                                    src={product?.images?.[0]?.url || 'https://via.placeholder.com/100?text=Default+Image'}
                                    alt={product?.category || 'default-category'}
                                    className='h-full object-scale-down mix-blend-multiply object-fill hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category || 'Default Category'}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
