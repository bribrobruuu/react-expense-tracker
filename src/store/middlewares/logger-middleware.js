import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
	addExpenseAction,
	setIncomeAction,
	incrementActionPerformed,
} from 'store/expense/expense-slice';

export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
	matcher: isAnyOf(setIncomeAction, addExpenseAction),
	effect: async (action, listenerAPI) => {
		console.log('Action', action);
		console.log('New store value', listenerAPI.getState());
		listenerAPI.dispatch(incrementActionPerformed());
	},
});
