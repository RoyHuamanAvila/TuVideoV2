import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './scss/custom.scss'
import Home from './pages/Home/Home'
import Subscribes from './pages/Subscribes/Subscribes'
import ChannelContainer from './components/ChannelContainer'
import ChannelHome from './pages/ChannelHome'
import { Watch } from './pages';
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ChannelVideos from './pages/ChannelVideos'

const router = createBrowserRouter([
  {
    element: <App />, children: [
      { path: '/', element: <Home /> },
      { path: '/subscribes', element: <Subscribes /> },
      {
        element: <ChannelContainer />, children: [
          { path: '/channel/:id', element: <ChannelHome /> },
          { path: '/channel/:id/videos', element: <ChannelVideos /> }
        ]
      },
      { path: '/watch/:id', element: <Watch /> }
    ]
  }
])


const DOMAIN: string = import.meta.env.VITE_DOMAIN
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID
//const AUDIENCE: string = import.meta.env.VITE_AUDIENCE

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
      scope='update:users update:users_app_metadata update:current_user_metadata read:users read:current_user read:user_idp_tokens'
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
