import React, { useEffect  , useState} from "react";
import { getTasks } from "../utils/shared";
import { ITask } from "../models/interface";
import TaskItem from "../components/TaskItem";
import Dialog from "../components/Dialog";
import Search from "../components/Search";
import Button from "../components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


const Task = () => {


const [tasks, setTasks] = useState<ITask[]>([]);
const [tasksError, setTasksError] = useState("");

const [isViewTask, setIsViewTask] = useState(false);
const [selectedTask, setSelectedTask] = useState<ITask>();


const navigate = useNavigate();



const handleViewTask = (
    e: React.MouseEvent<HTMLDivElement>,
    activeTask: ITask
) => {
    setIsViewTask(true);
    setSelectedTask(activeTask);
};

useEffect(() => {
        getTasks()
        .then((res) => {
        setTasks(res.reverse());
        })
        .catch((err) => {
        console.error(err);
        setTasksError("Error fetching tasks, please try again");
        });
	}, []);
    



	return (
        <main className="container mx-auto">
        <section className="max-w-5xl mx-auto m-12 p-16">



        {isViewTask && selectedTask && (
            <Dialog key={selectedTask.$id} setIsViewTask={setIsViewTask}>
                <TaskItem
                    task={selectedTask}
                    handleViewTask={() => handleViewTask(selectedTask!)}
                    isViewTask={isViewTask}
                />
            </Dialog>
        )}

            <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
            Your Tasks
            </h1>

            <div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start 					md:items-center md:justify-between">
    <Search />
    <Button
        handleClick={() => navigate("/")}
        extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-	primaryHover ml-auto"
    >
        <span>Add Task</span>
        <PlusIcon height={25} className="hidden md:flex" />
    </Button>
</div>


            {tasksError ? (
                <span className="m-8 text-error">{tasksError}</span>
            ) : (
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
                        <div>
                             {tasks
                                 .filter((task) => !task.done)
                                 .map((task) => (
                                    // <TaskItem key={task.$id} task={task} />
                                    <TaskItem key={task.$id} task={task} setTasks={setTasks} />
                             ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
                        <div>
                            {tasks
                                .filter((task) => task.done)
                                .map((task) => (
                                    // <TaskItem key={task.$id} task={task} />
                                    <TaskItem key={task.$id} task={task} setTasks={setTasks} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    </main>
	);
};

export default Task;