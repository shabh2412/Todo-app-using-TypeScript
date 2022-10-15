import { Box, Heading, Stack } from "@chakra-ui/react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todos = () => {
	return (
		<Stack textAlign="center" gap="10px">
			<Heading color={"hotpink"}>Todos</Heading>
			<TodoInput />
			<TodoList />
		</Stack>
	);
};

export default Todos;
