import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import App from "./App";
import "./style.css";
import { StrictMode } from "react";

// Accept normal OAuth redirects as well as links using the hash router.
if (
  ["/login", "/callback"].includes(window.location.pathname) &&
  !window.location.hash
) {
  window.history.replaceState(
    null,
    "",
    `/#${window.location.pathname}${window.location.search}`,
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </StrictMode>,
);
