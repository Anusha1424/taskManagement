import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddTaskForm from './AddTaskForm';

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%', // Adjusted width to 75%
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddTask({ refreshData }: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} size="medium" variant="outlined" startIcon={<AddBoxIcon />}>
                Add
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddTaskForm handleClose={handleClose} refreshData={refreshData} />
                </Box>
            </Modal>
        </div>
    );
}
