import React from 'react'
import ProductList from '../products/ProductList';

  
const CarouselComponent = React.lazy(() => import('../common-parts/Carousel'))
const Index = () => {
    return (
        <React.Fragment>
            <CarouselComponent/>
            <ProductList/>
        </React.Fragment>
    )
};

export default Index;