import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Typography from "@mui/material/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ListItemComponent({
    provided,
    task,
    strikethrough,
    setStrikethrough,
    setCurrentTask,
    setUpdateTask,
    setOpenDelete,
    setData,
    setShowDialog,
    tasksL,
    handleUpDown,
    index,
    moving,
    order,
}) {
    const handleChange = async (event, taskId) => {
        event.preventDefault();
        if (event.target.checked) {
            let strike = strikethrough;
            strike.push(taskId);
            console.log(strike);
            setStrikethrough(strike);
        } else {
            let strike = strikethrough.filter((item) => item !== taskId);

            setStrikethrough(strike);
        }

        await axios
            .put(`/check/${taskId}/${event.target.checked}/${order}`)
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Error");
            });
    };

    const handleUpdate = (event, task) => {
        event.preventDefault();
        setCurrentTask(task);
        setUpdateTask(true);
    };

    const handleDelete = (event, task) => {
        event.preventDefault();
        setCurrentTask(task);
        setOpenDelete(true);
        setShowDialog({
            title: "Eliminar tarea",
            text: `¿Confirma eliminar la tarea ${task.description}?`,
            type: "delete",
        });
    };

    return (
        <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={moving === task.id ? "move" : ""}
            sx={{
                textDecoration: task.strikethrough ? "line-through" : "none",
                textDecorationColor: "#8a868e",
                color: task.strikethrough ? "#8a868e" : "#000",
                bgcolor: "#FFF",
                m: 0,
                boxShadow: 0.5,
                width: "100%",
                justifyContent: "space-between",
                mb: 0.4,
                borderRadius: 2,
                "&.move": {
                    transition:
                        "transform 0.3s ease-in-out, font-size 0.3s ease-in-out",
                    transform: "scale(1.04)",
                },
            }}
        >
            <ListItemText
                sx={{
                    width: "100%",
                }}
                primaryTypographyProps={{
                    variant: "subtitle2",
                    style: {
                        wordBreak: "break-word",
                        // whiteSpace: "normal",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                    },
                }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center">
                        <Tooltip title="Tachar tarea">
                            <Checkbox
                                edge="start"
                                checked={strikethrough.includes(task.id)}
                                tabIndex={-1}
                                disableRipple
                                style={{
                                    color: "#00fa30",
                                }}
                                onChange={(e) => handleChange(e, task.id)}
                                // inputProps={{
                                //     "aria-labelledby":
                                //         labelId,
                                // }}
                            />
                        </Tooltip>
                        <Typography
                            fontSize={14}
                            sx={{ fontFamily: "Figtree" }}
                            fontWeight={600}
                            maxWidth={{ xs: "100%", md: "90%", lg: "92%" }}
                        >
                            {task.description}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography
                            fontSize={14}
                            sx={{ fontFamily: "Figtree" }}
                            noWrap
                        >
                            (Prioridad: {task.priority})
                        </Typography>
                        <Tooltip title="Editar">
                            <IconButton
                                aria-label="comment"
                                onClick={(e) => handleUpdate(e, task)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Borrar">
                            <IconButton
                                aria-label="comment"
                                onClick={(e) => handleDelete(e, task)}
                            >
                                <CloseIcon
                                    sx={{
                                        color: "#ff8787",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Stack direction="column">
                            {task.length}
                            {task.priority !== 1 && (
                                <Tooltip title="Mover arriba">
                                    <IconButton
                                        aria-label="comment"
                                        sx={{ p: 0 }}
                                        onClick={(e) =>
                                            handleUpDown(
                                                1,
                                                index,
                                                task.id,
                                                order
                                            )
                                        }
                                    >
                                        <ArrowDropUpIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {task.priority !== tasksL && (
                                <Tooltip title="Mover abajo">
                                    <IconButton
                                        aria-label="comment"
                                        sx={{ p: 0 }}
                                        onClick={(e) =>
                                            handleUpDown(
                                                -1,
                                                index,
                                                task.id,
                                                order
                                            )
                                        }
                                    >
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </ListItemText>
        </ListItem>
    );
}
