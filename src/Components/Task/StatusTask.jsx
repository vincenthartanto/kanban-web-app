import React from "react";

export default function StatusTask({ name, tasksLength }) {
  let color;
  if (name.toLowerCase() === "to do" || name.toLowerCase() === "todo") {
    color = "bg-lightBlue";
  } else if (name.toLowerCase() === "doing") {
    color = "bg-mainPurple";
  } else if (name.toLowerCase() === "done") {
    color = "bg-green-500";
  } else {
    color = "bg-slate-800";
  }
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`p-2 rounded-full ${color}
        }`}
      ></div>

      <div className="text-mediumGrey tracking-widest text-sm">
        {name} ({tasksLength})
      </div>
    </div>
  );
}
