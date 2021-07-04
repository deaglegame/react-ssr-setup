import styled from 'styled-components';

/* Header */

export const SiteHeader = styled.header<{ isLoggedIn: boolean }>`
    background: ${ props => props.theme.header.background};
    box-shadow: ${ props => props.theme.header.shadow};

    .navbar {
        border-bottom: ${ props => props.isLoggedIn ? '1px solid '+props.theme.pixelPopDark : '0' };
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

    export const TickerContainer = styled.div`
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



    export const LiveIndicator = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;

    &:after {
        content: '';
        background: ${ props => ( props.color === 'green' ) ? props.theme.marketIndicator.live : ( ( props.color === 'red' ) ? props.theme.marketIndicator.trading : props.theme.marketIndicator.offline ) };
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

/* // Header */