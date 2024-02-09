"use client";
import React, { useEffect, useMemo, useState } from "react"
import MUIDataTable from "mui-datatables";
import axios from "axios";
import moment from "moment";
import { Box, Button, Chip, FormControl, Grid, IconButton, InputBase, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddTask, { style } from "./AddTask";
import { Search } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddTaskForm from "./AddTaskForm";

export default function TaskList() {
    const [data, setData] = useState([]);
    // const [apiData, setApiData] = useState({});
    // console.log(apiData);
    const [status, setStatus] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const columns = useMemo(() => {
        return [
            {
                name: "title",
                label: "Title",
                options: {
                    filter: false,
                    sort: true,
                    sortThirdClickReset: true,

                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                    sortThirdClickReset: true,
                    customBodyRender: (value: string) => {
                        // return value.toUpperCase();
                        if (value == "todo") {
                            return "To Do";
                        }
                        if (value == "inprogress") {
                            return "In Progress";
                        }
                        if (value == "completed") {
                            return "Completed";
                        }

                    }
                }
            },
            {
                name: "due_date",
                label: "Due Date",
                options: {
                    filter: false,
                    sort: true,
                    sortThirdClickReset: true,
                    customBodyRender: (value: any) => {
                        return moment(value).format("DD/MM/YYYY")
                    },

                },

            },
            {
                name: "_id",
                label: "Actions",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value: string) => {
                        return (

                            <Stack direction="row" spacing={1}>
                                <Chip
                                    variant="outlined"
                                    color="secondary"
                                    label={"Delete"}
                                    onDelete={() => deleteTask(value)}
                                />
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    label={"Edit"}
                                    deleteIcon={<EditIcon />}
                                    onDelete={() => editTask(value)}
                                />

                            </Stack>

                        )
                    },

                },

            },
        ];
    }, [data])

    const fetchData = async () => {
        try {
            let conditions = "sortBy=created_on&sortOrder=desc"
            if (status && status != 'all') {
                conditions += "&filterField=status&filterValue=" + status;
            }
            if (searchText) {
                conditions += "&search=" + searchText;
            }

            const response = await axios.get('http://localhost:9000/tasks?' + conditions);
            console.log(response);
            setData(response.data);
        } catch (e) {
            console.log("error")
        }
    }


    useEffect(() => {
        fetchData();
    }, [status, searchText]);


    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const editTask = (id: string) => {
        handleOpen();
        const item = data.filter((d: any) => d._id == id)[0]
        setSelectedItem(item)
    }

    const deleteTask = (id: string) => {
        console.log(id);
        axios.delete(`http://localhost:9000/task/${id}`).then(res => {
            console.log(res);
            fetchData();
        }).catch(err => {
            console.log(err)
        })
    }
    const refreshData = () => {
        fetchData();
    }
    return (
        <>

            <MUIDataTable
                title={"Tasks List"}
                data={data}
                columns={columns}
                components={{

                    TableToolbar: (da) => {
                        return <TableHeader refreshData={refreshData} status={status} handleChange={handleChange} searchText={searchText} setSearchText={setSearchText} />
                    }
                }}
                options={{

                    sort: true,
                    download: false,
                    print: false,
                    selectableRows: "none",

                    onFilterChange: (changedColumn, filterList) => {
                        // console.log(changedColumn, filterList)
                        // setApiData({
                        //     ...apiData,
                        //     filterData: {
                        //         column: changedColumn,
                        //         value: filterList[2]
                        //     }
                        // })
                    }
                }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddTaskForm selectedItem={selectedItem} handleClose={handleClose} refreshData={refreshData} />
                </Box>
            </Modal>
        </>
    )

}

const TableHeader = ({ status, handleChange, searchText, setSearchText, refreshData }: any) => {


    return (
        <Box sx={{ flexGrow: 1, paddingTop: 1.5, paddingLeft: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">

                        <TextField
                            label="Search"
                            id="search"
                            defaultValue=""
                            size="small"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            variant="outlined"
                            autoFocus
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8} sx={{
                    textAlign: "-webkit-right",
                }}>
                    <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status-select"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                            sx={{
                                textAlign: "left",
                            }}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"todo"}>To do</MenuItem>
                            <MenuItem value={"inprogress"}>In progress</MenuItem>
                            <MenuItem value={"completed"}>Completed</MenuItem>
                        </Select>

                    </FormControl>
                    <FormControl sx={{ m: 1 }} size="medium">
                        <AddTask refreshData={refreshData} />

                    </FormControl>
                </Grid>

            </Grid>
        </Box>


    )
} 