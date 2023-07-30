import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import { UserContextProvider } from './context/usercontext.jsx';

const client = new QueryClient();

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(

        <React.StrictMode>
          <UserContextProvider>
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
          </UserContextProvider>
        </React.StrictMode>,
    )