import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductGallery = ({ productImages, text }) => {
    // console.log('productImages - ', productImages);
    return (
        <div>
            <Carousel showArrows={true} showIndicators={false}>
                {
                    productImages.map((image) => {
                        return (<div key={image}>
                            <img src={image}
                                alt={`Photo - ${text}`}
                                title={`Photo - ${text}`} />
                        </div>)
                    })
                }
            </Carousel>
        </div>
    )
}

export default ProductGallery;