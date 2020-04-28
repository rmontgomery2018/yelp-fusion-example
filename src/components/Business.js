import React from 'react'
import './Business.css'

const business = (props) => {
    return (
        <div className="Business">
            <div className="container">
                <img src={props.imageUrl} alt={props.name}/>
                <div className="details">
                    <div className="title">{props.name}</div>
                    <div>{props.address.address1}</div>
                    <div>{`${props.address.city}, ${props.address.state} ${props.address.zip_code}`}</div>
                    <div className="review">{props.review.user}:</div>
                    <div>{props.review.excerpt}</div>
                </div>
            </div>
        </div>
    )
}

export default business