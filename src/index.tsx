import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.css'
import './styles/tokens.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals()
