import { Box, Container } from "@chakra-ui/react";
// import "./App.css";
import Todos from "./components/Todos";

function App() {
	return (
		<Box h={"100vh"} bgColor={"blackAlpha.900"} display="flex" justifyContent="center" alignItems="center">
			<Container className="App">
				<Todos />
			</Container>
		</Box>
	);
}

export default App;
