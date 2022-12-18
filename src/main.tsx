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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
