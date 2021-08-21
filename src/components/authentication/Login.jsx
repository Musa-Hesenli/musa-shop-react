import React, {  useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginImage from '../../static/images/Mobile-login.jpg'
import { getToken } from '../../store/reducers/authSlice';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] =  useState('');
    
    const authStatus = useSelector(state => state.auth.status);

    const is_authenticated = useSelector(state => state.auth.is_authenticated);
   
    

    if(is_authenticated) {
        window.location = '/';
    }

    const dispatch = useDispatch();
    
    
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(getToken({username, password}));
    }
    
    return (
        <Container className='my-4'>
            <Row>
                <Card className='col-md-12 col-lg-8 offset-md-2' data-aos='zoom-in'>
                    <Row className='align-items-center'>
                        <Col sm={12} md={6} lg={6} className='img-wrapper'>
                            <img src={LoginImage} className='login-left-side-image' alt="" />
                        </Col>
                        <Col sm={12} md={6} lg={6} className=' align-items-center'>
                            <Card.Text className='text-center'>
                                <span className='text-muted'>Login into your account</span>
                            </Card.Text>
                            <Card.Body>
                                <Form onSubmit={(e) => formSubmit(e)}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control onChange={(e) => setUsername(e.target.value)}  placeholder='Enter your username'/>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Button type="submit" disabled={authStatus !== 'idle'} className="w-100" variant="primary">
                                            { authStatus === 'idle' ? 'Login' : 'Please wait' }
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className='mb-1'>
                                        <Card.Text className='text-center'>
                                            Don't have an account yet?  
                                        </Card.Text>
                                    </Form.Group>
                                    <Form.Group className=''>
                                        <Link to='/create-account'>
                                            <Button disabled={authStatus !== 'idle'} variant="link w-100" className='create-account-btn'>
                                                Create account
                                            </Button>
                                        </Link>
                                    </Form.Group>
                                </Form>
                            </Card.Body>

                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    )
};

export default Login;