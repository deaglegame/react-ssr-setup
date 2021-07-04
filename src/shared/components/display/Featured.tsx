import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LiveDataType } from '../../types';

export function Featured( props: FeaturedProps ): JSX.Element {
    return <div>Featured</div>
}

type FeaturedProps = {
    list: Array<LiveDataType>, 
    isLoaded: boolean
}