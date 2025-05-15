import React from "react";

export default function Star({ rating, maxRating = 5, classname }) {
    
    const roundedRating = Math.round(rating * 2) / 2; 
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        let iconClass = "far fa-star o"; // empty star

        if(roundedRating >= i){
            iconClass = "fas fa-star"; // full star
        } else if (roundedRating >= i - 0.5) {
            iconClass = "fas fa-star-half-alt"; // half star
        }

        stars.push(<i key={i} className={iconClass}></i>);
    }

    return ( 
        <span className={classname}>
            {stars}
        </span>
    );

}