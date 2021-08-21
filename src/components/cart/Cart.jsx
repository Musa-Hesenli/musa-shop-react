import React from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCart } from "../../store/reducers/cartAndFavorites";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartAndFavorites.cart);
  const status = useSelector((state) => state.cartAndFavorites.status);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  if (status === "pending") {
    return <p>Please wait...</p>;
  }

  const getProductInfo = (id) => {
    return products.find((item) => item.id === id);
  };

  const removeCartItem = (product_id) => {
    dispatch(deleteFromCart({ product_id }));
  }

  const renderedItems = cartItems.map((item) => {
    let product = getProductInfo(item.product);
    return (
      <tr key={product.id}>
        <td>
          <img src={'https://raw.githubusercontent.com/Musa-Hesenli/musa-shop/master' + product.image} alt="" />
        </td>
        <td>{product.title}</td>
        <td>{product.price}$</td>
        <td>
            {item.count}
        </td>
        <td>{ item.count * product.price }$</td>
        <td>
          <Button variant="danger" onClick={() => removeCartItem(product.id)} bg="danger" className="btn-sm ml-2">
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container className="my-5" data-aos="zoom-in">
      <Row>
        <Col className="table-responsive">
          <Table bordered hover className="entry__table">
            <thead>
              <tr>
                <th>Product image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Count</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedItems}</tbody>
          </Table>
        </Col>
        <Col sm={12}>
          <Link to='/order'>
            <Button variant="dark" bg="danger">
              Confirm cart
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
