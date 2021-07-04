//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './rootReducer';
import { rootSaga } from "./app/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

type StoreParams = {
    initialState?: { [key: string]: any };
    middleware?: any[];
};

export const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;
    const middlewares = [ sagaMiddleware ];

    const store = createStore(
        createRootReducer(),
        initialState,
        //composeEnhancers(applyMiddleware(...[sagaMiddleware].concat(...middleware)))
        composeEnhancers(applyMiddleware( ...middlewares ))
    );

    sagaMiddleware.run( rootSaga );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./rootReducer', () =>
                store.replaceReducer(require('./rootReducer').default)
            );
        }
    }

    return store;
};

export default configureStore;
