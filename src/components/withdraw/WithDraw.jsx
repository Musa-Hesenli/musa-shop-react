import React from "react";
import { useState } from "react";
import { Accordion, Card, Col, Container, Form, Row, Button } from "react-bootstrap";

import Cards from "react-credit-cards";
import { useDispatch, useSelector } from "react-redux";
import { confirmCart } from "../../store/reducers/cartAndFavorites";

const WithDraw = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardUser, setCardUsername] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const cartItems = useSelector(state => state.cartAndFavorites.cart);

  const dispatch = useDispatch();

 const confirmOrder = () => {
    dispatch(confirmCart({ cartItems, address : "California, USA" }))
 }

  const initCardNUmber = (e) => {
    if (e.target.value.length < 17) setCardNumber(e.target.value);
  };

  const initCardExpiry = (e) => {
    let value = e.target.value;
    value = value.replace("/", "");
    let init = "";
    if (value.length !== 5) {
      for (let i = 0; i < value.length; i++) {
        if (i === 2) {
          init += "/" + value[i];
        } else init += value[i];
      }

      setCardExpiry(init);
    }
  };

  return (
    <Container className="my-4" data-aos='zoom-out'>
      <Row>
        <Col sm={12} md={6} lg={6} className='offset-md-3 offset-lg-3 my-4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam ipsa deserunt fuga eos nisi ipsum maxime sunt unde quos autem aut quaerat, obcaecati ab amet ipsam quidem voluptas dolore! Similique!
        </Col>
        <Col sm={12} md={6} lg={4} className='offset-md-3 offset-lg-4'>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Payment details</Accordion.Header>
              <Accordion.Body>
                <Col>
                  <Card>
                    <Card.Body id="WithDraw">
                      <Cards
                        cvc={cardCvc}
                        expiry={cardExpiry}
                        focused={cardUser}
                        name={cardUser}
                        number={cardNumber}
                      />
                      <Form>
                        <Form.Group className="mb-3 mt-3">
                          <Form.Label>Card username</Form.Label>
                          <Form.Control
                            value={cardUser}
                            onChange={(e) => setCardUsername(e.target.value)}
                            type="text"
                            placeholder="Card name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Card number</Form.Label>
                          <Form.Control
                            value={cardNumber}
                            onChange={(e) => initCardNUmber(e)}
                            type="text"
                            placeholder="Card number"
                          />
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Expiry date</Form.Label>
                              <Form.Control
                                value={cardExpiry}
                                onChange={(e) => initCardExpiry(e)}
                                type="text"
                                placeholder="Card name"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Card CVC</Form.Label>
                              <Form.Control
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                type="text"
                                placeholder="Card CVC"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Address Details</Accordion.Header>
              <Accordion.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Address name</Form.Label>
                        <Form.Control placeholder='Address'/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Country</Form.Label>
                        <select defaultValue="" name="" className='form-control' id="">
                            <option value="" disabled>Select country</option>
                            <option value="1">USA</option>
                            <option value="2">Canada</option>
                            <option value="3">Switzerland</option>
                            <option value="4">Germany</option>
                            <option value="5">Denmark</option>
                        </select>
                    </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Finish payment</Accordion.Header>
                <Accordion.Body>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo rem dolorem excepturi quibusdam illum.</p>
                    <Button onClick={() => confirmOrder()} variant='success' bg='success' className='w-100'>Finish payment</Button>
                </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default WithDraw;
