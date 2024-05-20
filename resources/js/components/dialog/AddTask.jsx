import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddTask({
    open,
    setOpen,
    setData,
    currentTask,
    updateTask,
    setUpdateTask,
    setCurrentTask,
    setShowSnackbar,
    order,
}) {
    const [desc, setDesc] = React.useState("");
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (updateTask) {
            setDesc(currentTask.description);
        }
    }, [updateTask]);

    const handleClose = () => {
        setOpen(false);
        setUpdateTask(false);
        setCurrentTask({});
        setDesc("");
        setError(false);
    };

    const addTaskHandler = async (e) => {
        e.preventDefault();
        if (desc !== "") {
            setError(false);
            try {
                await axios
                    .post(`/addTask`, {
                        name: desc,
                        order: order,
                    })
                    .then((res) => {
                        setData(res.data.data);
                        setShowSnackbar({
                            show: true,
                            text: "Tarea agregada exitosamente",
                            type: "success",
                        });
                    })
                    .catch((error) => {
                        alert("Error");
                    });
            } catch (error) {
                console.log(error);
            }

            handleClose();
        } else {
            setError(true);
        }
    };

    const updateTaskHandler = async (e) => {
        e.preventDefault();
        if (desc !== "") {
            try {
                setError(false);
                await axios
                    .put(`/updateTask`, {
                        id: currentTask.id,
                        name: desc,
                        order: order,
                    })
                    .then((res) => {
                        setData(res.data.data);
                        setShowSnackbar({
                            show: true,
                            text: "Tarea editada exitosamente",
                            type: "success",
                        });
                    })
                    .catch((error) => {
                        alert("Error");
                    });
            } catch (error) {
                console.log(error);
            }

            handleClose();
        } else {
            setError(true);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: "Figtree" }}>
                {updateTask ? "Editar tarea" : "Agregar nueva tarea"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Nombre de la tarea"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={desc}
                    onChange={(event) => {
                        setDesc(event.target.value);
                    }}
                    color="success"
                    multiline
                    maxRows={5}
                    inputProps={{ maxLength: 255 }}
                    error={desc === "" && error}
                    helperText={
                        desc === "" && error ? "Debe completar este campo" : ""
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="success"
                    sx={{ fontFamily: "Figtree" }}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    onClick={
                        updateTask
                            ? (e) => updateTaskHandler(e)
                            : (e) => addTaskHandler(e)
                    }
                    variant="contained"
                    color="success"
                    sx={{ fontFamily: "Figtree" }}
                >
                    {updateTask ? "Guardar" : "Agregar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
