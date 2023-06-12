import React from "react";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const moment = require("moment");

const Task = ({task, deleteTask, handleSetComplete}) => {
     const taskStyle = "w-full border-b-2 border-gray-200 flex justify-between p-2 pl-4 pr-4 hover:bg-gray-100";
     const checkboxColor = () => {
          if (task.priority === 0) {
               return "text-yellow-500";
          } else if (task.priority === 1) {
               return "text-orange-500";
          } else if (task.priority === 2) {
               return "text-red-500";
          }
     };

     return (
          <div className={task.id === "0" ? "hidden" : taskStyle}>
               <div className="flex w-[90%]">
                    <div className="w-[40px]">
                         <button className={checkboxColor()} onClick={() => handleSetComplete(task.id)}>
                              {task.completed ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankIcon />}
                         </button>
                    </div>
                    <div>
                         <div className={task.completed ? "text-lg pb-2 line-through" : "text-lg pb-2"}>
                              <div>{task.description}</div>
                              <div className="text-[13px]">{moment(task.date).format("MMM DD, YYYY")}</div>
                         </div>
                    </div>
               </div>
               <div className="flex justify-evenly">
                    <div>
                         <button onClick={() => deleteTask(task.id)}>
                              <DeleteOutlineOutlinedIcon className="text-gray-400" />
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default Task;
