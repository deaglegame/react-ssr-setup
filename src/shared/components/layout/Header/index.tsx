import React from 'react';
//import ReactTooltip from 'react-tooltip';
//import { checkCurrentPage } from '../../redux/selectors';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { ReactComponent as LogoLight } from '../../../assets/logo-light.svg';
import { ReactComponent as LogoDark } from '../../../assets/logo-dark.svg';

import { SiteHeader, NavItem, LiveIndicator, TickerContainer } from './styles';
import { IconButton } from '../../../styles';

import { TickerBar } from '../../layout/TickerBar';
import { SearchForm } from '../../forms/Search';
import { User } from '../../display/User';

//import logoDark from '../../assets/images/logo-light.svg';
//import logoLight from '../../assets/images/logo-dark.svg';
//import { TickerControls } from '../TickerControls';
//import TickerBar from '../TickerBar';
//import SearchForm from '../forms/Search';
//import User from '../User';

interface Props {
    theme: string
};

export const Header = ({theme}: Props) => {

    /*
    const theme = props.theme;
    const toggleTheme = props.toggleTheme;
    const currentPage = useSelector( state => checkCurrentPage( state ) );
    const isLoggedIn = useSelector( state => state.user.isLoggedIn );
    const isTrading = useSelector( state => state.stocks.isTrading );
    const isSubscribed = useSelector( state => state.watchlist.testSubscribed );
    */

    const isLoggedIn = false;
    const currentPage = 'Home';
    const toggleTheme = () => { console.log('test') };

    return (
        <SiteHeader isLoggedIn={false}>
            <Container>
                <Navbar expand="md">
                    <Link className="nav-link" id="logo" to="/"><LogoLight style={{width:'120px'}} /></Link>
                    
                    <Navbar.Collapse id="dstrkNav" className="order-sm-2 order-md-1">
                        <Nav className="mr-auto">
                            <NavItem><Link to="/stocks">Stocks</Link></NavItem>
                            <NavItem><Link to="/cryptos">Cryptocurrencies</Link></NavItem>
                        </Nav>
                    </Navbar.Collapse>

                    <div className="ml-auto order-sm-1 order-md-2">
                        <div className="nav-item userArea mr-2">
                            <IconButton display="theme" selected={true} className="themeIcon mr-3" onClick={toggleTheme}>
                                <FontAwesomeIcon
                                    onMouseEnter={ () => console.log('Mouse enter')}
                                    onMouseLeave={ () => console.log('Mouse leave')}
                                    icon={[ theme === 'dark' ? 'fas' : 'fal', 'moon']} 
                                    size="2x" 
                                    /> 
                            </IconButton>
                            
                            <User />

                            <Navbar.Toggle aria-controls="dstrkNav" />
                        </div>
                    </div>
                    
                    <SearchForm />

                </Navbar>
                { 
                    isLoggedIn ? <TickerBar isSubscribed={false} isTrading={false} /> : null 
                }
            </Container>
        </SiteHeader>
    );
}