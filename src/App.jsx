import React from 'react';
import shortId from 'shortid';

function App() {
  const [task, setTask] = React.useState('');
  const [list, setList] = React.useState([]);
  const [modeEdition, setModoEdition] = React.useState(false);
  const [id, setId] = React.useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log('Empty item');
      return;
    }
    setList([...list, { id: shortId.generate(), task }]);
    setTask('');
  };

  const eraseTask = (id) => {
    const filteredArray = list.filter(item => item.id !== id);
    setList(filteredArray);
  };

  const editMode = (item) => {
    console.log(item);
    setModoEdition(true);
    setTask(item.task);
    setId(item.id);
  };

  const editTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log('Empty item');
      return;
    }
    const arrayEdited = list.map(item => item.id === id ? { id, task } : item);
    setList(arrayEdited);
    setModoEdition(false);
    setTask('');
    setId('');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD - Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
          <ul className="list-group">
            {list.map((item, index) => {
              return (<li id={item.id} className="list-group-item mx-4" key={index}>
                <span className="lead">{item.task}</span>
                <button
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => { eraseTask(item.id) }}>
                  Erase
                </button>
                <button
                  className="btn btn-warning btn-sm float-right"
                  onClick={() => { editMode(item) }}>
                  Edit
                </button>
              </li>)
            })}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{
            modeEdition ? 'Task Edit' : 'Add Task'
          }</h4>
          <form onSubmit={modeEdition ? editTask : addTask} >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Introduce Task"
              onChange={(e) => { setTask(e.target.value) }}
              value={task}
            />
            {
              modeEdition ?
                (<button type="submit" className="btn btn-warning btn-block">Edit</button>)
                :
                (<button type="submit" className="btn btn-dark btn-block">Add</button>)
            }
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
