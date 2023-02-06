import {useState, useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid';

import Bimelements from "util/bimprice/bimelements";
import PriceFormSubmit from "./postBprice";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import fetchBuilding from "util/bimmanagementAPI/fetchBuilding";
import CircularProgress from '@mui/material/CircularProgress'

function BIMelementsview(props) {
    const buildingid = props.buildingid
    const [elements, Setelements] = useState({});
    const [open, setOpen] = useState(false);
    const [postData, SetPostData] = useState({});
    const [projectid, SetProjectId] = useState(buildingid);
    const [selectionModel, setSelectionModel] = useState([]);
    const handleOpen = () => {
        setOpen(true);
        let id = selectionModel[0]
        let element = elements.source.find((element) => element.id === id)
        SetPostData(element)
    };
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 500,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        fetchBuilding(buildingid).then(
            building => {
                SetProjectId(building.subproject.project.id);
                Bimelements(building.info.uri_forge, null).then(res => Setelements(res))
            }
        )
    }, []);
    const handleClick = event => {
        SetisShowForm(current => !current);
    };
    if (!elements.dimensions) return (<h1>loading....<CircularProgress/></h1>)
    if (!elements.source[0]) return (<h1>Can Not Get Element From Model,May Cause No Mcoder</h1>)

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'ElementName', headerName: '元素名称', width: 200},
        {field: 'mcoder', headerName: '表15', width: 130},
        {field: 'coder', headerName: '定额编码', width: 130},
        {field: 'MaterialName', headerName: '材料名称', width: 130},
        {field: 'unit', headerName: '单位', width: 90},
        {field: 'quality', headerName: '量', width: 90},
        {field: 'price', headerName: '价格', width: 90}
    ];
    console.log(elements.source)
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <PriceFormSubmit mcoder={postData.mcoder}
                                     coder={postData.coder}
                                     coder_name={postData.MaterialName}
                                     unit={postData.unit}
                                     projectid={buildingid}/>
                </Box>

            </Modal>
            <Button
                sx={{mb: 2}}
                onClick={() => handleOpen()}
            >
                更新定额
            </Button>
            <div style={{height: 800, width: '100%'}}>
                <DataGrid
                    rows={elements.source}
                    columns={columns}
                    pageSize={50}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                />
            </div>
        </>
    );
}

export default BIMelementsview;