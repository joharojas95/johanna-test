import { useState } from "react";
import { createRoot } from "react-dom/client";
import MainComponent from "./components/layout/MainComponent";
import AddTask from "./components/dialog/AddTask";
import ConfirmDialog from "./components/dialog/ConfirmDialog";
import SnackBar from "./components/ui/SnackBar";

const initialSnackbar = {
    show: false,
    text: "",
    type: "success",
};

const initialDialog = {
    title: "",
    text: "",
    type: "",
};

export default function Index({ tasks }) {
    const [data, setData] = useState(tasks);
    const [order, setOrder] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [strikethrough, setStrikethrough] = useState(
        tasks.filter((item) => item.strikethrough).map((item) => item.id)
    );
    const [currentTask, setCurrentTask] = useState({});
    const [updateTask, setUpdateTask] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [showSnackbar, setShowSnackbar] = useState(initialSnackbar);
    const [showDialog, setShowDialog] = useState(initialDialog);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSnackbar({
            ...showSnackbar,
            show: false,
        });
    };

    return (
        <>
            <MainComponent
                data={data}
                setData={setData}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                setOpenAdd={setOpenAdd}
                order={order}
                setOrder={setOrder}
                strikethrough={strikethrough}
                setStrikethrough={setStrikethrough}
                setCurrentTask={setCurrentTask}
                setUpdateTask={setUpdateTask}
                setOpenDelete={setOpenDelete}
                setShowDialog={setShowDialog}
                setShowSnackbar={setShowSnackbar}
            />
            <AddTask
                setOpen={setOpenAdd}
                open={openAdd || updateTask}
                setData={setData}
                currentTask={currentTask}
                updateTask={updateTask}
                setUpdateTask={setUpdateTask}
                setCurrentTask={setCurrentTask}
                setShowSnackbar={setShowSnackbar}
                order={order}
            />
            <ConfirmDialog
                setOpen={setOpenDelete}
                open={openDelete}
                setData={setData}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setShowSnackbar={setShowSnackbar}
                title={showDialog.title}
                text={showDialog.text}
                type={showDialog.type}
                order={order}
                setStrikethrough={setStrikethrough}
            />
            <SnackBar
                show={showSnackbar.show}
                onClose={handleCloseSnackBar}
                type={showSnackbar.type}
                message={showSnackbar.text}
            />
        </>
    );
}
if (document.getElementById("main")) {
    const thisElement = document.getElementById("main");
    let props = Object.assign({}, thisElement.dataset);
    createRoot(document.getElementById("main")).render(
        <Index tasks={JSON.parse(props.tasks)} />
    );
}
