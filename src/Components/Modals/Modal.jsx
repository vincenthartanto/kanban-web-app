import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ViewTaskModal from "./ViewTaskModal";
export default function Modal({ children, onClick }) {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className="fixed bg-black min-h-screen min-w-full overflow-scroll top-0 left-0 bg-opacity-50 z-20"
    >
      <div className="grid place-items-center min-h-screen min-w-screen">
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
