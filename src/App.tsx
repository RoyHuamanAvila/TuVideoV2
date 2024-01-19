import { NavLink, Outlet } from "react-router-dom"
import { Header, Navbar } from "./components"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { CreateChannel } from "./components/Modals";

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

  /*   const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
    }
  
    useEffect(() => {
      if (isAuthenticated) {
        getToken();
      }
    }, [isAuthenticated]) */

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
      <CreateChannel />
    </div>
  )
}

export default App
