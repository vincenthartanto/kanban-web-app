import "./App.css";
import Bar from "./Components/Bar";
import Sidebar from "./Components/Sidebar";
import MainTask from "./Components/Task/MainTask";

import DarkModeProvider from "./Context/DarkModeProvider";
import useToggle from "./Hooks/UseToggle";

import SibedarLogo from "./assets/icon-show-sidebar.svg";
import Desktop from "./Components/Desktop";
import useWindow from "./Hooks/useWindow";
function App() {
  const hideSidebar = useToggle(true);
  const width = useWindow();
  return (
    <DarkModeProvider>
      {hideSidebar.isToggle ? (
        <div className="flex min-h-screen w-screen">
          <Sidebar hideSidebarToggle={hideSidebar.changeToggle}></Sidebar>
          <div className="w-screen">
            <Bar></Bar>
            <MainTask></MainTask>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          {width >= 768 && (
            <button
              onClick={hideSidebar.changeToggle}
              className="absolute left-0 bottom-8 bg-mainPurple rounded-r-full p-8 grid place-items-center"
            >
              <img className="h-[1rem] w-[1.3rem] " src={SibedarLogo}></img>
            </button>
          )}

          <Desktop></Desktop>
          <MainTask></MainTask>
        </div>
      )}
    </DarkModeProvider>
  );
}

export default App;
