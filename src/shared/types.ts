export type NewsListType = {
    title: string,
    link: string,
    source: string,
    categories: Array<string>,
    pubDate: string,
    isoDate: string
};

export type UserType = {
    isLoggedIn: boolean,
    isLoading: boolean,
    info: {
        id: number,
        username: string,
        lastLogin: number,
    },
    error: string
};

export type LiveDataType = {
    id: number,
    symbol: string,
    price: string,
    changePercent: string,
    ticker: string,
    name: string,
    changePrice: string,
    previousClose: string | number,
    previousDate: string,
};

export type FeaturedType = {
    list: Array<LiveDataType>,
    isLoaded: boolean,
};