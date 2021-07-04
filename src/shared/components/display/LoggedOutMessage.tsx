import React from 'react';
import { Row, Col } from 'react-bootstrap';

export function LoggedOutMessage(): JSX.Element {
    return (
        <Row>
            <Col lg={{ span: 7, offset: 1 }}>
                <h2>What is dostrik?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut cursus lacus. In in nibh dolor. Phasellus ultrices varius lectus, quis dictum est porta vel. Sed sollicitudin nisi eget libero ornare, id varius nunc auctor. Aenean ac nisl a mauris malesuada tincidunt. Nulla rutrum in odio vitae posuere. Duis mauris orci, fermentum ac odio vel, venenatis tristique est. Fusce suscipit mi eu mi tincidunt.
                </p>
                <p>La lacinia lectus congue. Maecenas interdum augue non tempor tincidunt. Vivamus blandit lacus accumsan volutpat rutrum. Proin maximus orci gravida neque elementum, eu facilisis sapien venenatis.</p>
            </Col>
            <Col lg="3" className="text-center">
                <img src="/images/logo192.png" srcSet="/images/logo192.png 2x" style={{width: '192px'}} />
            </Col>
        </Row>
    )
};