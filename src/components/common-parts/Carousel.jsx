import { Carousel } from "react-bootstrap";
import React from "react";
import SlideImage1 from '../../static/images/s1.jpg';
import SlideImage2 from '../../static/images/s2.jpg';
import SlideImage3 from '../../static/images/s3.jpg';

const CarouselComponent = () => {
  return (
    <Carousel fade data-aos='zoom-in'> 
      <Carousel.Item interval={3000} className='img-container'>
        <img
          className="d-block w-100"
          alt="First slide"
          src={SlideImage1}
          height='400px'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} className='img-container'>
        <img
          className="d-block w-100"
          src={SlideImage2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 data-aos='slide-left'>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} className='img-container'>
        <img
          className="d-block w-100"
          src={SlideImage3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};


export default CarouselComponent;