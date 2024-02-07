"use client";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Profile from '../../components/Profile';
import TaskList from '../../components/TaskList';


export default function Tasks() {
  return (
    <Box sx={{ flexGrow: 1, padding: 1, }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Profile />
        </Grid>
        <Grid item xs={9}>
          <TaskList />
        </Grid>
      </Grid>
    </Box>
  )
}