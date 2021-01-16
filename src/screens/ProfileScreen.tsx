import React, {useEffect, useState} from "react";
import FormContainer from "../FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserDetailsState, UserLoginState} from "../reducers/userReducers";
import {getUserDetails, register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

interface UserDetailsSelector {
    userDetails: UserLoginState
}
interface UserLoginSelector {
    userLogin: UserLoginState
}

const ProfileScreen: React.FC<RouteComponentProps> = ({history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userDetails: UserDetailsState = useSelector((state: UserDetailsSelector) => state.userDetails);
    const userLogin: UserLoginState = useSelector((state: UserLoginSelector) => state.userLogin);
    const {loading, error, user} = userDetails || {};
    const {userInfo} = userLogin || {};

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user?.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user?.name, user?.email]);

    function render() {
        return (
            <Row>
                <Col md={3}>
                    <h1>User Profile</h1>
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
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>

                </Col>
            </Row>
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
        // dispatch(register(name, email, password));
    }

    return render();
};

export default ProfileScreen;