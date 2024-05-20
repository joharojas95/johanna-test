import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function ConfirmDialog({
    open,
    setOpen,
    setData,
    currentTask,
    setCurrentTask,
    setShowSnackbar,
    title,
    text,
    type,
    order,
    setStrikethrough,
}) {
    const handleClose = () => {
        setOpen(false);
        setCurrentTask({});
    };

    const deleteTask = async () => {
        try {
            await axios
                .delete(`/deleteTask/${currentTask.id}/${order}`)
                .then((res) => {
                    setData(res.data.data);
                    setShowSnackbar({
                        show: true,
                        text: "Tarea eliminada exitosamente",
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
    };

    const deleteAll = async () => {
        try {
            await axios
                .delete(`/deleteAll/${order}`)
                .then((res) => {
                    setData(res.data.data);
                    setShowSnackbar({
                        show: true,
                        text: "Tareas eliminadas exitosamente",
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
    };

    const reset = async () => {
        try {
            await axios
                .put(`/reset`, {
                    order: order,
                })
                .then((res) => {
                    setData(res.data.data);
                    setStrikethrough(
                        res.data.data
                            .filter((item) => item.strikethrough)
                            .map((item) => item.id)
                    );
                    setShowSnackbar({
                        show: true,
                        text: "Tareas reseteadas exitosamente",
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
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    if (type === "deleteAll") {
                        deleteAll();
                    } else if (type === "reset") {
                        reset();
                    } else {
                        deleteTask();
                    }
                },
            }}
        >
            <DialogTitle sx={{ fontFamily: "Figtree" }}>{title}</DialogTitle>{" "}
            {/*  Eliminar tarea */}
            <DialogContent sx={{ fontFamily: "Figtree" }}>
                {text}{" "}
                {/*  ¿Confirma la eliminación de la tarea {currentTask.description}? */}
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
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ fontFamily: "Figtree" }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
