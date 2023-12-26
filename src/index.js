// index.js
import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import firebaseWonkaApp from "../src/util/firebaseWonkaApp";
if (!firebaseWonkaApp) {
  console.log("firebaseWonkaApp.apps.length === 0");
}

const root = createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
);

reportWebVitals();
