import axios, { Axios, AxiosResponse } from "axios";
import { AnyAction, Dispatch } from "redux";
import { todoItem } from "./reducer";
import {
	DELETE_TODOS_ERROR,
	DELETE_TODOS_LOADING,
	DELETE_TODOS_SUCCESS,
	GET_TODOS_ERROR,
	GET_TODOS_LOADING,
	GET_TODOS_SUCCESS,
	PATCH_TODOS_ERROR,
	PATCH_TODOS_LOADING,
	PATCH_TODOS_SUCCESS,
	POST_TODOS_ERROR,
	POST_TODOS_LOADING,
	POST_TODOS_SUCCESS,
} from "./types";

export type action = {
	type: string;
	payload?: todoItem | todoItem[];
};

const getTodosLoading = (): action => ({
	type: GET_TODOS_LOADING,
});
const getTodosError = (): action => ({
	type: GET_TODOS_ERROR,
});
const getTodosSuccess = (payload: todoItem[]): action => ({
	type: GET_TODOS_SUCCESS,
	payload: payload,
});

export const url = `https://rishabh-mock-server.herokuapp.com/todos`;

const fetchData = async () => {
	let res = await axios.get<todoItem[]>(url);
	return res.data;
};

export const getTodos = () => (dispatch: Dispatch<AnyAction>) => {
	dispatch(getTodosLoading());
	try {
		fetchData().then((res) => {
			// console.log(res);
			const getTodosSuccessAction = getTodosSuccess(res);
			dispatch(getTodosSuccessAction);
		});
	} catch (error) {
		dispatch(getTodosError());
	}
};

const updateTodosLoading = (): action => ({
	type: PATCH_TODOS_LOADING,
});
const updateTodosError = (): action => ({
	type: PATCH_TODOS_ERROR,
});
const updateTodosSuccess = (): action => ({
	type: PATCH_TODOS_SUCCESS,
});

const updateData = async (item: todoItem) => {
	let res = await axios.patch<todoItem>(`${url}/${item.id}`, {
		...item,
		status: !item.status,
	});
	return res.data;
};

export const updateTodo =
	(payload: todoItem) => (dispatch: Dispatch<AnyAction>) => {
		dispatch(updateTodosLoading());
		try {
			updateData(payload).then(() => {
				const updateTodosSuccessAction = updateTodosSuccess();
				dispatch(updateTodosSuccessAction);
				dispatch(getTodosLoading());
				fetchData().then((res) => {
					const getTodosSuccessAction = getTodosSuccess(res);
					dispatch(getTodosSuccessAction);
				});
			});
		} catch (error) {
			dispatch(updateTodosError());
		}
	};

const deleteTodosLoading = (): action => ({
	type: DELETE_TODOS_LOADING,
});
const deleteTodosError = (): action => ({
	type: DELETE_TODOS_ERROR,
});
const deleteTodosSuccess = (): action => ({
	type: DELETE_TODOS_SUCCESS,
});

const deleteData = async (item: todoItem) => {
	let res = await axios.delete<todoItem>(`${url}/${item.id}`);
	return res.status;
};

export const deleteTodo =
	(payload: todoItem) => (dispatch: Dispatch<AnyAction>) => {
		dispatch(deleteTodosLoading());
		try {
			deleteData(payload).then(() => {
				const deleteTodosSuccessAction = deleteTodosSuccess();
				dispatch(deleteTodosSuccessAction);
				dispatch(getTodosLoading());
				fetchData().then((res) => {
					const getTodosSuccessAction = getTodosSuccess(res);
					dispatch(getTodosSuccessAction);
				});
			});
		} catch (error) {
			dispatch(deleteTodosError());
		}
	};

const addTodosLoading = (): action => ({
	type: POST_TODOS_LOADING,
});
const addTodosError = (): action => ({
	type: POST_TODOS_ERROR,
});
const addTodosSuccess = (): action => ({
	type: POST_TODOS_SUCCESS,
});

const postData = async (item: todoItem) => {
	let res = await axios.post<todoItem>(`${url}`, item);
	return res.data;
};

export const addTodo =
	(payload: todoItem) => (dispatch: Dispatch<AnyAction>) => {
		dispatch(addTodosLoading());
		try {
			postData(payload).then(() => {
				const addTodosSuccessAction = addTodosSuccess();
				dispatch(addTodosSuccessAction);
				dispatch(getTodosLoading());
				fetchData().then((res) => {
					const getTodosSuccessAction = getTodosSuccess(res);
					dispatch(getTodosSuccessAction);
				});
			});
		} catch (error) {
			dispatch(addTodosError());
		}
	};
