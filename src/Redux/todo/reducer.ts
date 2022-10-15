import { action } from "./actions";
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

export type todoItem = {
	title: string;
	status: boolean;
	id?: number;
};

type todos = todoItem[];

type actionState = {
	isLoading: boolean;
	isError: boolean;
};

export type todosStateSkeleton = {
	todos: todos;
	get: actionState;
	post: actionState;
	update: actionState;
	delete: actionState;
};

const initialData: todosStateSkeleton = {
	todos: [],
	get: {
		isLoading: false,
		isError: false,
	},
	post: {
		isLoading: false,
		isError: false,
	},
	update: {
		isLoading: false,
		isError: false,
	},
	delete: {
		isLoading: false,
		isError: false,
	},
};

export const todosReducer = (
	state = initialData,
	{ payload, type }: action
) => {
	switch (type) {
		case GET_TODOS_LOADING: {
			return {
				...state,
				get: {
					isLoading: true,
					isError: false,
				},
			};
		}
		case GET_TODOS_ERROR: {
			return {
				...state,
				get: {
					isLoading: false,
					isError: true,
				},
			};
		}
		case GET_TODOS_SUCCESS: {
			return {
				...state,
				todos: payload,
				get: {
					isLoading: false,
					isError: false,
				},
			};
		}
		case PATCH_TODOS_LOADING: {
			console.log("updating todo");
			return {
				...state,
				update: {
					isLoading: true,
					isError: false,
				},
			};
		}
		case PATCH_TODOS_ERROR: {
			console.log("some error occured while updating todo");
			return {
				...state,
				update: {
					isLoading: false,
					isError: true,
				},
			};
		}
		case PATCH_TODOS_SUCCESS: {
			console.log("Update successfull");
			return {
				...state,
				update: {
					isLoading: false,
					isError: false,
				},
			};
		}
		case DELETE_TODOS_LOADING: {
			console.log("deleting todo");
			return {
				...state,
				delete: {
					isLoading: true,
					isError: false,
				},
			};
		}
		case DELETE_TODOS_ERROR: {
			console.log("some error occured while deleting todo");
			return {
				...state,
				delete: {
					isLoading: false,
					isError: true,
				},
			};
		}
		case DELETE_TODOS_SUCCESS: {
			console.log("Delete successfull");
			return {
				...state,
				delete: {
					isLoading: false,
					isError: false,
				},
			};
		}
		case POST_TODOS_LOADING: {
			console.log("add todo");
			return {
				...state,
				post: {
					isLoading: true,
					isError: false,
				},
			};
		}
		case POST_TODOS_ERROR: {
			console.log("some error occured while adding todo");
			return {
				...state,
				post: {
					isLoading: false,
					isError: true,
				},
			};
		}
		case POST_TODOS_SUCCESS: {
			console.log("Added successfull");
			return {
				...state,
				post: {
					isLoading: false,
					isError: false,
				},
			};
		}
		default: {
			return state;
		}
	}
};
