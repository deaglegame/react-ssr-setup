import React, { useCallback } from 'react';

/*
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Features from 'shared/components/Features';
import { setLocale } from 'store/app/actions';
import { Locale } from 'store/app/types';
*/

import { Container, Row, Col } from 'react-bootstrap';
import { UserType, NewsListType, FeaturedType } from '../../types';
import { Sidebar } from '../../components/layout/Sidebars';
import { LoggedOutMessage } from '../../components/display/LoggedOutMessage';
import { Loading } from '../../components/display/Loading';
import { Featured } from '../../components/display/Featured';
import { NewsList } from '../../components/display/NewsList';

type Props = {
    user: UserType,
    news: {
        isLoaded: boolean,
        source: string,
        list: Array<NewsListType>,
    },
    blogs: {
        isLoaded: boolean,
        source: string,
        list: Array<NewsListType>,
    },
    featuredList: FeaturedType
};

export function Home( props: Props ): JSX.Element {
    return (
        <Container>
            <Row className={!props.user.isLoggedIn?"mt-4":""}>
                <Col>
                    {
                        props.user.isLoggedIn ?
                            <Featured list={props.featuredList.list} isLoaded={props.featuredList.isLoaded } /> : 
                            <LoggedOutMessage />
                    }
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md="9">
                    <Row>
                        <Col md="6">
                            { !props.news.isLoaded ?
                                <Loading /> :
                                <NewsList list={props.news.list}  isLoaded={props.news.isLoaded} type="NEWS" display="HOME" />
                            }
                        </Col>
                        <Col md="6">
                            { !props.blogs.isLoaded ?
                                <Loading /> :
                                <NewsList list={props.blogs.list} isLoaded={props.blogs.isLoaded}type="BLOGS" display="HOME" />
                            }
                        </Col>
                    </Row>
                </Col>
                <Col md="3">
                    <Sidebar isLoggedIn={props.user.isLoggedIn} component="SIDEBAR" />
                </Col>
            </Row>
        </Container>
    )
};

/*
const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
        },
        [dispatch]
    );

    return (
        <React.Fragment>
            <Features />
            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
        </React.Fragment>
    );
};

export default App;
*/