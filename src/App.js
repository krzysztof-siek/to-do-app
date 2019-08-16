import React from "react";
import "./styles/App.css";
import Firebase from "firebase";
import config from "./config";
import TaskList from "./components/TaskList";
import {TimelineLite, Power2} from "gsap/all";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      taskList: [],
      prio: false
    };
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log("DATA RETRIEVED");
  };

  componentDidMount() {
    this.getUserData();
    const bgc = new TimelineLite();
    bgc
      .fromTo(".App", 1, {width: 10}, {width: "100vw"})
      .fromTo(
        ".App",
        1,
        {height: 1},
        {height: "100vh", ease: Power2.easeInOut}
      );
    const headerTxt = new TimelineLite();
    headerTxt.delay(2).fromTo(".logo", 1, {y: -200}, {y: 0});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  removeData = task => {
    const taskList = [...this.state.taskList];
    const newState = taskList.filter(data => {
      return data.uid !== task.uid;
    });
    this.setState({taskList: newState});
  };

  updateData = task => {
    if (task.prio) {
      this.setState({prio: true});
    } else {
      this.setState({prio: false});
    }
    this.refs.uid.value = task.uid;

    this.refs.name.value = task.name;
  };

  prioHandler = e => {
    this.setState({prio: !this.state.prio});
  };

  handleSubmit = event => {
    event.preventDefault();

    let name = this.refs.name.value;
    let prio = this.state.prio;
    let uid = this.refs.uid.value;

    if (uid && name) {
      const {taskList} = this.state;
      const devIndex = taskList.findIndex(data => {
        return data.uid === uid;
      });
      taskList[devIndex].name = name;
      taskList[devIndex].prio = prio;
      this.setState({taskList});
    } else if (name) {
      const uid = new Date().getTime().toString();
      const done = false;
      const {taskList} = this.state;
      taskList.unshift({uid, name, prio, done});
      this.setState({taskList});
      console.log("poszło");
    }
    this.setState({prio: false});

    this.refs.name.value = "";

    this.refs.uid.value = "";
  };

  doneHandler = id => {
    const taskList = [...this.state.taskList];
    taskList.map(el => {
      if (el.uid === id) {
        el.done = true;
      }
      this.setState({taskList});
    });
  };

  render() {
    return (
      <div class="wrapper">
        <div className="App">
          <div class="addTask">
            <div class="logo">
              <h3>Aplikacja To Do</h3>
            </div>
            <form onSubmit={this.handleSubmit} className="form">
              <input type="hidden" ref="index" />
              <input type="text" ref="name" placeholder="Dodaj zadanie" />

              <label> Priorytet </label>

              <input
                type="checkbox"
                onChange={this.prioHandler}
                checked={this.state.prio}
              />
              <button type="submit" className="addTaskButton">
                Dodaj
              </button>
              <input type="hidden" ref="uid" />
            </form>
          </div>

          <TaskList
            taskList={this.state.taskList}
            removeData={this.removeData}
            updateData={this.updateData}
            doneHandler={this.doneHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
