// import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
// import "./index.css";
import { store } from "./Redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<div>
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	</div>
);
