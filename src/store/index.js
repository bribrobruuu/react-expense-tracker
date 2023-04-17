import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { expenseSlice } from './expense/expense-slice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middlewares/logger-middleware';

const rootReducer = combineReducers({
	EXPENSE: expenseSlice.reducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['EXPENSE'],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).prepend(loggerMiddleware.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
