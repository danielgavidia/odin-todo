import React from "react";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const ProjectButton = ({ project, handleSetProject }) => {
	const tasks = project.taskList;
	return (
		<button onClick={() => handleSetProject(project.projectKey)} className="w-full">
			<div className="flex p-[10px] justify-between hover:bg-gray-200 rounded-[10px] w-full">
				<div className="flex w-[90%]">
					<div className="flex justify-left w-[40px]">
						<LayersOutlinedIcon />
					</div>
					<div className="overflow-hidden truncate w-full text-left">{project.projectTitle}</div>
				</div>
				<div className="flex justify-center text-gray-700 w-[20px]">{tasks.length - 1}</div>
			</div>
		</button>
	);
};

const Sidebar = ({
	projectArray,
	handleSetProject,
	newProjectTitle,
	handleSetNewProjectTitle,
	handleSetNewProject,
	sidebarVisibility,
}) => {
	const sidebarFormat = () => {
		if (sidebarVisibility === true) {
			return "bg-gray-100 flex flex-col h-[calc(100vh-50px)] min-w-[300px] w-[350px] p-[20px] overflow-y-scroll overflow-x-hidden resize-x";
		} else if (sidebarVisibility === false) {
			return "hidden";
		}
	};
	return (
		<>
			<div className={sidebarFormat()}>
				<div className="flex text-gray-500 font-bold p-[10px] justify-between hover:bg-gray-200 rounded-[10px] w-[300px]">
					<div>Projects</div>
				</div>
				<div className="shrink-0 p-[10px] w-[95%] flex justify-between rounded-[5px] bg-white">
					<input
						className="w-full outline-0"
						placeholder="New Project"
						value={newProjectTitle}
						onChange={handleSetNewProjectTitle}
					/>
					<div className="flex justify-center w-[20px] bg-white">
						<button onClick={handleSetNewProject}>
							<AddOutlinedIcon />
						</button>
					</div>
				</div>
				<div className="w-[95%]">
					{projectArray.map((i, index) => (
						<ProjectButton handleSetProject={handleSetProject} project={i} key={index} />
					))}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
