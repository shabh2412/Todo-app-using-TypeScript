import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTypedDispatch, useTypedSelector } from "../Redux";
import { getTodos } from "../Redux/todo/actions";
import { todoItem, todosStateSkeleton } from "../Redux/todo/reducer";
import TodoItem from "./TodoItem";
import "./TodoList.css";

// type Props = {
// 	todos?: todoItem[];
// 	updateTodo?: Function;
// 	deleteTodo?: Function;
// };

const TodoList = () => {
	const {
		todos,
		get: { isLoading },
		update: { isLoading: isUpdating },
		delete: { isLoading: isDeleting },
		post: { isLoading: isAdding },
	} = useTypedSelector<todosStateSkeleton>((state) => state.todos);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(getTodos());
	}, []);
	useEffect(() => {
		console.log(todos);
	}, [todos]);
	return (
		<Box color={"white"}>
			{isUpdating && (
				<Box>
					<Text>Updating Task...</Text>
				</Box>
			)}
			{isLoading && (
				<Box>
					<Text>Loading Tasks...</Text>
				</Box>
			)}
			{isDeleting && (
				<Box>
					<Text>Deleting the task...</Text>
				</Box>
			)}
			{isAdding && (
				<Box>
					<Text>Adding new task...</Text>
				</Box>
			)}
			{todos?.map((item: todoItem) => (
				<TodoItem key={item.id} item={item} />
			))}
		</Box>
	);
};

export default TodoList;
