import React from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const moment = require("moment");

const TaskInputBox = ({
	handleSetTaskList,
	handleSetDesc,
	handleSetTaskPriority,
	taskDesc,
	taskPriority,
	taskDate,
	setTaskDate,
	calendarVisibility,
	setCalendarVisibility,
	handleCalendarVisibility,
}) => {
	const checkboxColor = () => {
		if (taskPriority === 0) {
			return "w-[37px] flex justify-center text-yellow-500 h-full pt-[3px]";
		} else if (taskPriority === 1) {
			return "w-[37px] flex justify-center text-orange-500 h-full pt-[3px]";
		} else if (taskPriority === 2) {
			return "w-[37px] flex justify-center text-red-500 h-full pt-[3px]";
		}
	};

	return (
		<>
			<div className="flex flex-col justify-between w-full border-2 border-gray-200 rounded-[10px] p-[10px] h-[100px] overflow-visible">
				<div className="">
					<div className="flex h-full">
						<div className={checkboxColor()}>
							<CheckBoxOutlineBlankIcon />
						</div>
						<input
							placeholder="Task"
							className="w-full h-[30px] resize-none outline-0 pl-[11px]"
							value={taskDesc}
							onChange={handleSetDesc}
						/>
					</div>
				</div>
				<div className="flex justify-between pt-[10px]">
					<div className="flex justify-between w-[510px]">
						<ClickAwayListener onClickAway={handleCalendarVisibility}>
							<div className={calendarVisibility ? "h-[300px]" : "h-[40px]"}>
								<button
									onClick={() => setCalendarVisibility(!calendarVisibility)}
									className="flex justify-evenly border-2 border-gray-200 rounded-[5px] w-[250px] h-[40px] hover:bg-gray-100 text-gray-500"
								>
									<div className="flex flex-col justify-center h-full">
										<CalendarTodayOutlinedIcon />
									</div>
									<div className="flex flex-col justify-center text-[14px] h-full">
										Due date
									</div>
									<div className="flex flex-col justify-center h-full">
										{moment(taskDate).format("MMM DD, YYYY")}
									</div>
								</button>
								<div
									className={
										calendarVisibility
											? "border-2 border-gray-200 w-[250px] h-[300px] flex justify-center rounded-[5px] bg-white"
											: "hidden"
									}
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateCalendar onChange={(newDate) => setTaskDate(newDate.$d)} />
									</LocalizationProvider>
								</div>
							</div>
						</ClickAwayListener>
						<div className="flex justify-evenly border-2 border-gray-200 rounded-[5px] w-[250px] h-[40px] hover:bg-gray-100 text-gray-500">
							<div className="flex flex-col justify-center h-full">
								<FlagOutlinedIcon />
							</div>
							<div className="flex flex-col justify-center text-sm">Priority</div>
							<div className="flex h-full w-[75px] justify-between">
								<div className="flex flex-col justify-center">
									<button
										onClick={() => handleSetTaskPriority(2)}
										className={
											taskPriority === 2
												? "bg-red-500 w-[20px] rounded-[20px] h-[20px]"
												: "bg-red-200 w-[20px] rounded-[20px] h-[20px] hover:bg-red-500"
										}
									></button>
								</div>
								<div className="flex flex-col justify-center">
									<button
										onClick={() => handleSetTaskPriority(1)}
										className={
											taskPriority === 1
												? "bg-orange-500 w-[20px] rounded-[20px] h-[20px]"
												: "bg-orange-200 w-[20px] rounded-[20px] h-[20px] hover:bg-orange-500"
										}
									></button>
								</div>
								<div className="flex flex-col justify-center">
									<button
										onClick={() => handleSetTaskPriority(0)}
										className={
											taskPriority === 0
												? "bg-yellow-500 w-[20px] rounded-[20px] h-[20px]"
												: "bg-yellow-200 w-[20px] rounded-[20px] h-[20px] hover:bg-yellow-500"
										}
									></button>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-between w-[110px] font-bold">
						<div className="flex justify-start bg-red-500 hover:bg-red-700 rounded-[5px] w-[110px] h-[40px] text-white">
							<button className="w-full" onClick={() => handleSetTaskList()}>
								Add task
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TaskInputBox;
