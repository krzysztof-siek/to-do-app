import React from "react";
import Task from "./Task";

const TaskList = props => {
  const {taskList} = props;
  const toDoTask = taskList
    .filter(task => !task.done)
    .map(task => (
      <Task
        key={task.uid}
        task={task}
        removeData={props.removeData}
        updateData={props.updateData}
        doneHandler={props.doneHandler}
      />
    ));

  const doneTask = taskList
    .filter(task => task.done)
    .map(task => (
      <Task
        key={task.uid}
        task={task}
        removeData={props.removeData}
        updateData={props.updateData}
        doneHandler={props.doneHandler}
      />
    ));

  return (
    <div className="TaskList">
      <div className="toDoTasks">
        {toDoTask.length > 0 ? (
          <h2 className="section">Do zrobiena:{toDoTask.length}</h2>
        ) : (
          <h2>Brak zadań do zrobinia.</h2>
        )}
        {toDoTask}
      </div>
      <div className="doneTasks">
        {doneTask.length > 0 ? (
          <h2 className="section">Zrobione: {doneTask.length}</h2>
        ) : (
          <h2>Brak zadań zrobionych</h2>
        )}
        {doneTask}
      </div>
    </div>
  );
};

export default TaskList;
