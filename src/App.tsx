import { NavLink, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { useState } from "react"

function App() {
  const [isWatching, setIsWatching] = useState<boolean>(false);

  return (
    <div className="content-scroll">
      <Header />
      <NavLink to='/watch'>
        {
          ({ isActive }) => <>{setIsWatching(isActive)}</>
        }
      </NavLink>
      {!isWatching && <Sidebar />}
      <div className={`page-container ${isWatching ? 'bg-white' : ''}`} >
        <Outlet />
      </div>
    </div>
  )
}

export default App
