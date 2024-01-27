import '../styles/tile.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 5
};

function Tile(props) {

    const justDay = (props.date).split(" ")[0];
    const justName = (props.username).split('@')[0];

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return(
        <>
            <div 
                className={'tile date' + (props.isBooked ? ' booked' : '')}
                onClick={handleOpen}
            >
                <div className='date-container'>
                    <div className={(props.today ? 'date-day today' : 'date-day')}>
                        {justDay}
                    </div>
                    <div className='date-username'>
                        {justName}
                    </div>
                </div>
            </div>  

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {props.date}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {props.isBooked ? 
                        "Bokad: " + props.username 
                        : 
                        "Tomt i stugan!"}
                    </Typography>
                    <Typography >
                        {props.isBooked ? 
                        "Anteckning: " + "Vi ska upp o krascha en till båt, fylla på båtkyrkogården helt enkelt." 
                        : 
                        ""}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default Tile;