import { NavLink, Outlet } from "react-router-dom"
import { Header, Navbar } from "./components"
import Sidebar from "./components/Sidebar"
import { useEffect } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from "react-redux"
import { AppDispatch } from "./app/store"
import { getUserAuth0 } from "./features/user/userSlice"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { UserData } from "./interfaces"
import { getChannel } from "./features/channel/channelSlice"

function App() {
  /*   const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth0();
  
  
    const getUserToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem('token', token);
        if (token && user?.sub) {
          dispatch(getUserAuth0({ token, userID: user?.sub })).then((value) => {
            const userData: UserData = value.payload;
            const channelID: string = userData.user_metadata?.channel;
            if (channelID) dispatch(getChannel(channelID));
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  
    useEffect(() => {
      if (user) getUserToken()
    }, [user]) */

  return (
    <div className="content-scroll">
      <Header />
      <Navbar />
      {/* <Sidebar /> */}
      <div className={`page-container`} >
        <NavLink to='/watch' className='inWatch' />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
