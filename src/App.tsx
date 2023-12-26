// App.js

import React, { useState } from "react";
import "./App.scss";
import Image from "./asset/worldcup.jpg";
const LazyLoadComponent = React.lazy(() => import("./LazyLoadComponent"));

const App = () => {
	const [showWinner, setShowWinner] = useState(false);

	return (
		<div className="container">
			<div className="header">
				<h1>Welcome to the Cricket World Cup 2023!!</h1>
			</div>
			<div className="image-container">
				<img
					src={Image}
					alt="Cricket World Cup"
					style={{ height: 500 }}
				/>
			</div>
			<div className="button-container">
				<button onClick={() => setShowWinner(true)}>
					Reveal the Winner
				</button>
				{showWinner && <LazyLoadComponent />}
			</div>
		</div>
	);
};

export default App;
