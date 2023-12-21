import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const TaskContainer = ({
  title,
  list,
  onStatusChange,
  onDeleteTask,
  onEditTask,
  onTaskDrop,
}) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item),
  });

  const sortedList = [...list].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });

  const onDrop = (item) => {
    onTaskDrop(item.id, title);
  };

  return (
    <div ref={drop} className="col card my-2 mx-1">
      <h3 className="text-center card-header">
        {title} ({sortedList.length})
      </h3>
      <br />
      <div
        className="task-card"
        style={{ maxHeight: "76vh", overflowY: "auto" }}
      >
        {sortedList.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
