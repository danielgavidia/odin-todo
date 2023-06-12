import React from "react";
import Task from "./Task";
import TaskInputBox from "./TaskInputBox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AbcIcon from "@mui/icons-material/Abc";

const ProjectHeader = ({ project, handleSetProjectDeleteKey, setTitleInputActive }) => {
	return (
		<>
			<div className="flex justify-between text-2xl font-bold border-b-2 border-gray-200 w-full p-2 h-full">
				<div>{project.projectTitle}</div>
				<div className="pr-[7px] h-full w-[100px] flex justify-between">
					<button onClick={() => setTitleInputActive(true)} className="hover:text-gray-400">
						<AbcIcon />
					</button>
					<button
						onClick={() => handleSetProjectDeleteKey(project.projectKey)}
						className="hover:text-gray-400"
					>
						<DeleteOutlineOutlinedIcon />
					</button>
				</div>
			</div>
		</>
	);
};

const ProjectHeaderInput = ({
	setTitleInputActive,
	updatedProjectTitle,
	handleSetUpdatedProjectTitle,
	handleSetUpdatedProject,
}) => {
	return (
		<>
			<div className="flex justify-between text-2xl font-bold border-b-2 border-gray-200 w-full p-2 h-full bg-gray-100">
				<div>
					<input
						className="w-full outline-0 bg-gray-100"
						placeholder="New Project"
						value={updatedProjectTitle}
						onChange={handleSetUpdatedProjectTitle}
					/>
				</div>
				<div className="pr-[7px] text-sm bg-gray-200 h-full w-[80px] flex justify-center rounded-[5px] hover:bg-gray-300">
					<button
						onClick={() => {
							setTitleInputActive(false);
							handleSetUpdatedProject();
						}}
						className="h-full w-[50px]"
					>
						Rename
					</button>
				</div>
			</div>
		</>
	);
};

const Project = ({
	project,
	taskList,
	taskDesc,
	taskPriority,
	taskDate,
	handleSetTaskList,
	handleSetDesc,
	deleteTask,
	handleSetProjectDeleteKey,
	handleSetComplete,
	handleSetTaskPriority,
	setTaskDate,
	calendarVisibility,
	setCalendarVisibility,
	updatedProjectTitle,
	handleSetUpdatedProjectTitle,
	handleSetUpdatedProject,
	titleInputActive,
	setTitleInputActive,
	setProject,
	sidebarVisibility,
	handleCalendarVisibility,
}) => {
	const projectFormat = () => {
		if (sidebarVisibility === true) {
			return "flex justify-center bg-white h-[calc(100vh-50px)] w-[calc(100vw-300px)] overflow-y-scroll";
		} else if (sidebarVisibility === false) {
			return "flex justify-center bg-white h-[calc(100vh-50px)] w-[100vw] overflow-y-scroll";
		}
	};
	return (
		<>
			<div className={projectFormat}>
				<div className="w-[1000px] p-[30px]">
					<div className="h-[50px]">
						{titleInputActive ? (
							<ProjectHeaderInput
								setTitleInputActive={setTitleInputActive}
								handleSetUpdatedProjectTitle={handleSetUpdatedProjectTitle}
								updatedProjectTitle={updatedProjectTitle}
								handleSetUpdatedProject={handleSetUpdatedProject}
								setProject={setProject}
								project={project}
							/>
						) : (
							<ProjectHeader
								project={project}
								handleSetProjectDeleteKey={handleSetProjectDeleteKey}
								setTitleInputActive={setTitleInputActive}
							/>
						)}
					</div>

					<div>
						{taskList.map((i) => (
							<Task task={i} deleteTask={deleteTask} handleSetComplete={handleSetComplete} />
						))}
					</div>
					<div>
						<TaskInputBox
							handleSetTaskList={handleSetTaskList}
							handleSetDesc={handleSetDesc}
							handleSetTaskPriority={handleSetTaskPriority}
							taskDesc={taskDesc}
							taskPriority={taskPriority}
							taskDate={taskDate}
							setTaskDate={setTaskDate}
							calendarVisibility={calendarVisibility}
							setCalendarVisibility={setCalendarVisibility}
							handleCalendarVisibility={handleCalendarVisibility}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Project;
