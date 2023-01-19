import { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="d-none d-md-block sidebar py-3">
            <SidebarItem imgName="Home" name="Home" path="/" />
            <SidebarItem imgName="Subs" name="Subscriptions" path="/subscribes" />
        </div>
    )
}

const SidebarItem: FC<{ imgName: string; name: string; path: string }> = ({ imgName, name, path }) => {
    return (
        <NavLink to={path} className="d-flex flex-column align-items-center sidebar-item">
            {
                ({ isActive }) => (
                    <>
                        <img className="pb-1" src={`/icons/${imgName}${isActive ? 'Fill' : 'Outline'}.svg`} alt="" />
                        <p className="m-0">{name}</p>
                    </>
                )
            }
        </NavLink>
    )
}

export default Sidebar;
