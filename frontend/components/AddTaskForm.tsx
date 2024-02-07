import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';


interface FormData {
    title: string;
    description: string;
    status: string;
    due_date: any;
}

const AddTaskForm: React.FC<any> = ({ handleClose, refreshData, selectedItem }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        status: '',
        due_date: null,
    });
    console.log(formData);
    const [formError, setFormError] = useState<string>("");
    console.log(formData);

    useEffect(() => {
        if (selectedItem && selectedItem._id) {
            setFormData({
                title: selectedItem.title,
                description: selectedItem.description,
                status: selectedItem.status,
                due_date: moment(selectedItem.due_date),
            })
        }
    }, [selectedItem])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormError("")
        setFormData({ ...formData, [name as string]: value });
    };


    const handleStatusChange = (event: SelectChangeEvent) => {
        setFormError("")
        setFormData({ ...formData, status: event.target.value });
    };


    const handleDateChange = (date: Date | null) => {
        setFormError("")
        setFormData({ ...formData, due_date: date });
    };

    const handleSave = () => {
        if (formData.title && formData.description && formData.status && formData.due_date && moment(formData.due_date).isValid()) {
            if (selectedItem && selectedItem._id) {
                axios.put(`http://localhost:9000/task/${selectedItem._id}`, formData).then(response => {
                    console.log(response);
                    refreshData();
                }).catch(e => {
                    console.log(e);

                });
            } else {

                axios.post('http://localhost:9000/task', formData).then(response => {
                    console.log(response);
                    refreshData();
                }).catch(e => {
                    console.log(e);

                });
            }
            handleClose();
        } else {
            setFormError("* Please Enter All Fields Data")
        }
    };


    return (
        <form style={{}}>
            <Typography variant="h5" gutterBottom>
                Add Task
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size='small'
                />
                <div style={{ width: "10px" }} />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size='small'
                />
            </Box>

            <Box display="flex" justifyContent="space-between">
                <FormControl fullWidth margin="normal" size="small" >
                    <InputLabel id="select-label">Status</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Select Box"
                        name="status"
                        value={formData.status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="inprogress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ width: "10px" }} />

                <FormControl fullWidth margin="normal" size="small" >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            slotProps={{ textField: { size: 'small' } }}
                            label="Due date"
                            value={formData.due_date}
                            onChange={handleDateChange}
                            format="DD/MM/YYYY"
                        />

                    </LocalizationProvider>
                </FormControl>

            </Box>
            {formError &&
                <Box display="flex" justifyContent="flex-start" marginTop={2}>
                    <Typography variant="body1" color={"red"}>
                        {formError}
                    </Typography>
                </Box>}
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                <Button variant="outlined" color="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleClose()} style={{ marginLeft: 10 }}>
                    Close
                </Button>
            </Box>
        </form>
    );
};

export default AddTaskForm;
