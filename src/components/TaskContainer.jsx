import TaskCard from "./TaskCard";

const TaskContainer = ({ title, list, onStatusChange }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="task-card">
        {list.map((task) => (
          <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
