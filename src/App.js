import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Project from "./components/Project";
import { v4 as uuid } from 'uuid';
import { db } from "./back-end/firebase";
import { doc, query, collection, onSnapshot, updateDoc, setDoc, deleteDoc } from "firebase/firestore";


function App() {
     // STATE
     const initialDate = (new Date());
     const [projectArray, setProjectArray] = useState([]);
     const [project, setProject] = useState({ projectKey: "", projectTitle: "", taskList: [] });
     const [taskList, setTaskList] = useState([]);
     const [taskDesc, setTaskDesc] = useState("");
     const [taskPriority, setTaskPriority] = useState(0);
     const [sidebarVisibility, setSidebarVisibility] = useState(true);
     const [updatedProjectTitle, setUpdatedProjectTitle] = useState("");
     const [updatedProject, setUpdatedProject] = useState("");
     const [newProjectTitle, setNewProjectTitle] = useState("");
     const [newProject, setNewProject] = useState("");
     const [titleInputActive, setTitleInputActive] = useState(false);
     const [projectDeleteKey, setProjectDeleteKey] = useState('');
     const [taskDate, setTaskDate] = useState(initialDate);
     const [calendarVisibility, setCalendarVisibility] = useState(false);

     // PROJECTS
     // create project in Firebase
     const handleSetNewProjectTitle = (event) => {
          setNewProjectTitle(event.target.value);
     };
     const handleSetNewProject = () => {
          setNewProject(newProjectTitle);
          setNewProjectTitle("");
     };

     useEffect(() => {
          if (newProject.length > 0) {
               const id = uuid();
               setDoc(doc(db, "todos", id), {
                    projectKey: id,
                    projectTitle: newProject,
                    taskList: [{ id: "0", description: "Task #1", completed: false, date: initialDate, priority: 0 }]
               });
               setNewProject('');
          }
     });

     // read projects from Firebase
     useEffect(() => {
          const q = query(collection(db, 'todos'));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
               let newData = [];
               querySnapshot.forEach((doc) => {
                    newData.push({ ...doc.data() });
               });
               // sort array
               const data = newData.sort((a, b) => {
                    const nameA = a.projectTitle.toUpperCase();
                    const nameB = b.projectTitle.toUpperCase();
                    if (nameA < nameB) {
                         return -1;
                    }
                    if (nameA > nameB) {
                         return 1;
                    }
                    return 0;
               });
               setProjectArray(data);
          });
          return () => unsubscribe();
     }, []);

     // update project in Firebase
     const handleSetUpdatedProjectTitle = (event) => {
          setUpdatedProjectTitle(event.target.value);
     };
     const handleSetUpdatedProject = () => {
          setUpdatedProject(updatedProjectTitle);
          if (updatedProject.length > 0) {
               setProject({ projectKey: project.projectKey, projectTitle: updatedProjectTitle, taskList: project.taskList });
               setUpdatedProjectTitle("");
          }
     };

     useEffect(() => {
          const key = project.projectKey;
          if (key.length > 0) {
               const projectRef = doc(db, "todos", key);
               updateDoc(projectRef, {
                    taskList: taskList,
               });
          }
          if (updatedProject.length > 0) {
               const projectRef = doc(db, "todos", key);
               updateDoc(projectRef, {
                    projectTitle: updatedProject
               });
          }
     });

     // delete project in Firebase
     const handleSetProjectDeleteKey = (key) => {
          if (projectArray.length > 1) {
               setProjectDeleteKey(key);
               setProject({ projectKey: "", projectTitle: "", taskList: [] });
               setTaskList([]);
          }
     };

     useEffect(() => {
          if (projectDeleteKey.length > 0) {
               const projectRef = doc(db, "todos", projectDeleteKey);
               deleteDoc(projectRef);
          }
     });

     // TASKS
     // switch between projects
     const handleSetProject = (key) => {
          const filteredArr = projectArray.filter(i => (i.projectKey.includes(key)));
          const pro = filteredArr[0];
          setProject(pro);
          setTaskList(pro.taskList);
          setCalendarVisibility(false);
          setUpdatedProject("");
     };

     // task description
     const handleSetDesc = (event) => {
          setTaskDesc(event.target.value);
     };

     // task priority
     const handleSetTaskPriority = (priority) => {
          setTaskPriority(priority);
     };

     // sort task list
     const handleSetTaskList = () => {
          const id = uuid();
          const list = [...taskList, { id: id, description: taskDesc, completed: false, date: taskDate.getTime(), priority: taskPriority }];
          const sortedList = list.sort((a1, a2) => (a2.priority - a1.priority || a1.date - a2.date));
          if (taskDesc.length != 0) {
               setTaskList(sortedList);
               setTaskDesc("");
               setTaskPriority(0);
               setTaskDate(initialDate);
               setCalendarVisibility(false);
          } else {
               alert('Please add a task');
          }
     };

     // Mark tasks as completed
     const handleSetComplete = (taskID) => {
          const newState = taskList.map(obj => {
               if (obj.id === taskID) {
                    return { ...obj, completed: true };
               }
               return obj;
          });
          setTaskList(newState);
     };

     // Delete tasks
     const deleteTask = (id) => {
          const newState = taskList.filter((i) => i.id != id);
          setTaskList(newState);
     };

     // calendar visibility
     const handleCalendarVisibility = () => {
          setCalendarVisibility(false);
     };

     // sidebar visibility
     const handleSetSidebarVisibility = () => {
          setSidebarVisibility(!sidebarVisibility);
     };

     return (
          <>
               <div className="flex flex-col">
                    <Navbar sidebarVisibility={sidebarVisibility} handleSetSidebarVisibility={handleSetSidebarVisibility} />
                    <div className="flex w-full h-[calc(100vh-50px)]">
                         <Sidebar
                              projectArray={projectArray}
                              newProjectTitle={newProjectTitle}
                              handleSetProject={handleSetProject}
                              handleSetNewProjectTitle={handleSetNewProjectTitle}
                              handleSetNewProject={handleSetNewProject}
                              sidebarVisibility={sidebarVisibility}
                         />
                         <Project
                              project={project}
                              setProject={setProject}
                              taskList={taskList}
                              taskDesc={taskDesc}
                              taskPriority={taskPriority}
                              taskDate={taskDate}
                              calendarVisibility={calendarVisibility}
                              setCalendarVisibility={setCalendarVisibility}
                              setTaskDate={setTaskDate}
                              handleSetTaskPriority={handleSetTaskPriority}
                              handleSetTaskList={handleSetTaskList}
                              handleSetDesc={handleSetDesc}
                              deleteTask={deleteTask}
                              handleSetProjectDeleteKey={handleSetProjectDeleteKey}
                              handleSetComplete={handleSetComplete}
                              updatedProjectTitle={updatedProjectTitle}
                              handleSetUpdatedProjectTitle={handleSetUpdatedProjectTitle}
                              handleSetUpdatedProject={handleSetUpdatedProject}
                              titleInputActive={titleInputActive}
                              setTitleInputActive={setTitleInputActive}
                              sidebarVisibility={sidebarVisibility}
                              handleCalendarVisibility={handleCalendarVisibility}
                         />
                    </div>
               </div>
          </>
     );
};

export default App;
