import React, {useEffect, useState} from "react";
import FormContainer from "../FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserLoginState} from "../reducers/userReducers";
import {register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

interface UserRegisterSelector {
    userRegister: UserLoginState
}

const RegisterScreen: React.FC<RouteComponentProps> = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userRegister: UserLoginState = useSelector((state: UserRegisterSelector) => state.userRegister);
    const {loading, error, userInfo} = userRegister || {};
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    function render() {
        return (
            <FormContainer>
                <h1>Sign Up</h1>
                {message && renderMessage()}
                {error && renderErrorMessage()}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name"
                                      placeholder="Enter name"
                                      value={name}
                                      onChange={(event => setName(event.target.value))}
                        />
                    </Form.Group>
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
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Confirm password"
                                      value={confirmPassword}
                                      onChange={(event => setConfirmPassword(event.target.value))}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Have an Account?{' '}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        >
                            Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }

    function renderMessage() {
        return (
            <Message variant="danger">
                {message}
            </Message>
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

        if(password !== confirmPassword) {
            return setMessage('Passwords do not match')
        }

        setMessage('');
        dispatch(register(name, email, password));
    }

    return render();
};

export default RegisterScreen;
