import React from 'react';
import { Row, Col } from 'react-bootstrap';


type SidebarProps = {
    isLoggedIn: boolean,
    component: string
}

export function Sidebar( props: SidebarProps ): JSX.Element {
    return <div>Sidebar</div>
}