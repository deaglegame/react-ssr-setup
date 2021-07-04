// import React, { Suspense } from 'react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ActiveTheme } from './styles/Themes';
import { GlobalStyles } from './styles/GlobalStyles';
import { Container } from 'react-bootstrap';

/* Font Awesome Icons */
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { 
    faPlay, faPause, faCog, 
    faCircleNotch, faStar, faBell,
    faSort, faSave, faCaretUp, faCaretDown,
    faGripVertical, faHome, faMoon as fasMoon 
} from '@fortawesome/free-solid-svg-icons'
import { 
    faAngleUp, faAngleDoubleUp, faAngleDown, 
    faAngleDoubleDown, faStar as falStar, 
    faPlus, faMinus, faTimes, faAnalytics, faBell as falBell,
    faMoon as falMoon
} from '@fortawesome/pro-light-svg-icons';
import { 
    faSignInAlt, faChevronUp, faChevronDown, faHandSpock, faAsterisk 
} from '@fortawesome/pro-regular-svg-icons';
/* // Font Awesome Icons */

import favicon from '../shared/assets/favicon.png';
import { Home } from './pages/Home';
import Page1 from './pages/Page-1';
import Page2 from './pages/Page-2';
import Symbol from './pages/Symbol';
import { Header } from './components/layout/Header';
import routes from './routes';
//import css from './App.module.css';

// temp
const home = {
    user: {
        isLoggedIn: false,
        isLoading: false,
        info: {
            id: 1,
            username: 'deagle',
            lastLogin: 100000000,
        },
        error: ''
    },
    news: {
        isLoaded: false,
        source: '',
        list: [],
    },
    blogs: {
        isLoaded: false,
        source: '',
        list: [],
    },
    featuredList: {
        list: [],
        isLoaded: false
    }
};

function App(): JSX.Element {
    const { t } = useTranslation();

    registerIcons();

    return (
        // <Suspense fallback={<div>Loading</div>}>
        <ThemeProvider theme={ActiveTheme}>
            <>
                <GlobalStyles />
                    <Helmet
                        defaultTitle="dostrik"
                        titleTemplate="%s – dostrik"
                        link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
                    />
                    <Header theme="dark" />
                    <main>
                        <Container>
                            <Switch>
                                <Route exact path={routes.home} component={ () => <Home {...home} /> } />
                                <Route exact path={routes.page1} component={Page1} />
                                <Route exact path={routes.page2} component={Page2} />
                                <Route exact path={routes.symbol} component={Symbol} />
                                <Route render={() => '404!'} />
                            </Switch>
                            <h2>{t('router-headline')}</h2>
                            <ul>
                                <li>
                                    <Link to="/">{t('nav.home')}</Link>
                                </li>
                                <li>
                                    <Link to="/page-1">{t('nav.page-1')}</Link>
                                </li>
                                <li>
                                    <Link to="/page-2">{t('nav.page-2')}</Link>
                                </li>
                                <li>
                                    <Link to="/symbol/TEST">Test Symbol</Link>
                                </li>
                            </ul>
                        </Container>
                    </main>
            </>
        </ThemeProvider>

        // </Suspense>
    );
};

function registerIcons():void {
    library.add( 
        faPlay, faPause, faCog, faCircleNotch, faAngleUp, faAngleDoubleUp, faAngleDown, faAngleDoubleDown, faStar, falStar, faPlus, faMinus, faPlus, faTimes, faSort, faSave, faCaretUp,
        faCaretDown, faGripVertical, faHome, faSignInAlt, faChevronUp, faChevronDown, faHandSpock, faAnalytics, faBell, falBell, faAsterisk, fasMoon, falMoon
    );
}

export default App;
