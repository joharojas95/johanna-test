import { Draggable } from "react-beautiful-dnd";
import ListItemComponent from "./ListItemComponent";

export default function DraggableComponent({
    task,
    index,
    strikethrough,
    setStrikethrough,
    setCurrentTask,
    setUpdateTask,
    setOpenDelete,
    setData,
    setShowDialog,
    tasksL,
    handleUpDown,
    moving,
    order,
}) {
    return (
        <Draggable
            key={task.id.toString()}
            draggableId={task.id.toString()}
            index={index}
        >
            {(provided) => (
                <ListItemComponent
                    provided={provided}
                    task={task}
                    strikethrough={strikethrough}
                    setStrikethrough={setStrikethrough}
                    setCurrentTask={setCurrentTask}
                    setUpdateTask={setUpdateTask}
                    setOpenDelete={setOpenDelete}
                    setData={setData}
                    setShowDialog={setShowDialog}
                    tasksL={tasksL}
                    handleUpDown={handleUpDown}
                    index={index}
                    moving={moving}
                    order={order}
                />
            )}
        </Draggable>
    );
}
