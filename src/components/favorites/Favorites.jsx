import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allProducts, requestStatus } from '../../store/reducers/productsSlice';
import ProductListItem from '../products/ProductListItem';

const Favorites = () => {
    const productsList = useSelector(state => allProducts(state));
    const status = useSelector(state => requestStatus(state));

    const favoriteItems = useSelector(state => state.cartAndFavorites.favorites);

    const getFavoriteProduct = (id) => {
        return productsList.find(item => item.id === id)
    }

    const cartItems = useSelector(state => state.cartAndFavorites.cart);
    const elementIds = cartItems.map(item => item.product)


    if(status === 'pending') {
        return <h1>Pending</h1>
    }
    
    const renderedItems = favoriteItems.map(item => {
        const favItem = getFavoriteProduct(item.product);
        return <div className='col-md-6 col-lg-3 mb-3' key={item.id}>
            <ProductListItem is_in_cart={elementIds.includes(item.product)} is_favorite={true} product={favItem}/>
        </div>
    })
    return (
        <Container className='my-5'>
            <Row>
                {renderedItems}
            </Row>
        </Container>
    )
};

export default Favorites;