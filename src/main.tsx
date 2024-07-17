import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import storeRTK from "./reduxRTK/storeRTK.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={storeRTK}>
      <App />
    </Provider>
  </HashRouter>
);
