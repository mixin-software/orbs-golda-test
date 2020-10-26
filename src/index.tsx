import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import {  ConnectedRouter } from "connected-react-router"
import * as serviceWorker from "./serviceWorker"
import createBrowserHistory from "history/createBrowserHistory"
import App from "./app"
import store from "./redux/store/store"
import './i18n';

const history = createBrowserHistory()



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
serviceWorker.unregister()
