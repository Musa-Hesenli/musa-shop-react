import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row, Button } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectProductById } from '../../store/reducers/productsSlice';
import SwiperCore, {
    Navigation,Pagination,Thumbs
  } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay }  from 'swiper/core'

import '../../static/style/single-item.css';
import builder from '../../axios/builder';
import { deleteFromCart, postToCart } from '../../store/reducers/cartAndFavorites';
import { getCookie } from '../../store/reducers/authSlice'




SwiperCore.use([Navigation,Thumbs, Autoplay, Pagination]);



const baseUrl ='https://raw.githubusercontent.com/Musa-Hesenli/musa-shop/master';

const SingleItem = () => {
    const { id } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const product = useSelector(state => selectProductById(state, id));
     
    const [relatedImage, setRelatedImage] = useState([]);
    const dispatch = useDispatch();

    const cartIDS = useSelector(state => state.cartAndFavorites.cart).map(item => item.product)
    
    console.log(cartIDS)

    
    useEffect(() => {
        builder.get('/api/images', {
            params : {
                'product_id': id
            }
        }).then(response => {
            setRelatedImage(response.data);
        });
    }, [id]);

    if(relatedImage.length === 0) {
        return <div>Pending</div>
    }

    

    if (product === undefined) {
        return "";
    }

    const renderedSlides = relatedImage.map(item => {
        return <SwiperSlide key={item.id}>
            <img src={baseUrl + item.image} alt="" />
        </SwiperSlide>
    });

    

    const addToCart = () => {
        const user_id = getCookie('user_id');
        if(id && user_id) {
            dispatch(postToCart({ user_id, product_id : id }));
        }
    }

    const removeCartItem = (product_id) => {
        dispatch(deleteFromCart({ product_id }));
    }

    return (
        <Container className='py-5 single-item' data-aos='zoom-in'>
            <Row>
                <Col lg={8} className='single__item__image'>
                <Swiper
                 style={{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}}
                  spaceBetween={30} navigation={true} 
                  observer={true}
                  observeParents={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                  }} pagination={{
                    "clickable": true
                  }}
                  className="mySwiper2">
                    {renderedSlides}
                </Swiper>
                <Swiper 
                onSwiper={setThumbsSwiper}
                 spaceBetween={10} 
                 slidesPerView={4} 
                 freeMode={true} 
                 watchSlidesVisibility={true} 
                 watchSlidesProgress={true}
                 
                 className="mySwiper">
                    {renderedSlides}
                </Swiper>
                    <p></p>
                    <div className='add__to__favorites__single__item'>
                        <FontAwesomeIcon icon={faHeart} style={{ fontSize : '24px' }}/>
                    </div>
                </Col>
                <Col lg={4}>
                    <h4>{ product.title }</h4>
                    <p>{ product.description }</p>
                    <div className='sizes__wrapper'>
                        <div className='size__item'>
                            X
                        </div>
                        <div className='size__item'>
                            XS
                        </div>
                        <div className='size__item'>
                            S
                        </div>
                        <div className='size__item'>
                            L
                        </div>
                        <div className='size__item'>
                            M
                        </div>
                    </div>
                    <div className='my-3 d-flex align-items-center justify-content-between'>
                        <div className='ratings'>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div>
                            36 reviews
                        </div>
                    </div>
                    <ListGroup className='my-3'>
                        <ListGroup.Item>
                            <span className='text-muted'>Ram</span>: 8gb
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='text-muted'>Storage</span>: 512 SSD
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='text-muted'>Battery life</span>: 8 hours
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='text-muted'>Colorful keyboard</span>: <span className='text-danger'>No</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='text-muted'>Type-C usb</span>: <span className='text-success'>Yes</span>
                        </ListGroup.Item>
                    </ListGroup>
                    { !cartIDS.includes(parseInt(id)) ? (
                        <Button variant='dark' bg='dark' onClick={() => addToCart()} className='order__button'>
                            Add to cart
                        </Button>
                    ) : <Button variant='danger' bg='danger' onClick={() => removeCartItem(parseInt(id))} className='order__button'>
                            Remove from cart
                        </Button> }
                </Col>
            </Row>
        </Container>
    )
};

export default SingleItem;