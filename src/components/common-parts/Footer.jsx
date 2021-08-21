import { faFacebook, faInstagram, faLinkedin, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container fluid className='footer-container'>
            <Row>
                <Col sm={12} className='social-icons' data-aos='zoom-in'>
                    <div className='facebook'>
                        <FontAwesomeIcon size='2x' icon={faFacebook}/>
                    </div>
                    <div className='instagram'>
                        <FontAwesomeIcon size='2x' icon={faInstagram}/>
                    </div>
                    <div className='linkedin'>
                        <FontAwesomeIcon size='2x' icon={faLinkedin}/>
                    </div>
                    <div className='twitter'>
                        <FontAwesomeIcon size='2x' icon={faTwitter}/>
                    </div>
                    <div className='whatsapp'>
                        <FontAwesomeIcon size='2x' icon={faWhatsapp}/>
                    </div>
                    <div className='telegram'>
                        <FontAwesomeIcon size='2x' icon={faTelegram}/>
                    </div>
                </Col>
            </Row>
            <Row data-aos='zoom-in'>
                <Col className='justify-content-center d-flex my-3'>
                    OR
                </Col>
            </Row>
            <Row data-aos='zoom-in'>
                <Col className='offset-md-3 offset-lg-4' md={6} lg={4}>
                    <Form.Control type='email' placeholder='Email address'/>
                    <Button variant="light" className='mt-2 w-100'>I will contact you</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;