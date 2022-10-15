import { Button, Input, InputGroup, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useTypedDispatch, useTypedSelector } from "../Redux";
import { addTodo } from "../Redux/todo/actions";

const TodoInput = () => {
	const [text, setText] = useState<string>("");
	const handleUpdate = (newText: string): void => {
		setText(newText);
	};

	const inputRef: {
		current: HTMLInputElement | null;
	} = useRef(null);

	const buttonRef: {
		current: HTMLButtonElement | null;
	} = useRef(null);

	const {
		post: { isLoading },
	} = useTypedSelector((state) => state.todos);

	const dispatch = useTypedDispatch();

	const toast = useToast({
		title: "Error!",
		description: "Task cannot be empty :/",
		duration: 2500,
		isClosable: true,
		status: "error",
	});

	return (
		<InputGroup>
			<Input
				color={"white"}
				ref={inputRef}
				type="text"
				placeholder="Enter your task"
				value={text}
				onChange={(e) => {
					handleUpdate(e.currentTarget.value);
				}}
			/>
			<Button
				colorScheme={"pink"}
				disabled={isLoading ? true : false}
				ref={buttonRef}
				onClick={() => {
					// handleAdd();
					if (text === "") {
						toast();
						return;
					}
					dispatch(
						addTodo({
							title: text,
							status: false,
						})
					);
					buttonRef.current?.blur();
					setText("");
				}}>
				Add
			</Button>
		</InputGroup>
	);
};

export default TodoInput;
