import {AddDays} from "calculate-date";
import {getProjectTimeline, addProjectTimeline} from "util/bimmanagementAPI/fetchProject";
import {listmaintask} from "../../util/bimmanagementAPI/TaskManagement/taskmanagement";
export function initTasks() {
    const currentDate = new Date();
    const startData = new Date(2022, 11, 14)

    const tasks: Task[] = [
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "施工图阶段",
            id: "施工图阶段",
            progress: 25,
            type: "project",
            hideChildren: false,
            displayOrder: 1,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                2,
                12,
                28
            ),
            name: "第一版作业图",
            id: "第一版作业图",
            progress: 45,
            type: "task",
            project: "施工图阶段",
            displayOrder: 2,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
            name: "Research",
            id: "Task 1",
            progress: 25,
            dependencies: ["Task 0"],
            type: "task",
            project: "施工图阶段",
            displayOrder: 3,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Discussion with team",
            id: "Task 2",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "施工图阶段",
            displayOrder: 4,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
            name: "Developing",
            id: "Task 3",
            progress: 2,
            dependencies: ["Task 2"],
            type: "task",
            project: "施工图阶段",
            displayOrder: 5,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
            name: "Review",
            id: "Task 4",
            type: "task",
            progress: 70,
            dependencies: ["Task 2"],
            project: "施工图阶段",
            displayOrder: 6,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "Release",
            id: "Task 6",
            progress: currentDate.getMonth(),
            type: "milestone",
            dependencies: ["Task 4"],
            project: "施工图阶段",
            displayOrder: 7,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
            name: "Party Time",
            id: "Task 9",
            progress: 0,
            isDisabled: true,
            type: "task",
        },
    ];
    return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
        const task = projectTasks[i];
        if (start.getTime() > task.start.getTime()) {
            start = task.start;
        }
        if (end.getTime() < task.end.getTime()) {
            end = task.end;
        }
    }
    return [start, end];
}

export async function getTask(buildingid, token) {

    let plan = await getProjectTimeline(buildingid, token)
    return await plan.map((element) => {
        return {
            start: new Date(element.start),
            end: new Date(element.end),
            name: element.name,
            id: element.id,
            progress: element.progress,
            dependencies: element.dependencies,
            type: element.type,
            project: element.project,
            hideChildren: element.hideChildren,
            displayOrder: element.displayOrder
        }
    });
}

export async function getTaskByDB(projectid, token) {

    let plan = await listmaintask(projectid)
    return await plan.map((element) => {
        return {
            start: new Date(element.createddate),
            end: new Date(element.plandate),
            name: element.taskname,
            id: element.id,
            progress: 0,
            dependencies: element.dependencies,
            type: element.type,
            project: element.project,
            hideChildren: element.hideChildren,
            displayOrder: element.displayOrder
        }
    });
}


export async function addTask(buildingid, newtask, token) {
    let plan = await addProjectTimeline(buildingid, newtask, token)
    return plan;
}

/*
{
"start": "2023-01-10",
"end": "2023-04-20",
"name": "施工图阶段",
"id": "施工图阶段",
"progress": 25,
"type": "project",
"hideChildren": false,
"displayOrder": 1
}

 */