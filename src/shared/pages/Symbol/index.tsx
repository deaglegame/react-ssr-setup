import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface MatchParams {
    symbol: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Page = ( props: Props ) => {
    const symbol = props.match.params.symbol;
    return <div>Symbol: {symbol}</div>;
}

export default Page;
