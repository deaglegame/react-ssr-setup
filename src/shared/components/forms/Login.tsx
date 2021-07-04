import React, { useRef, useEffect } from 'react';
// import { UserState } from '../../store/app/types';
import { Form, Button } from 'react-bootstrap';

export function LoginForm( props: any ): JSX.Element {

    const loginForm = useRef<HTMLFormElement>();
    const inputUsername = useRef<HTMLInputElement>();
    const inputPassword = useRef<HTMLInputElement>();
    const user = props.payload.user;
    const updateState = props.payload.updateState;
    const handleLogin = props.payload.handleLogin;
    const isLoading = user.isLoading;

    useEffect( () => {
        const node = inputUsername.current;
        if( node ) { node.focus(); }
    }, []);

    return (
        <Form className="userForm loginForm" autoComplete="off" ref={loginForm as any} onSubmit={handleLogin}>
            <Form.Group controlId="username">
                <Form.Control ref={inputUsername as any} onChange={ e => updateState( 'username', e.target.value )} type="text" placeholder="Username" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Control ref={inputPassword as any} onChange={ e => updateState( 'password', e.target.value )} type="text" placeholder="Password" autoComplete="off" />
            </Form.Group>
            <Button type="submit" className="userSubmit">{ isLoading ? 'Logging in...' : 'Log in' }</Button>
        </Form>
    )
};

export function RegisterForm( props: any ): JSX.Element {
    const registerForm = useRef<HTMLFormElement>();
    const inputUsername = useRef<HTMLInputElement>();
    const inputPassword1 = useRef<HTMLInputElement>();
    const inputPassword2 = useRef<HTMLInputElement>();

    const user = props.payload.user;
    const handleRegister = props.payload.handleRegister;
    const isPosting = user.isPosting;

    return (
        <Form className="userForm registerForm" autoComplete="off" ref={registerForm as any} onSubmit={handleRegister}>
            <Form.Group controlId="username">
                <Form.Control ref={inputUsername as any} type="text" placeholder="Username" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="password1">
                <Form.Control ref={inputPassword1 as any} type="password" placeholder="Password" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="password2">
                <Form.Control ref={inputPassword2 as any} type="password" placeholder="Confirm Password" autoComplete="off" />
            </Form.Group>
            <Button type="submit" className="userSubmit">{ isPosting ? 'Loading...' : 'Register' }</Button>
        </Form>
    )
};

