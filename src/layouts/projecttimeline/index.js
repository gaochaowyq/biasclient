import {Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption, viewDate} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {useState, useEffect,useRef} from "react";
import {ViewSwitcher} from "./components/view-switcher"
import {getStartEndDateForProject, initTasks} from "./helper";
import {useMaterialUIController, setMiniSidenav} from "context";
import {fetchBuilding} from "util/bimmanagementAPI/fetchBuildings";
import {getTask} from "./helper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import AddProjectPlan from "./components/addProjectPlan";
import {addProjectTimeline, updateProjectTimeline} from "util/bimmanagementAPI/fetchProject";
import useToken from "../authentication/sign-in/components/useToken";
import Button from '@mui/material/Button';


function Projecttimeline() {
    const {token, setToken} = useToken();
    const [view, setView] = useState(ViewMode.Day);
    const [viewData, setViewData] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [buildinginfo, setBuildingInfo] = useState({});
    const [controller, dispatch] = useMaterialUIController();
    const [open, setOpen] = useState(false);
    const {miniSidenav} = controller;
    const {id} = useParams();
    const jsonref=useRef();
    let _task;
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 1000,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        '& .MuiTextField-root': {m: 1, width: '25ch'},
        p: 4,
    };
    useEffect(() => {
        getTask(id, token).then(res => {
            setTasks(res)
        });
        fetchBuilding(token, id).then(res => {
            setBuildingInfo(res);
            console.log(res)
        });
        setMiniSidenav(dispatch, true);
    }, []);


    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskChange = (task: Task) => {
        console.log("On date change Id:" + task.id);
        console.log(task)
        let newTasks = tasks.map(t => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = {...project, start, end};
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter(t => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };

    const handleDblClick = (task: Task) => {
        setOpen(true)
    };

    const handleClick = (task: Task) => {
        console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };
    const onUpdatePlan = () => {
        setOpen(true)
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        //let raw = JSON.stringify(_task)
        let raw = jsonref.current.state.jsObject
        let error=jsonref.current.state.error;
        if (undefined!==error){
            updateProjectTimeline(id, raw, token).then(res => {console.log(res)});
            setOpen(false);
        }
        else {
            console.log(error)
        }
    };


    return (
        <DashboardLayout>
            {buildinginfo !== {} && <h3>{buildinginfo.name}计划</h3>}

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div>
                        {buildinginfo.name}计划
                    </div>
                    <JSONInput
                        id='a_unique_id'
                        placeholder={tasks}
                        theme="light_mitsuketa_tribute"
                        waitAfterKeyPress={3600}
                        locale={locale}
                        height='300px'
                        ref={jsonref}
                    />
                    <Button
                        onClick={handleSubmit}
                    >
                        提交
                    </Button>
                </Box>

            </Modal>

            <ViewSwitcher
                onViewModeChange={viewMode => setView(viewMode)}
                onViewListChange={setIsChecked}
                isChecked={isChecked}
                onUpdatePlan={onUpdatePlan}
            />
            {tasks.length > 0 && <Gantt
                tasks={tasks}
                viewMode={view}
                locale={"chi"}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
            />
            }

        </DashboardLayout>
    );
}

export default Projecttimeline;