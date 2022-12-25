import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './scss/custom.scss'
import Home from './pages/Home'
import Subscribes from './pages/Subscribes'
import ChannelContainer from './components/ChannelContainer'
import ChannelHome from './pages/ChannelHome'
import Watch from './pages/Watch'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store } from './app/store'

const router = createBrowserRouter([
  {
    element: <App />, children: [
      { path: '/', element: <Home /> },
      { path: '/subscribes', element: <Subscribes /> },
      {
        element: <ChannelContainer />, children: [
          { path: '/channel', element: <ChannelHome /> }
        ]
      },
      { path: '/watch', element: <Watch /> }
    ]
  }
])


const DOMAIN: string = import.meta.env.VITE_DOMAIN
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider domain={DOMAIN} clientId={CLIENT_ID} redirectUri={window.location.origin}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
