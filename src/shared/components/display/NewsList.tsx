import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NewsListType } from '../../types';

export function NewsList( props: NewsListProps ): JSX.Element {
    return <div>News list</div>
}

type NewsListProps = {
    list: Array<NewsListType>, 
    isLoaded: boolean, 
    type: string, 
    display: string
}