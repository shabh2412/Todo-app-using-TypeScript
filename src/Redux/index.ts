// import {
// 	applyMiddleware,
// 	combineReducers,
// 	compose,
// 	legacy_createStore,
// } from "redux";
// import thunk from "redux-thunk";
// import { todosReducer } from "./todo/reducer";

// const reducers = combineReducers({
// 	todos: todosReducer,
// });

// const composeEnhancer = compose;

// const middlewares = applyMiddleware(thunk);

// const enhancer = composeEnhancer(middlewares);

// export const store = legacy_createStore(reducers, enhancer);

/* Core */
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
	legacy_createStore,
	applyMiddleware,
	AnyAction,
	combineReducers,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

/* Instruments */
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { todosReducer } from "./todo/reducer";

const rootReducer = combineReducers({
	todos: todosReducer,
});

/* Store */
export const store = legacy_createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
