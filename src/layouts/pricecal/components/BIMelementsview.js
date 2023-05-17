import {useState, useEffect, useContext} from "react";
import {DataGrid} from '@mui/x-data-grid';

import {fecthBimElements} from "./bimelements";
import PriceFormSubmit from "./postBprice";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {fetchBuilding} from "util/bimmanagementAPI/fetchBuildings";
import CircularProgress from '@mui/material/CircularProgress'
import useForgeToken from "../../../util/forgeAPI/useForgeToken";
import {authContext} from "../../../context/AuthContext";

function BIMelementsview(props) {
    const {token, admin} = useContext(authContext);
    const forgeToken = useForgeToken();

    const buildingid = props.buildingid
    const [elements, Setelements] = useState();
    const [open, setOpen] = useState(false);
    //const [coder, setCoder] = useState(props.coder);
    const [postData, SetPostData] = useState({});
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
        console.log(props.coder)
        fetchBuilding(token, buildingid).then(
            building => {
                fecthBimElements(forgeToken, building.info.uri_forge, props.coder).then(res => Setelements(res))
            }
        )
    }, [props.coder]);
    const handleClick = event => {
        SetisShowForm(current => !current);
    };

    return (
        <>
            {elements && <DataGrid
                rows={elements.rows}
                columns={elements.columns}
                pageSize={50}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
            />}
        </>
    );
}

export default BIMelementsview;