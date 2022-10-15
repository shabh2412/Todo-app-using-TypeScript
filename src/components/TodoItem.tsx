import { Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedDispatch } from "../Redux";
import { deleteTodo, updateTodo } from "../Redux/todo/actions";
import { todoItem } from "../Redux/todo/reducer";

type Props = {
	item: todoItem;
	updateTodo?: Function;
	deleteTodo?: Function;
};

const TodoItem = ({ item }: Props) => {
	const [title, setTitle] = useState(item.title);
	const dispatch = useTypedDispatch();
	const ref: {
		current: null | HTMLInputElement;
	} = useRef(null);
	return (
		<div className="todoItem">
			<div
				style={{
					display: "flex",
				}}>
				<Input
					borderRadius="0"
					ref={ref}
					type="text"
					style={{
						border: "0",
						borderBottom: "1px solid",
						backgroundColor: "transparent",
						padding: "10px",
					}}
					value={title}
					onChange={(e) => {
						setTitle(e.currentTarget.value);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Enter") {
							dispatch(updateTodo({ ...item, title, status: !item.status }));
							if (ref.current) {
								ref.current.blur();
							}
						}
					}}
				/>
			</div>
			<Button
				colorScheme={"red"}
				variant="outline"
				onClick={() => {
					dispatch(deleteTodo(item));
				}}>
				Delete
			</Button>
			<Flex justifyContent="center" alignItems="center">
				<Text mb="0">{item.status ? "Completed" : "Pending"}</Text>
			</Flex>
			<Flex alignItems="center" justifyContent="center">
				<Checkbox
					type="checkbox"
					style={{
						width: "fit-content",
					}}
					name={`status${item.id}`}
					isChecked={item.status ? true : false}
					onChange={() => {
						dispatch(updateTodo(item));
					}}
				/>
			</Flex>
		</div>
	);
};

export default TodoItem;
