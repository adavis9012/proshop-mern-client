import React, {useEffect, useState} from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Col, Form, Row} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {UserDetailsState, UserLoginState, UserUpdateProfileState} from "../reducers/userReducers";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";

interface UserDetailsSelector {
    userDetails: UserLoginState
}

interface UserLoginSelector {
    userLogin: UserLoginState
}

interface UserUpdateProfileSelector {
    userUpdateProfile: UserUpdateProfileState
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
    const userUpdateProfile: UserUpdateProfileState = useSelector((state: UserUpdateProfileSelector) => state.userUpdateProfile);
    const {loading, error, user} = userDetails || {};
    const {userInfo} = userLogin || {};
    const {success} = userUpdateProfile || {};

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user?.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user?.name, user?.email, success]);

    function render() {
        return (
            <Row>
                <Col md={3}>
                    <h1>User Profile</h1>
                    {message && renderMessage()}
                    {success && renderSuccessMessage()}
                    {error && renderErrorMessage()}
                    {loading && <Loader/>}
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

    function renderSuccessMessage() {
        return (
            <Message variant="success">
                Profile Updated
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

        if (password !== confirmPassword) {
            return setMessage('Passwords do not match')
        }

        setMessage('');
        dispatch(updateUserProfile({_id: user?._id, name, email, password}));
    }

    return render();
};

export default ProfileScreen;