import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { checkUserState } from '../../store/app/selectors';
import { login } from '../../store/app/actions/user';
import { /*UserState,*/ UserLoginType } from '../../store/app/types';
// import { Border } from '../../styles';
import { LoginForm, RegisterForm } from '../forms/Login';


export function User(): JSX.Element {
    const dispatch = useDispatch();
    const user = useSelector( checkUserState );
    const [ userLogin, setUserLogin ] = useState<UserLoginType>({ username: null, password: null });
    const [ modalShow, setModalShow ] = useState<Boolean>(false) // put in useUser
    
    const handleLogin = ( e: React.FormEvent ): void => {
        const time = new Date().getTime();
        dispatch( login( userLogin ) ) 
        e.preventDefault();
    };
    
    const handleRegister = ( e: React.FormEvent ): void => {
        dispatch( login( userLogin ) );
        e.preventDefault();
    };

    const updateState = ( key: string, value: string ) => {
        setUserLogin({ ...userLogin, [key]: value });
    };

    const payload = {
        user: user,
        dispatch: dispatch,
        updateState: updateState,
        handleLogin: handleLogin,
        handleRegister: handleRegister
    };

    const isLoggedIn = user.isLoggedIn
    const isLoading = user.isLoading
    const username = user.info.username

    const avatar = isLoggedIn ? user.info.username : 'avatar';
    const img = '/images/'+avatar+'.png';

    if( !isLoggedIn ) {
        return (
            <React.Fragment>
                <Button className="userImg" onClick={() => setModalShow(true)}><img src={img} srcSet={img+" 2x"} width="38" height="38" style={{borderRadius: "19px"}} /></Button>
                <LoginModal show={modalShow} onHide={() => setModalShow(false)} payload={payload} />
            </React.Fragment>
        );
    } else {
        return <Link className="userImg" to="/profile"><img src={img} srcSet={img+" 2x"} width="38" height="38" style={{borderRadius: "19px"}} /></Link>;
    }
}

function LoginModal( props: any ) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            className="userModal"
            size="lg"
            aria-labelledby="contained-modal-title"
            >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md="6" className="loginBox">
                            <div className="p-3">
                                <h2>Login</h2>
                                <LoginForm payload={props.payload} />
                            </div>
                            
                        </Col>
                        <Col md="6" className="registerBox">
                            <div className="p-3">
                                <h2>Not registered?</h2>
                                <RegisterForm payload={props.payload} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
      </Modal>
    );
}