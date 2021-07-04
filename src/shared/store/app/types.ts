export type Locale = 'en_US' | 'de_DE';

export type Action = {
    type: string;
    payload: any;
};

// Action Types

    // Settings
    export type Page = {
        page: string,
        symbol?: string | undefined
    };

    export type Notification = {
        title: string,
        message: string,
        type: string,
        delay: number,
        callback?: Function | undefined
    };

    // User
    export type User = {
        username: string,
        password: string,
    };



// State Types

    // App (temp?)
    export type AppState = Readonly<{
        locale: Locale;
    }>;

    // Settings
    export type SettingsState = Readonly<{
        theme: string,
        ticker: {
            isLoaded: boolean,
            status: string,
            display: string,
            selected: {
            key: string,
            name: string
            }
        },
        watchlist: {
            isLoaded: Boolean,
            display: string,
            selected: {
                key: string,
                name: string
            }
        },
        trending: {
            isLoaded: boolean
        },
        featured: {
            isLoaded: boolean
        },
        country: string,
        current: {
            page: string, // Home, Cryptos, Stocks, ... better way to define? included in array?
            symbol: string
        },
        notification: {
            title: string,
            message: string,
            type: string,
            delay: number,
            callback: Function
        },
        error: string
    }>;


    // User
    export type UserState = Readonly<{
        isLoggedIn: Boolean,
        isLoading: Boolean,
        isPosting: Boolean,
        info: {
            id: number,
            username: string,
            lastLogin: number
        },
        error: string
    }>;

    export type UserLoginType = {
        username: string | null,
        password: string | null
    };

    export type HandleLoginType = {
        handleLogin( e: React.FormEvent ): void;
    };

    export type HandleRegisterType = {
        handleRegister( e: React.FormEvent ): void;
    };