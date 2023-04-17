import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import AddTaskDialog from "./AddTaskDialog";


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");



 const addTask = (newTask) => {
   setTasks([...tasks, newTask]);
 };

 const updateTask = (updatedTask) => {
  setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  setTaskToUpdate(null);
};

const handleSuccess = (message) => {
  setSnackbarMessage(message);
  setSnackbarOpen(true);
};

const handleTaskCompletion = (taskId, isComplete) => {
  setTasks(
    tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: isComplete } : task
    )
  );
};

//const handleDeleteTask = (id) => {
  //setTasks(tasks.filter((task) => task.id !== id));
  //setSnackbarOpen(true);
//};

const handleOpenDialog = (mode, task) => {
  setDialogMode(mode);
  setTaskToUpdate(task);
  setDialogOpen(true);
};

const handleCloseSnackbar = () => {
  setSnackbarOpen(false);
};

const handleEditButtonClick = (task) => {
  setTaskToUpdate(task);
  setDialogMode("update");
  setDialogOpen(true);
};

const handleDeleteButtonClick = (taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId));
  handleSuccess("Task deleted successfully!");
};

 const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(dateString));
};


 return (
   <>
     <AppBar position="static">
       <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           FRAMEWORKS
         </Typography>
         <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={() => handleOpenDialog("add")}
      >
        <Add />
        <Typography variant="body1" sx={{ pl: 1 }}>
          Add Task
        </Typography>
      </IconButton>
       </Toolbar>
     </AppBar>
     <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Task</TableCell>
             <TableCell>Description</TableCell>
             <TableCell>Deadline</TableCell>
             <TableCell>Priority</TableCell>
             <TableCell>Is Complete</TableCell>
             <TableCell>Action</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
               <TableCell component="th" scope="row">
                 {task.title}
               </TableCell>
               <TableCell>{task.description}</TableCell>
               <TableCell>{task.deadline}</TableCell>
               <TableCell>{task.priority}</TableCell>
               <TableCell>{task.isComplete}</TableCell>
               <TableCell>Action</TableCell>
               <TableCell>
              <Checkbox
                checked={task.isComplete}
                onChange={(event) =>
                  handleTaskCompletion(task.id, event.target.checked)
                }
              />
            </TableCell>
               <TableCell>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => handleOpenDialog("update", task)}
              >
                <Edit />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleEditButtonClick(task)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteButtonClick(task.id)} color="secondary">
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} anchorOrigin ={{vertical: "bottom", horizontal: "right"}}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        {dialogOpen && (
          <AddTaskDialog
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            taskToUpdate={taskToUpdate}
            mode={dialogMode}
            setOpen={setDialogOpen}
            onSuccess={() => handleSuccess(dialogMode === "update" ? "Task updated successfully!" : "Task added successfully!")}
          />
        )}
   </>
 );
}


export default App;