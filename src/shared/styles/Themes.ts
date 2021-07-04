export type ThemeType = typeof lightTheme;

export const lightTheme = {
    body: '#F8F8F8',
    text: '#363537',
    textActive: '#363537',
    toggleBorder: '#6B8096',
    background: '#999',
    border: '#E1E1E1',

    bullish: 'rgb(86, 183, 112)',
    bearish: 'rgb(245, 132, 117)',

    light: '#CCCCCC',
    lighter: 'rgba( 255,255,255, 0.1 )',
    lightest: '#F0F0F1',
    dark: 'rgba( 0,0,0, 0.2 )',
    darker: '#E1E1E1',
    bgModal: '#EAEAEA',
    pixelPopDark: 'transparent',
    pixelPopLight: '#E1E1E1',
    shadow: {
        small: '0px 1px 1px rgba(0,0,0, 0.5)',
        big: '0px 3px 8px rgba(0,0,0, 0.5)',
    },
    //border-tooltip: '#4F6270',
    header: {
        background: 'transparent',
        shadow: '0px 1px 3px rgba(0,0,0, 0.2)'
    },
    fonts: {
        varela: '\'Varela Round\', sans-serif',
        openSans: '\'Open Sans\', sans-serif',
        number: '\'Source Code Pro\', sans-serif'
    },
    handle: 'rgba( 0,0,0, 0.2 )',
    button: {
        bgSelected: 'rgba( 0,0,0, 0.05 )',
        borderSelected: '#00A2FF',
        icon: {
            watching: {
                color: '#4F6270',
                selected: '#e3c707',
            },
            alert: {
                color: '#4F6270',
                selected: '#00C6B1',
            },
            theme: {
                color: '#CCCCCC',
                selected: '#CCCCCC',
            },
        }
    },
    watchlist: {
        mode: {
            normal: 'transparent',
            edit: '#325f79'
        }
    },
    marketIndicator: {
        live: 'rgba(51, 217, 178, 1)',
        trading: 'rgba(255, 82, 82, 1)',
        offline: '#64707A'
    }
}

export const darkTheme: ThemeType = {
    body: '#141f27',
    text: '#ABB8C3',
    textActive: '#F8F8F8',
    toggleBorder: '#6B8096',
    background: '#999',
    border: '#1e2f3c',

    bullish: 'rgb(86, 183, 112)',
    bearish: 'rgb(245, 132, 117)',

    light: '#CCCCCC',
    lighter: 'rgba( 255,255,255, 0.1 )',
    lightest: '#F0F0F1',
    dark: 'rgba( 0,0,0, 0.2 )',
    darker: '#10191f',
    bgModal: '#1a2831',
    pixelPopDark: '#0d1419',
    pixelPopLight: '#1e2f3c',
    shadow: {
        small: '0px 1px 1px rgba(0,0,0, 0.5)',
        big: '0px 3px 8px rgba(0,0,0, 0.5)',
    },
    //border-tooltip: '#4F6270',
    header: {
        background: 'rgba( 0,0,0, 0.2 )',
        shadow: '0px 1px 3px rgba(0,0,0, 0.2)'
    },
    fonts: {
        varela: '\'Varela Round\', sans-serif',
        openSans: '\'Open Sans\', sans-serif',
        number: '\'Source Code Pro\', sans-serif'
    },
    handle: 'rgba( 255,255,255, 0.2 )',
    button: {
        bgSelected: 'rgba( 255,255,255, 0.05 )',
        borderSelected: '#00A2FF',
        icon: {
            watching: {
                color: '#4F6270',
                selected: '#e3c707',
            },
            alert: {
                color: '#4F6270',
                selected: '#00C6B1',
            },
            theme: {
                color: '#e7e698',
                selected: '#e7e698',
            },
        }
    },
    watchlist: {
        mode: {
            normal: 'transparent',
            edit: '#325f79'
        }
    },
    marketIndicator: {
        live: 'rgba(51, 217, 178, 1)',
        trading: 'rgba(255, 82, 82, 1)',
        offline: '#64707A'
    }
}

export const ActiveTheme = darkTheme;