import React, {useEffect, useState} from "react";
import FormContainer from "../FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserLoginState} from "../reducers/userReducers";
import {login} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

interface RootState {
    userLogin: UserLoginState
}

const LoginScreen: React.FC<RouteComponentProps> = ({location, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userLogin: UserLoginState = useSelector((state: RootState) => state.userLogin);
    const {loading, error, userInfo} = userLogin || {};
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    function render() {
        return (
            <FormContainer>
                <h1>Sign In</h1>
                {error && renderErrorMessage()}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email"
                                      placeholder="Enter email"
                                      value={email}
                                      onChange={(event => setEmail(event.target.value))}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Enter password"
                                      value={password}
                                      onChange={(event => setPassword(event.target.value))}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer?{' '}
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }

    function renderErrorMessage() {
        return (
            <Message variant="danger">
                {error}
            </Message>
        );
    }

    function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        dispatch(login(email, password));
    }

    return render();
};

export default LoginScreen;
