import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Appbar from "./AppbarComponent";
import Drawer from "./DrawerComponent";
import Content from "./ContentComponent";
import DroppableComponent from "../list/DroppableComponent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FooterComponent from "./FooterComponenet";

const drawerWidth = 230;

export default function MainComponent({
    data,
    setData,
    isUpdating,
    setIsUpdating,
    setOpenAdd,
    order,
    setOrder,
    strikethrough,
    setStrikethrough,
    setCurrentTask,
    setUpdateTask,
    setOpenDelete,
    setShowDialog,
    setShowSnackbar,
}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedTasks = data;

        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setData(reorderedTasks);

        setIsUpdating(true);

        try {
            await axios
                .post("/dragSort", {
                    taskId: result.draggableId,
                    newIndex: order
                        ? result.destination.index
                        : result.source.index,
                    order: order,
                })
                .then((res) => {
                    setData(res.data.data);
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
            alert("Error");
            console.error("Error moviendo tarea:", error);
        }
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                bgcolor: "#ddffe3",
                width: "100%",
                height: "100vh",
            }}
        >
            <CssBaseline />
            <Appbar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Drawer
                setOpenAdd={setOpenAdd}
                order={order}
                setData={setData}
                setOrder={setOrder}
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                drawerWidth={drawerWidth}
                setShowDialog={setShowDialog}
                setOpenDelete={setOpenDelete}
            />
            <Box
                component="main"
                sx={{
                    px: 3,
                    width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Grid
                    container
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                >
                    <Grid
                        item
                        xs={12}
                        py={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box
                            component="img"
                            src="/storage/todo.png"
                            width={{ xs: "70%", sm: "40%", lg: "15%" }}
                        ></Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        mb={5}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        {data.length > 0 ? (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <DroppableComponent
                                    isUpdating={isUpdating}
                                    data={data}
                                    strikethrough={strikethrough}
                                    setStrikethrough={setStrikethrough}
                                    setCurrentTask={setCurrentTask}
                                    setUpdateTask={setUpdateTask}
                                    setOpenDelete={setOpenDelete}
                                    setData={setData}
                                    setShowDialog={setShowDialog}
                                    setIsUpdating={setIsUpdating}
                                    setShowSnackbar={setShowSnackbar}
                                    order={order}
                                />
                            </DragDropContext>
                        ) : (
                            <Box sx={{ mt: 3 }}>
                                <Typography>
                                    No tiene tareas en su lista.
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <FooterComponent drawerWidth={drawerWidth} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
