import "./navigation.css";
import { SideBarData } from "./SideBarData";
import userJson from "../../utils/UserJson";
import { useContext} from "react";
import { IoArrowBack } from "react-icons/io5";
import ContextSidebar from "../../context/ContextSidebar";
import UserData from "../Auth/UserData";

function SideBar() {
  const userData = UserData();
  const array: any = userJson();
  const name = array[1] + " " + array[2];
  const {position, setPosition} = useContext<any>(ContextSidebar)
  function handleClose() {
    setPosition(!position);
  }
  return (
    <>
      <div className={position ? "Sidebar active" : "Sidebar"}>
        <button type="button" className="btn btn-link btn-lg" style={{marginLeft: "80%"}} onClick={handleClose}>
          <IoArrowBack/>
        </button>

        <div style={{ textAlign: "center", paddingBottom: "10%", overflow: "hidden"}}>
          <img
            src="https://image.shutterstock.com/image-photo/smiling-cat-business-suit-260nw-219244810.jpg"
            style={{
              width: "50%",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          />
          <h5 style={{ color: "#ecf0f1", paddingTop: 15 }}>{userData ? userData.Nombre: "user"}</h5>
          <p style={{ color: "#ecf0e9", paddingTop: 15, paddingInline:10 }}>{userData ? userData.Email: "user@email.com"}</p>
        </div>
        <ul className="SidebarList">
          {SideBarData.map((val, key) => {
            return (
                <a href={val.link} key={key}>
                  <li className="rows ">
                    <div id="icon">{val.icon} </div>

                    <div id="title"> {val.title} </div>
                  </li>
                </a>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
