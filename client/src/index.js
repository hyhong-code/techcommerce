import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import store from "./redux/store";
import "react-quill/dist/quill.snow.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/App.scss";

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
