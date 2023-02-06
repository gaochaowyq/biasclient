import {useState} from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// Custom styles for the MDAlert

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

function MDModal({open, handleClose, Title, Message}) {
    const [alertStatus, setAlertStatus] = useState("mount");

    // The base template for the alert
    const modalTemplate = (open, handleClose, Title, Message) => (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {Title}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {Message}
                </Typography>
            </Box>
        </Modal>
    );
    return modalTemplate(open, handleClose, Title, Message);
}

// Setting default values for the props of MDAlert
MDModal.defaultProps = {
    open: false,
    handleClose: () => {
    },
    Title:"错误信息",
    Message:" "
};

// Typechecking props of the MDAlert
MDModal.propTypes = {
    open:PropTypes.bool,
    handleClose: PropTypes.func,
    Title: PropTypes.string,
    Message: PropTypes.string
};

export default MDModal;