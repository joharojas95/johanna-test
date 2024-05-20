import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";

export default function DrawerComponent({
    window,
    setOpenAdd,
    order,
    setData,
    setOrder,
    mobileOpen,
    handleDrawerTransitionEnd,
    handleDrawerClose,
    drawerWidth,
    setShowDialog,
    setOpenDelete,
}) {
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
        handleDrawerClose();
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
        handleDrawerClose();
        setShowDialog({
            title: "Eliminar todas las tareas",
            text: "¿Confirma la eliminación de todas las tareas existentes?",
            type: "deleteAll",
        });
    };

    const handleClickOpenReset = () => {
        setOpenDelete(true);
        handleDrawerClose();
        setShowDialog({
            title: "Resear tareas",
            text: "¿Confirma resetear las tareas? Se colocarán las tareas iniciales por defecto.",
            type: "reset",
        });
    };

    const menuButtons = [
        {
            name: "Agregar tarea",
            icon: <AddIcon sx={{ color: "#00fa30" }} />,
            action: handleClickOpenAdd,
        },
        {
            name: "Resetear tareas",
            icon: <RestartAltIcon sx={{ color: "#00fa30" }} />,
            action: handleClickOpenReset,
        },
        {
            name: "Borrar todas las tareas",
            icon: <DeleteIcon sx={{ color: "#00fa30" }} />,
            action: handleClickOpenDelete,
        },
    ];

    const handleChange = async (event) => {
        setOrder(event.target.checked);
        event.preventDefault();

        try {
            await axios
                .get(`/sort/${event.target.checked}`)
                .then((res) => {
                    console.log(res.data.data);
                    setData(res.data.data);
                })
                .catch((error) => {
                    alert("Error");
                });
        } catch (error) {
            console.log(error);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List sx={{ p: 0 }}>
                {/* <ListItem key={"sortTask"} disablePadding>
                    <ListItemButton>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={order}
                                    onChange={handleChange}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                            color: "#00FA30", // Color del círculo cuando está activado
                                        },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                            {
                                                backgroundColor: "#7fff96", // Color del track cuando está activado
                                            },
                                    }}
                                />
                            }
                            label={
                                order ? (
                                    <Typography
                                        fontFamily="Figtree"
                                        fontSize={14}
                                    >
                                        Orden ascendiente
                                    </Typography>
                                ) : (
                                    <Typography
                                        fontFamily="Figtree"
                                        fontSize={14}
                                    >
                                        Orden descendiente
                                    </Typography>
                                )
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <Divider /> */}
                {menuButtons.map((text, index) => (
                    <>
                        <ListItem key={"menu" + index} disablePadding>
                            <ListItemButton
                                onClick={text.action}
                                sx={{ minHeight: "54px" }}
                            >
                                <ListItemIcon sx={{ minWidth: "48px" }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text.name}
                                    primaryTypographyProps={{
                                        style: {
                                            fontFamily: "Figtree",
                                            fontSize: 14,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
