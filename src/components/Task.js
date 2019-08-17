import React from "react";
import "../styles/Task.css";

const Task = props => {
  const {name, done, prio, uid} = props.task;
  const task = props.task;

  if (!done) {
    return (
      <div
        className="Task"
        id={uid}
        style={
          prio
            ? {
                backgroundColor: "rgba(242, 38, 19, 0.3)",
                border: "1px solid black"
              }
            : null
        }>
        <h1>{name}</h1>

        {prio ? (
          <span className="icon-important">
            <i className="fas fa-exclamation" />
          </span>
        ) : null}

        <span className="icon-close" onClick={() => props.removeData(task)}>
          <i className="fas fa-times-circle" />
        </span>
        <span className="icon-edit" onClick={() => props.updateData(task)}>
          <i className="fas fa-edit" />
        </span>
        <span className="icon-done" onClick={() => props.doneHandler(uid)}>
          <i className="fas fa-check-circle" />
        </span>
      </div>
    );
  } else {
    return (
      <div className="Task" id={uid}>
        <h1>{name}</h1>

        <span className="icon-close" onClick={() => props.removeData(task)}>
          <i className="fas fa-times-circle" />
        </span>
      </div>
    );
  }
};

export default Task;
