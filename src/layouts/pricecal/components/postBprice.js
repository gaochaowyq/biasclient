import React, {useReducer} from "react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
export default function PriceFormSubmit(props) {
    const unit = [
  {
    value: 'LIFANGMI',
    label: '立方米',
  },
  {
    value: 'PINGFANGMI',
    label: '平方米',
  },
  {
    value: 'M',
    label: '米',
  },
  {
    value: 'T',
    label: '吨',
  },
];

    let template = {
        "projectid": props.projectid,
        "mcoder": props.mcoder,
        "coder": props.coder,
        "coder_name": props.coder_name,
        "unit": props.unit,
        "bprice": 10,
        "rengon_price": 1,
        "cailiao_price": 2,
        "jixie_price": 7
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        template
    );
    const handleSubmit = evt => {
        evt.preventDefault();
        let data = {formInput};
        let raw = JSON.stringify(data.formInput)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 8fcd95ae6bd4a2f1d29e3c563e99e15fde1fef7d");
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        console.log(raw)
        fetch("http://www.batgreenbuild.com:90/cailiaoprice/api/bprice/", requestOptions)
            .then(response => response.json())
            .then(response => console.log("Success:", response))
            .catch(error => console.error("Error:", error));
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({[name]: newValue});
    };

    return (
        <Paper>
            <Typography variant="h5" component="h3">
                {props.formName}
            </Typography>
            <Typography component="p">{props.formDescription}</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="项目ID"
                    id="margin-normal"
                    name="projectid"
                    defaultValue={formInput.projectid}
                    onChange={handleInput}
                />
                <TextField
                    label="编码15"
                    id="margin-normal"
                    name="mcoder"
                    defaultValue={formInput.mcoder}
                    onChange={handleInput}
                />
                <TextField
                    label="定额编码"
                    id="margin-normal"
                    name="coder"
                    defaultValue={formInput.coder}
                    onChange={handleInput}
                />
                <TextField
                    label="定额名称"
                    id="margin-normal"
                    name="coder_name"
                    defaultValue={formInput.coder_name}
                    onChange={handleInput}
                />

                <TextField
                    label="单位"
                    id="margin-normal"
                    select
                    name="unit"
                    defaultValue={formInput.unit}
                    onChange={handleInput}
                >
                    {unit.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                </TextField>

                <TextField
                    label="总体价格"
                    id="margin-normal"
                    name="bprice"
                    defaultValue={formInput.bprice}
                    onChange={handleInput}
                />
                <TextField
                    label="人工定额"
                    id="margin-normal"
                    name="rengon_price"
                    defaultValue={formInput.rengon_price}
                    onChange={handleInput}
                />
                <TextField
                    label="材料定额"
                    id="margin-normal"
                    name="cailiao_price"
                    defaultValue={formInput.cailiao_price}
                    onChange={handleInput}
                />
                <TextField
                    label="机械定额"
                    id="margin-normal"
                    name="jixie_price"
                    defaultValue={formInput.jixie_price}
                    onChange={handleInput}
                />

                <Button
                    id="margin-normal"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    提交
                </Button>
            </form>
        </Paper>
    );
}