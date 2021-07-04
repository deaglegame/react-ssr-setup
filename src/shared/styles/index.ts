import styled from 'styled-components';  

/* Global */

export const Flex = styled.div`
    display: flex;
`;

/* // */

/* Header */

export const Header = styled.header`
    background: ${ props => props.theme.header.background};
    box-shadow: ${ props => props.theme.header.shadow};

    .navbar {
        border-bottom: ${ (props: any) => props.isLoggedIn ? '1px solid '+props.theme.pixelPopDark : '0' };
    }
`;

export const NavItem = styled.div`
    a {
        padding: 0.5rem 0.75rem;
        border-radius: .25rem;
        margin-right: 0.75rem;
        color: ${ (props: any) => props.selected ? props.theme.textActive : props.theme.text };
        border-bottom: 2px solid ${ (props: any) => props.selected ? props.theme.border : 'transparent' };
        &:hover {
            text-decoration: ${ (props: any) => props.selected ? 'none' : 'underline' };
            color: ${ (props: any) => props.selected ? props.theme.textActive : props.theme.text };
        }
    }
`;

    /* Ticker Container */

    export const TickerBarContainer = styled.div`
        border-top: 1px solid ${ props => props.theme.border };
        min-height: 35px;
        font-size: 0.8rem;
        display: flex;

        .controls {
            min-width: 175px;
            max-width: 175px;
            display: flex;
            align-items: center;
            padding-right: 0.5rem;
            border-right: 1px solid ${ props => props.theme.border };
            margin-right: 0.5rem;

            .optnTicker {
                &:focus {
                    outline: 0;
                    box-shadow: 0px 0px 0px transparent;
                }
            }

            .dropdown-toggle {
                background: none;
                border: 0px;
                font-size: 0.8rem;
                padding: 3px 6px;
                color: ${ props => props.theme.text };

                &:hover,
                &[aria-expanded="true"] {
                    background: ${ props => props.theme.darker };
                    color: ${ props => props.theme.text };
                }

                &:focus {
                    outline: 0;
                    box-shadow: 0px 0px 0px transparent;
                }
            }

            .dropdown-menu {
                background: ${ props => props.theme.darker };
                min-width: 8rem;
                transform: translate(0px, 21px) !important;
                border: none;

                .dropdown-divider {
                    border-top-color: ${ props => props.theme.border };
                }

                a {
                    color: ${ props => props.theme.text };
                    font-size: 0.8rem;
                    padding: 4px 10px;
                  
                    &:hover,
                    &:active {
                        background: ${ props => props.theme.darker };
                    }
                }
            }
  
            .dropdown-toggle::after {
                margin-left: .455em;
                vertical-align: 0.195em;
                color: $light;
            }
        }

        #update-ticker {
            font-family: ${ props => props.theme.fonts.varela };
            background: none;
            border: 0px;
            font-size: 0.8rem;
            padding: 4px 6px 3px 6px;
            color: $light;
        }

        #featured-list {
            overflow: hidden;
            width: 100%;
            margin: 0 0.5rem;
            white-space: nowrap;
            position: relative;
            display: flex;
            align-items: center;

            > div {
                width: 100%;
            }

            span.tickerDisplay {
                display: flex;
                font-size: 0.8rem;
                font-family: ${ props => props.theme.fonts.varela };
                padding-right: 25px;

                .svg-inline--fa {
                    vertical-align: text-top;
                    color: #e3c707;
                    opacity: 0.75;
                }

                .valueDisplay {
                    padding-left: 0.5rem;
                    font-family: monospace;
                    line-height: 1.1rem;

                    span.ticker > span {
                        position: relative;
                    }
                }
            }
        }

        .icon {
            vertical-align: -3px;
        }

        .marquee {
            overflow: hidden;
        }

        .marquee-container {
            height: auto !important;
        }

        .svg-inline--fa {
            vertical-align: -2px;
        }
    `;

    /* // */

/* // Header */

/* Watchlist */

export const EditWatchlistButton = styled.button`
    border: 1px solid transparent;
    margin-left: auto;
    background: transparent;
    color: ${ props => props.theme.text };
    box-shadow: ${ props => props.theme.shadow };
    position: relative;
    z-index: 9;
    height: 26px;
`;

export const TitleWatchlist = styled.div`
    display: flex;
    padding: 0.5rem 0.5rem 0.25rem 0.5rem;
    position: relative;
    z-index: 9;

    &.selected {
        background: #204B64;
        box-shadow: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
        box-shadow: 0 0 3px ${ props => props.theme.darker };
    }

    h2 {
        font-size: 1.2rem;
        padding: 0.6rem;
        margin-bottom: 0;
        line-height: 1rem;
    }

    #editWatchlist {
        font-size: 1.1rem;
        line-height: 1rem;
        margin-bottom: 0.2rem;
        padding: 3px 8px;
    }
`;

export const Notice = styled.button`
    position: absolute;
    top: 50%;
    margin-top: -25px;
    z-index: 99;
    border: 1px solid transparent;
    background: transparent;
    color: ${ props => props.theme.text };;
    padding: 0.75rem 1rem 0.75rem 3rem;
    width: 100%;
    margin-left: -4px;
    font-weight: 600;
    font-size: 0.85rem;
    text-align: center;
    border-radius: .25rem;
    display: block;

    .fa-sign-in-alt {
        font-size: 1.4rem;
        position: absolute;
        left: 1rem;
        top: 0.65rem;
    }

    &:hover {
        text-decoration: underline;
    }
`;

/* // Watchlist */

/* Item w/ Spark Chart */

export const WatchlistOptions = styled.div`
    overflow: hidden;
    max-height: ${ (props: any) => props.show ? '500px' : '0px' };
    transform: scale(1);
    transition: ${ (props: any) => props.show ? 'max-height 0.35s ease-in' : 'max-height 0s' };
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: ${ props => props.theme.watchlist.mode.edit };
    box-shadow: ${ props => props.theme.shadow.big };

    .optionsContainer {
        padding: 0.5rem;
        min-height: 200px;
        background: transparent !important;
    }

    .dropdown {
        flex-grow: 1;
        margin-right: 1rem;
        background: transparent !important;

        .dropdown-toggle::after {
            margin-left: 0.75rem;
        }
    }

    .btnDostrik {
        font-size: 1rem;
        background: none;
        padding: 0.35rem 1rem;
        width: 100%;
        text-align: left;
        font-family: 'Open Sans', sans-serif;
        box-shadow: ${ props => props.theme.shadow.small };

        &:hover {
            background: transparent;

        }
    }

`;

export const AddButton = styled.button`
    font-size: 0.8rem;
    font-family: 'Varela Round' sans-serif;
    border: 1px solid transparent;
    background: ${ (props: any) => props.selected ? props.theme.button.bgSelected : 'transparent' };
    border-bottom-color: ${ (props: any) => props.selected ? props.theme.button.borderSelected : 'transparent' };
    color: ${ (props: any) => props.selected ? props.theme.textActive : props.theme.text };
    margin-left: auto;
    padding: 0.1rem 0.55rem;
    border-radius: .25rem; 
    box-shadow: ${ props => props.theme.shadow.small };  

    svg {
        font-size: 20px;
    }
`;

export const LoggedOutOverlay = styled.div`
    position: relative;
    filter: blur(3px);
    opacity: 0.4;
`;


// do for others
type SparkItemType = {
    size?: string,
    border?: string,
    padding: string
};


export const SparkItem = styled.div<SparkItemType>`
    display: flex;
    align-items: center;
    font-family: ${ props => props.theme.fonts.varela};
    
    ${ (props) => {
        if( props.border ) {
            return (
                `border-radius: .25rem;
                box-shadow: ${ props.theme.shadow.small };  
                border: 1px solid ${ props.theme.border };
                padding: ${ props.padding ? props.padding : '0' };`
            )
        } else {
            return (
                `border-top: 1px solid ${props.theme.pixelPopLight};
                border-bottom: 1px solid ${props.theme.pixelPopDark};
                padding: 0.5rem 0.35rem 0.5rem 0;

                :first-child {
                    border-top: none;
                }

                :last-child {
                    border-bottom: none;
                }`
            )
        }
    }}

    & > * {
        flex: 1 1 0;
    }

    &.is-dragging {
        border-color: transparent;
    }
    
    .tickerDisplay {
        text-align: left;
        font-size: 0.9rem;
        padding: 0 0.5rem 0 0.25rem;
    }

    .valueDisplay {
        display: flex;
        flex-direction: column;
        text-align: right;
        font-size:${ (props: any) => props.size === 'small' ? '0.8rem' : '0.8rem' };
        padding-right: ${ (props: any) => props.size === 'small' || props.border ? '0' : '0.5rem' };
    }


`;

    /* Handle for watchlist ordering */

    export const Handle = styled.div`
        width: 30px;
        height: 30px;
        font-size: 1.5rem;
        margin: 0 0.25rem 0 0.5rem;
        color: ${ props => props.theme.handle };
        flex-grow: 0 !important;
    `;

    /* // Handle */

/* // Item */

/* News List */

export const NewsItem = styled.li`
    .media-body {
        box-shadow: 0px 1px 0px ${ props => props.theme.pixelPopLight }; 
        border-bottom: 1px solid ${ props => props.theme.pixelPopDark }; 
    }
`;

/* // */

/* Overview */

export const OverviewSidebar = styled.div`
    background: ${ props => props.theme.body };
`;

export const Table = styled.table`
    color: ${ props => props.theme.text };
`;

export const OverviewChartContainer = styled.div`
    position: relative;
    margin: 0 0 0.5rem 0;
    min-height: 265px;
    border-top-width: 0px;
`;

export const NewsMeta = styled.span`
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    padding: 2px 0
`;

export const NewsPrice = styled.span`
    padding: 2px 4px;
    background: ${ (props: any) => props.status === 'bullish' ? props.theme.bullish : props.theme.bearish };
    margin-right: 0.5rem;
`;

export const Title2 = styled.h2`
    font-size: 1.3rem;
    font-weight: ${ props => props.theme.fonts.varela };
    border-radius: .25rem;
    ${ (props: any) => props.border ? 'box-shadow: 0px 1px 0px '+props.pixelPopLight+'; border-bottom: 1px solid '+props.pixelPopDark+'; padding: 0 0 0.5rem 0.75rem;' : null }
`;

export const Title3 = styled.h3`
    font-size: 1.1rem;
    font-weight: 'Varela Round', sans-serif;
    border-radius: .25rem;
    ${ (props: any) => props.border ? 'box-shadow: 0px 1px 0px '+props.pixelPopLight+'; border-bottom: 1px solid '+props.pixelPopDark+'; padding: 0 0 0.5rem 0.75rem;' : null }
`;

export const Border = styled.div`
    border-radius: .25rem;
    box-shadow: 0px 1px 0px ${ props => props.theme.pixelPopDark };
    border: 1px solid ${ props => props.theme.border };
    padding: ${ (props: any) => props.padding ? props.padding : '0' };
`;

export const FeaturedList = styled.div`
    margin: 1rem 0;
    min-height: 54px;

    .bullish {
        color: ${ props => props.theme.bullish };
    }

    .bearish {
        color: ${ props => props.theme.bearish };
    }
`;

export const FeaturedItem = styled.div`
    
    font-family: ${ props => props.theme.fonts.varela };
    display: inline-block;

    a {
        font-weight: normal;
        display: flex;
        padding: 0.25rem 0.5rem 0.3rem 0.3rem;
        margin-right: 0.5rem;
        border-radius: .25rem;
        border: 1px solid ${ props => props.theme.pixelPopLight };

        &:hover {
            text-decoration: none;
        }
    }

    .sparklineContainer {
        position: relative;
        margin-right: 0.75rem;
        background: ${ props => props.theme.bgModal };
        border-radius-top-left: .25rem;
        border-radius-bottom-left: .25rem;
        padding: 5px;
    }

    .sparklineClose {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed ${ props => props.theme.lighter };
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const Icon = styled.div`
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin: 0 0.5rem 0 0.5rem;
    width: 30px;
    min-height: 46px;

    svg {
        font-size: 1.8rem;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
`;

export const InfoRow = styled.div`
    display: flex;
    padding-top: 0.25rem;
    justify-content: space-between;
    align-items: center;
`;

export const Symbol = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 0.25rem;
    white-space: nowrap;
`;

export const Price = styled.span`
    font-size: 0.8rem;
    margin-right: 1rem;
`;

export const Change = styled.span`
    font-size: 0.8rem;  
`;

export const TypeButtonContainer = styled.div`
`;

export const TypeButton = styled.button`
    font-size: 0.8rem;
    font-family: ${ props => props.theme.fonts.varela };
    border: 1px solid transparent;
    background: ${ (props: any) => props.selected ? props.theme.button.bgSelected : 'transparent' };
    border-bottom-color: ${ (props: any) => props.selected ? props.theme.button.borderSelected : 'transparent' };
    color: ${ (props: any) => props.selected ? props.theme.textActive : props.theme.text };
    margin-left: 3px;
    padding: 0.2rem 0.4rem;
    border-radius: .25rem; 
`;

export const Options = styled.div`
    display: flex;
    padding: 0.5rem 0 0.5rem 0.75rem;
    justify-content: space-between;
`;

export const TagCloudList = styled.ul`
    padding-left: 0;

    li {
        list-style: none;
        font-family: ${ props => props.theme.fonts.varela };
        display: inline-block;

        a {
            display: inline-block;
            border-radius: .25rem;
            margin-right: 5px;
            padding: 0 6px;
            font-weight: normal;
            font-size: 0.8rem;
            -webkit-text-decoration: none;
            text-decoration: none;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 230px;
            height: 1.3rem;
            white-space: nowrap;
            border-bottom: 1px solid ${ props => props.theme.button.borderSelected }; 

            &:hover {
                border-color: #F9F871;
                color: #F8F8F8;
            }
        }
    }
`;


    /* Ticker Header */

    export const TickerHeader = styled.div`
        padding: 1rem;
        position: relative;
        z-index: 99;
        border-radius: .25rem;
        box-shadow: 0px 1px 0px ${ props => props.theme.border };
        border-bottom: 1px solid ${ props => props.theme.pixelPopDark };
    `;
    

    export const LoadingText = styled.div`
        width: 100px;
        height: 1em;
        background: rgba( 255,255,255, 0.1 );
    `;

    export const PriceContainer = styled.div`
        display: flex;
        align-items: center;
    `;

    /* // */

/* // Overview */


export const MarketStatusBlob = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;

    &:after {
        content: '';
        background: ${ (props: any) => ( props.color === 'green' ) ? props.theme.marketIndicator.live : ( ( props.color === 'red' ) ? props.theme.marketIndicator.trading : props.theme.marketIndicator.offline ) };
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
        margin: 0px;
        height: 10px;
        width: 10px;
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
        animation: ${ (props: any) => props.isTrading ? 'pulse-'+props.color+' 2s infinite' : 'none' };
    }

    @keyframes pulse-red {
        0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
        }
        
        70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
        }
        
        100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
        }
    }
    
    .blob.green {
        background: rgba(51, 217, 178, 1);
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
        animation: pulse-green 2s infinite;
    }
    
    @keyframes pulse-green {
        0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
        }
        
        70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
        }
        
        100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
        }
    }
    
`;

/* // Blob */


/* News */

export const NewsContainer = styled.div`

`;

export const SaveButton = styled.button`
    padding: 0 4px;
    background: transparent;
    color: #eaeaea;
    border: 1px solid transparent;
    font-size: 1.2rem
`;

// improve props

//color: ${ (props) => props.selected ? props.theme.button.icon[props.display].selected : props.theme.button.icon[props.display].color };
//font-size: ${ (props) => props.display === 'theme' ? '2rem' : '2.5rem' };

export const IconButton = styled.button<any>`
    background: none;
    color: #fff;
    border: 0;
    border: none;
    padding: 3px 2px;

    .svg-inline--fa {
        color: ${ (props) => props.selected ? props.theme.button.icon[props.display].selected : props.theme.button.icon[props.display].color };
        font-size: ${ (props) => props.display === 'theme' ? '2rem' : '2.5rem' };
    }

    &:active,
    &:focus {
        box-shadow: none;
        outline: none;
        background-color: transparent !important;
        border-color: transparent !important;
    }

    &:hover {
        box-shadow: none;
        outline: none;

        .svg-inline--fa {
            color: ${ (props: any) => !props.selected ? props.theme.button.icon[props.display].selected : props.theme.button.icon[props.display].color };
        }
    }
`;

/* Card */

export const Card = styled.div`
    background: transparent;
    border: 0;
    
    * {
        border-color: ${ props => props.theme.border } !important;
    }

    &.overview-card {
        border: 1px solid ${ props => props.theme.border };
        font-size: 0.9rem;

        .card-header {
            padding: 0.75rem;
            background: none;
        }

        .table {
            margin-bottom: 0;
        }

        .table-sm td, .table-sm th {
            padding: .3rem 0.75rem;
        }
    }

    .table {
        th.section-heading {
            background: ${ props => props.theme.border };
        }
    }

    .period-switcher {
        border: 0px;

        .tab-container {
            border: 0px;
            background: ${ props => props.theme.border };
            border-radius: .25rem;
            padding: 4px;

            ul {
                border: 0;
            }

            .nav-item {

                a.nav-link {
                    padding: 0.3rem 0.5rem 0.25rem;
                    font-size: 0.9rem;
                    border-radius: .25rem;
                    border-color: transparent !important;
                    color: #eaeaea;

                    &.active {
                        background: #1A606F;
                        color: #ffffff;
                    }
                }

                &:first-child {
                    margin-right: 3px;
                }
            }
        }
    }
`;

/* // */

/* Tabs */

export const OverviewTabs = styled.div`

`;

export const TabsHeader = styled.div`
    display: flex;
    justify-content: left;

    a {
        color: ${ props => props.theme.text };
        display: block;
        padding: 0.5rem 1.5rem;
        border-top-left-radius: .25rem;
        border-top-right-radius: .25rem;
        border: 1px solid ${ props => props.theme.body };
        border-bottom: 0;
        font-weight: normal;
        cursor: pointer;
        background-color: ${ props => props.theme.border };
    
        &:hover {
            text-decoration: none;
        }
    }
    
    a.active {
        border-color: ${ props => props.theme.border };
        background-color: ${ props => props.theme.body };
        margin-bottom: -1px;
    }
`;

export const TabsContent = styled.div`
    background-color: ${ props => props.theme.body };

    > div {
        border-top-left-radius: 0;
    }

    .content {
        display: flex;
        flex-direction: row;
    }
`;


/* // */