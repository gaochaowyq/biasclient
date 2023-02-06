import React, {useReducer,useState,useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {addProjectTimeline,getProjectTimeline} from "util/bimmanagementAPI/fetchProject";

export default function AddProjectPlan(props) {
    const [oldtimeline,setOldTimelind]=useState([])
    const [displayorder,setDisplayOrder]=useState(0)

    const type = [
        {
            value: 'project',
            label: '项目',
        },
        {
            value: 'task',
            label: '任务',
        },
        {
            value: 'milestone',
            label: '里程碑',
        }
    ];
    useEffect(
        ()=>{
            getProjectTimeline(props.projectid,props.token).then(res=>{setOldTimelind(res)})
        },
        []
    )

    let template = {
        "projectid": props.projectid,
        "start": "2022-01-01",
        "end": "2022-01-01",
        "name":"",
        "type": type[0],
        "project": "",
        "id": template.name,
        "progress": 10,
        "displayOrder": 1,
        "hideChildren": false
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        template
    );
    const handleSubmit = evt => {
        evt.preventDefault();
        let data = {formInput};
        let raw = JSON.stringify(data.formInput)
        addProjectTimeline(data.formInput.projectid, raw, props.token).then(res => {
            console.log(res)
        })

    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({[name]: newValue});
    };

    return (<>

                <TextField
                    label="开始时间"
                    helperText="添加计划起始时间"
                    id="margin-normal"
                    name="start"
                    type="date"
                    defaultValue={formInput.start}
                    onChange={handleInput}
                />
                <TextField
                    label="结束时间"
                    helperText="添加计划结束时间"
                    id="margin-normal"
                    name="end"
                    type="date"
                    defaultValue={formInput.end}
                    onChange={handleInput}
                />
                <TextField
                    label="计划名称"
                    helperText="添加计划名称"
                    id="margin-normal"
                    name="name"
                    defaultValue={formInput.name}
                    onChange={handleInput}
                />

                <TextField
                    label="计划类型"
                    helperText="添加计划类型，包括项目、任务、里程碑三个类型"
                    variant="outlined"
                    select
                    name="type"
                    defaultValue={"project"}
                    onChange={handleInput}
                >
                    {type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="进度"
                    helperText="添加进度比例，0~100"
                    id="margin-normal"
                    name="progress"
                    defaultValue={formInput.progress}
                    onChange={handleInput}
                />
                <TextField
                    label="显示顺序"
                    id="margin-normal"
                    name="displayOrder"
                    defaultValue={formInput.displayOrder}
                    onChange={handleInput}
                />
                <TextField
                    label="上一级"
                    id="margin-normal"
                    name="project"
                    defaultValue={formInput.project}
                    onChange={handleInput}
                />
                <Button
                    id="margin-normal"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    提交
                </Button>
    </>
    );
}