import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

function ReviewCard({ review }) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        size: window.innerWidth < 600 ? 20 : 25,
        activeColor: "red",
        value: review.rating,
        isHalf: true,
    };

    return (
        <div className='reviewCard p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out max-w-sm w-full'>
            <div className='flex items-center mb-4'>
                {/* User Profile Image */}
                <img
                    src={profilePng}
                    alt="user"
                    className='w-14 h-14 rounded-full object-cover border border-white shadow-xm'
                />
                {/* User Name */}
                <p className='ml-4 text-lg font-semibold text-gray-800'>{review.name}</p>
            </div>

            {/* Star Rating */}
            <div className='mb-2'>
                <ReactStars {...options} />
            </div>

            {/* User Comment */}
            <p className='text-gray-700 text-sm leading-relaxed'>{review.comment}</p>
        </div>
    );
}

export default ReviewCard;
