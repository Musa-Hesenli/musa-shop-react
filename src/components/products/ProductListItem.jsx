import { faCartPlus, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookie } from '../../store/reducers/authSlice';
import { deleteFromCart, postToCart, postToFavorites, removeFromFavorites } from '../../store/reducers/cartAndFavorites';

export const baseUrl = "https://raw.githubusercontent.com/Musa-Hesenli/musa-shop/master"

const ProductListItem = ({ product, is_in_cart, is_favorite }) => {
    const dispatch = useDispatch();
    const addToFavorites = () => {
        const user_id = getCookie('user_id');
        dispatch(postToFavorites({ user_id, product_id : product.id }))
    }

    const addToCart = () => {
        const user_id = getCookie('user_id');
        const id = product.id;
        if(id && user_id) {
            dispatch(postToCart({ user_id, product_id : id }));
        }
    }

    const removeCartItem = (product_id) => {
        dispatch(deleteFromCart({ product_id }));
    }

    const deleteFavoriteItem = () => {
        dispatch(removeFromFavorites({ user_id : getCookie('user_id'), product_id : product.id }));
    }

    return (
        <Col className='card-container w-100' data-aos='zoom-in'>
            <div className='custom-card'>
                <div className='opportunity'>   
                    Shipment free
                </div>
                <div className='add-to-container'>
                    <div className={`add-to-favorites ${is_favorite ? 'active' : ''}`} onClick={() => is_favorite ? deleteFavoriteItem() : addToFavorites()}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                    <div onClick={() => !is_in_cart ? addToCart() : removeCartItem(product.id)} className={`add-to-cart ${is_in_cart ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faCartPlus}/>
                    </div>
                </div>
                <Link to={`/products/${product.id}`}>
                    <img src={`${baseUrl + product.image}`} alt="" />
                </Link>
                <div className='custom-card-body p-2'>
                    <div className='card-title'>
                        <Link to={`/products/${product.id}`}>
                            <h4>{product.title}</h4>
                        </Link>
                    </div>
                    <div className='product-description'>
                        <Link to={`/products/${product.id}`}>
                            <p className='my-2'>
                                {product.description.substring(0, 60)}...
                            </p>
                        </Link>
                    </div>
                    <div className='icons-wrapper my-2'>
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <FontAwesomeIcon icon={faStar} className='star'/>
                    </div>
                    <div className='price-wrapper'>
                        <span className='first-price'>{parseInt(product.price.split('.')[0]) + Math.floor(Math.random() * 100)}$ </span>
                        -
                        <span className='updated-price'> {product.price.split('.')[0]}$</span>
                    </div>
                </div>
            </div>
        </Col>
    )
};

export default ProductListItem;