import { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
function App() {
	const [text, setText] = useState("");

	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<h1></h1>} />
			</Routes>
		</div>
	);
}

export default App;
