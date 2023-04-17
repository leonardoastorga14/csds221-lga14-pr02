import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Typography} from '@mui/material';
import { DatePicker} from '@mui/lab';
//import DateFnsAdapter from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { Add, Edit } from '@mui/icons-material';
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";


const AddTaskDialog = ({ tasks, onAddTask, onUpdateTask, taskToUpdate, mode, setOpen, onSuccess }) => {
  //const [open, setOpen] = useState(false);
  const [task, setTask] = useState({ title: '', description: '', deadline: '', priority: '', isComplete: false });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleUniqueError, setTitleUniqueError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);

  useEffect(() => {
    if (taskToUpdate) {
      setTask(taskToUpdate);
    }
  }, [taskToUpdate]);


  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const isTitleUnique = (title) => {
    return !tasks.some((task) => task.title === title && task.id !== taskToUpdate?.id);
  };

  

  //const handleAddTask = () => {
    //onAddTask({ ...task, id: Math.random() });
    //setTask({ title: '', description: '', deadline: '', priority: '', isComplete: false });
    //setOpen(false);
  //};

  //const handleUpdateTask = () => {
   // onUpdateTask(task);
    //setSnackbarOpen(true);
    //setOpen(false);
  //};


  const handleAddOrUpdateTask = () => {
    if (task.title === "") {
      setTitleError(true);
      return;
    }

    if (!isTitleUnique(task.title)) {
      setTitleUniqueError(true);
      return;
    }

    if (task.description === "") {
      setDescriptionError(true);
      return;
    }

    if (!task.deadline) {
      setDeadlineError(true);
      return;
    }

    if (!task.priority) {
      setPriorityError(true);
      return;
    }

    if (task.description === "") {
      setDescriptionError(true);
      return;
    }

    if (mode === "update") {
      onUpdateTask(task);
    } else {
      onAddTask({ ...task, id: Math.random() });
    }
    setTask({ title: '', description: '', deadline: '', priority: '', isComplete: false });
    setOpen(false);
    onSuccess();
  };

  const handleDateChange = (date) => {
    setTask({ ...task, deadline: date });
  };

  const handlePriorityChange = (event) => {
    setTask({ ...task, priority: event.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={true} onClose={() => setOpen(false)}>
      <DialogTitle>
          {mode === 'update' ? (
            <>
              <IconButton edge="end" color="inherit">
                <Edit />
              </IconButton>
              Edit Task
            </>
          ) : (
            <>
              <IconButton edge="end" color="inherit">
                <Add />
              </IconButton>
              Add Task
            </>
          )}
        </DialogTitle>
        <DialogContent>
          {mode !== 'update' && (
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={task.title}
            onChange={(e) => {
              setTitleError(false);
              setTask({ ...task, title: e.target.value });
            }}
            error={titleError || titleUniqueError}
            helperText={titleError ? "Title cannot be empty" : titleUniqueError ? "Title must be unique" : ""}
          />
          )}
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={task.description}
            onChange={(e) => {
              setDescriptionError(false);
              setTask({ ...task, description: e.target.value });
            }}
            error={descriptionError}
            helperText={descriptionError ? "Description cannot be empty" : ""}
          />
          <DatePicker
              label="Deadline"
              value={task.deadline}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
              format="MM/dd/yyyy"
              clearable
              error={deadlineError}
              helperText={deadlineError ? "Deadline must be selected" : ""}
            />
          <TextField autoFocus margin="dense" name="title" label="Task" fullWidth onChange={handleChange} value={task.title} />
          <TextField margin="dense" name="description" label="Description" fullWidth onChange={handleChange} value={task.description} />
          <TextField margin="dense" name="deadline" label="Deadline" type="date" fullWidth onChange={handleChange} value={task.deadline} />
          <TextField margin="dense" name="priority" label="Priority" fullWidth onChange={handleChange} value={task.priority} />
          <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="priority"
            name="priority"
            value={task.priority}
            onChange={handlePriorityChange}
            error={priorityError}
            helperText={priorityError ? "Priority must be selected" : ""}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
          {priorityError && (
            <Typography variant="caption" color="error">
              Priority must be selected
            </Typography>
          )}
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddOrUpdateTask} color="primary">{mode === "update" ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    </>
  );
};

export default AddTaskDialog;
