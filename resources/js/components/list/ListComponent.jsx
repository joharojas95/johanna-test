import { useState } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

import DraggableComponent from "./DraggableComponent";

export default function ListComponent({
    provided,
    data,
    strikethrough,
    setStrikethrough,
    setCurrentTask,
    setUpdateTask,
    setOpenDelete,
    setData,
    setShowDialog,
    setIsUpdating,
    setShowSnackbar,
    order,
}) {
    let dataL = data.length;

    const [moving, setMoving] = useState(null);

    // Handle the drag end event
    const handleUpDown = async (choice, index, taskId) => {
        console.log(index);
        console.log(choice === 1 ? index - 1 : index + 1);
        setIsUpdating(true);
        setMoving(taskId);
        try {
            await axios
                .post("/dragSort", {
                    taskId: taskId,
                    newIndex: choice === 1 ? index - 1 : index + 1,
                    order: order,
                })
                .then((res) => {
                    setData(res.data.data);
                    setShowSnackbar({
                        show: true,
                        text: "Tarea movida exitosamente",
                        type: "success",
                    });
                })
                .catch((error) => {
                    setIsUpdating(false);
                    alert("Error");
                })
                .finally(function () {
                    setIsUpdating(false);
                });
        } catch (error) {
            setIsUpdating(false);
            console.error("Error moviendo tarea:", error);
        }
        setTimeout(() => {
            setMoving(null);
        }, 300);
    };

    return (
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12} lg={8}>
                <List ref={provided.innerRef} {...provided.droppableProps}>
                    {data.map((task, index) => (
                        <DraggableComponent
                            key={"draggable_" + index}
                            task={task}
                            index={index}
                            strikethrough={strikethrough}
                            setStrikethrough={setStrikethrough}
                            setCurrentTask={setCurrentTask}
                            setUpdateTask={setUpdateTask}
                            setOpenDelete={setOpenDelete}
                            setData={setData}
                            setShowDialog={setShowDialog}
                            tasksL={dataL}
                            handleUpDown={handleUpDown}
                            moving={moving}
                            order={order}
                        />
                    ))}
                    {provided.placeholder}
                </List>
            </Grid>
        </Grid>
    );
}
