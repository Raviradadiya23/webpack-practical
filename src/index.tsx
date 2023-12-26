import React, { Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("app");
if (container) {
	const root = ReactDOM.createRoot(container);

	root.render(
		<Suspense fallback={<div>Loading...</div>}>
			<App />
		</Suspense>
	);
} else {
	console.error("Container element not found!");
}
