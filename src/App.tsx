import { NavLink, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { useEffect } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from "react-redux"
import { AppDispatch } from "./app/store"
import { getUserAuth0 } from "./features/user/userSlice"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth0();

  const getUserToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token)
      localStorage.setItem('token', token);
      if (token && user?.sub) {
        dispatch(getUserAuth0({ token, userID: user?.sub }));
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (user) getUserToken()
  }, [user])

  return (
    <div className="content-scroll">
      <Header />
      <Sidebar />
      <div className={`page-container`} >
        <NavLink to='/watch' className='inWatch' />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
