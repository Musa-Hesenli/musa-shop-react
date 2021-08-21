import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductListItem from './ProductListItem';


import { useSelector } from 'react-redux';
import { allProducts, requestStatus } from '../../store/reducers/productsSlice';



const ProductList = () => {

    const productsList = useSelector(state => allProducts(state));
    const status = useSelector(state => requestStatus(state));

    const cartItems = useSelector(state => state.cartAndFavorites.cart);
    const elementIds = cartItems.map(item => item.product)

    const favoriteItems = useSelector(state => state.cartAndFavorites.favorites).map(item => item.product)
    

    if(status === 'pending') {
        return <h1>Pending</h1>
    }
    
    const renderedItems = productsList.map(item => {
        return <div className='col-md-6 col-lg-3 text-center'  key={item.id}>
            <ProductListItem product={item} is_favorite={favoriteItems.includes(item.id)} is_in_cart={elementIds.includes(item.id)}/>
        </div>
    })

    return (
        <Container className='my-4'>
            <Row>
                {renderedItems}
            </Row>
        </Container>
    )
}

export default ProductList;