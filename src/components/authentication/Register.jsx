import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginImage from '../../static/images/4989777.jpg'
import { getCookie, getToken, register } from '../../store/reducers/authSlice';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [usernameChecker, setUsernameChecker] = useState(false);
    const [emailChecker, setEmailChecker] = useState(false);
    const [passwordChecker, setPasswordChecker] = useState(false);

    const requestStatus = useSelector(state => state.auth.status);
    const errorMessage = useSelector(state => state.auth.error_message);
    const isAuthenticated = getCookie('is_authenticated');

    const dispatch = useDispatch();

    const createAccount = async (e) => {
        e.preventDefault();
        if(!validUsername() || username.length === 0) {
            setUsernameChecker(true);
            return;
        } else setUsernameChecker(false);

        if (!validEmail() || email.length === 0) {
            setEmailChecker(true);
            return;
        } else setEmailChecker(false);

        if(password !== passwordConfirm || password.length ===0 || passwordConfirm.length === 0) {
            setPasswordChecker(true);
            return;
        } else setPasswordChecker(false);

        await dispatch(register({ username, email, password }));
        dispatch(getToken({ username, password }));
    }

    if(isAuthenticated) {
        window.location = '/';
    }



    const validEmail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re = new RegExp(re);
        return re.test(email);
    }

    const validUsername = () => {
        var re = '^[a-zA-Z0-9_.-]*$';
        re = new RegExp(re);
        return re.test(username);
    }

    const makeDisable = requestStatus !== 'idle';

    return (
        <Container className='my-4'>
            <Row>
                <Card className='col-md-12 col-lg-8 offset-md-2' data-aos='zoom-in'>
                    <Row className='align-items-center'>
                        <Col sm={12} md={6} lg={6} className='img-wrapper'>
                            <img src={LoginImage} className='login-left-side-image' alt="" />
                        </Col>
                        <Col sm={12} md={6} lg={6} className='py-3'>
                            <Card.Text className='text-center'>
                                <span className='text-muted'>Welcome to Musa Shop</span>
                                <br />
                                <span className='text-warning'>
                                    {errorMessage}
                                </span>
                            </Card.Text>
                            <Card.Body>
                                <Form onSubmit={e => createAccount(e)}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control onChange={(e) => setUsername(e.target.value.trim())} value={username} type='text' placeholder='Enter username'/>
                                        { usernameChecker ? <Form.Text className='text-danger'>Please enter a valid username</Form.Text> : '' }
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control onChange={(e) => setEmail(e.target.value.trim())} value={email} type='text' placeholder='Enter your email'/>
                                        { emailChecker ? <Form.Text className='text-danger'>Please enter a valid email address</Form.Text> : '' }
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={(e) => setPassword(e.target.value.trim())} value={password} type='password' placeholder='Password'/>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control onChange={(e) => setPasswordConfirm(e.target.value.trim())} value={passwordConfirm} type='password' placeholder='Confirm password'/>
                                        { passwordChecker ? <Form.Text className='text-danger'>Both password and confirm are required and must be the same</Form.Text> : '' }
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Button disabled={makeDisable} type="submit" className="w-100" variant="primary">
                                            { makeDisable ?  'Create account' : 'Login'}
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className='mb-1'>
                                        <Card.Text className='text-center'>
                                            Already have an account?
                                        </Card.Text>
                                    </Form.Group>
                                    <Form.Group className=''>
                                    <Link to='/login'>
                                        <Button disabled={makeDisable} variant="link w-100"  className='create-account-btn'>
                                            Login instead
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

export default Register;