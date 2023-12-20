import TaskCard from "./TaskCard";

const TaskContainer = ({
  title,
  list,
  onStatusChange,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <div className="col card mt-2 mx-2 overflow-auto">
      <h3 className="text-center card-header">{title}</h3>
      <br />
      <div className="task-card">
        {list.map((task) => (
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
