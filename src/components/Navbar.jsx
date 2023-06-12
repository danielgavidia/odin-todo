import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const Navbar = ({ handleSetSidebarVisibility }) => {
	return (
		<>
			<div className="bg-red-500 text-blue flex w-full h-[50px] justify-between p-[10px] pl-[30px] pr-[30px]">
				<div className="flex justify-between w-[80px]">
					<div className="flex justify-center hover:bg-red-300 w-[40px] rounded-[5px]">
						<button onClick={() => handleSetSidebarVisibility()}>
							<MenuIcon className="text-white text-" />
						</button>
					</div>
					{/* <div className="flex justify-center hover:bg-red-300 w-[40px] rounded-[5px]">
                              <button>
                                   <HomeIcon className="text-white" />
                              </button>
                         </div> */}
				</div>
				<div className="flex justify-center align-middle text-white w-[100px] hover:text-yellow-300 transition delay-50">
					<button className="font-pacifico text-2xl">Doo</button>
				</div>
				<div className="flex justify-center w-[80px]">
					<button>
						<CircleOutlinedIcon className="text-white text-3xl" />
					</button>
				</div>
			</div>
		</>
	);
};

export default Navbar;
