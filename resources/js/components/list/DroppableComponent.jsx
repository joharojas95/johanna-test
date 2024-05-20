import { Droppable } from "react-beautiful-dnd";

import ListComponent from "./ListComponent";

export default function DroppableComponent({
    isUpdating,
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
    return (
        <Droppable droppableId="droppable" isDropDisabled={isUpdating}>
            {(provided) => (
                <ListComponent
                    provided={provided}
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
            )}
        </Droppable>
    );
}
