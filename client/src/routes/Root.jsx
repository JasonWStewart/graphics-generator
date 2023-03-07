import "./Root.css";
import MainDisplay from "../components/UI/MainDisplay";
import { Outlet } from "react-router";
import WorkArea from "../components/UI/WorkArea";
import NavBar from "../components/UI/NavBar";

function Root() {
  return (
    <div className="App">
      <NavBar />
      <MainDisplay>
        <WorkArea>
          <Outlet />
        </WorkArea>
      </MainDisplay>
    </div>
  );
}

export default Root;
