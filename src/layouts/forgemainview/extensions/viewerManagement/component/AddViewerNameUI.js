import React, {useState, useEffect} from "react";
import {fetchProjectViewer, postProjectViewer, removeProjectViewer} from "util/bimmanagementAPI/fetchProjectViewer";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import RemoveIcon from '@mui/icons-material/Remove';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const theme = createTheme(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    button: {
        margin: theme.spacing(1)
    }
}));


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const AddViewerNameUI = ({viewer, projectid}) => {
    const [savedviewer, setSavedViewer] = useState([{}]);
    const [open, setOpen] = useState(false);
    const [viewername, setViewerName] = useState("");
    const [currentviewindex, setCurrentViewIndex] = useState(0);

    useEffect(() => {
        fetchProjectViewer(projectid).then(
            res => {
                if (res != null) {
                    setSavedViewer(res.viewer)
                } else {
                    console.log("no viewer saved here")
                }
            }
        )
    }, [])
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const createViewer = () => {
        let currentState = viewer.getState();
        currentState["name"] = viewername;
        postProjectViewer(projectid, currentState).then(
            res => {
                if (res !== null) {
                    setOpen(false)
                    setSavedViewer(res.viewer)
                    alert("create viewer success")
                }
            }
        )
    }

    const handleClickSubtraction = () => {
        const _viewername = savedviewer[currentviewindex].name
        removeProjectViewer(projectid, _viewername).then(
            res => {
                console.log(res)
            }
        )

    }
    const handleTabChange = (event, tabindx) => {
        setCurrentViewIndex(tabindx)
        let currentview = savedviewer[tabindx]
        viewer.restoreState(currentview)
    }

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        视图名称
                    </Typography>
                    <TextField id="outlined-basic" label="视图名称" variant="outlined" value={viewername}
                               onChange={(event) => {
                                   setViewerName(event.target.value);
                               }}/>
                    <Button onClick={createViewer}>创建视图</Button>

                </Box>
            </Modal>
            <Box sx={{maxWidth: {xs: '70%', sm: 480}}}>
                    <Tabs
                        value={currentviewindex}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons
                        sx={{
                            '.MuiTabs-scrollButtons': {
                                color: '#3f51b5',
                                fontSize: '36px'

                            },
                        }}
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        {savedviewer.map(
                            (item, index) => {
                                return <Tab key={index} id={index} label={item.name}/>
                            }
                        )
                        }


                    </Tabs>
                    <IconButton aria-label="addview" onClick={handleClick}>
                        <AddIcon>添加视图 </AddIcon>
                    </IconButton>
                    <IconButton aria-label="addview" onClick={handleClickSubtraction}>
                        <RemoveIcon/>
                    </IconButton>
            </Box>

        </ThemeProvider>
    )
        ;
}

export default AddViewerNameUI