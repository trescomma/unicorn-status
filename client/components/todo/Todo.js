import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTodos } from '../../actions/index.js';
import axios from 'axios';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      textInput: ''
    }
  }

  handleChange() {
    let todo = document.getElementById('todo-input').value;

    this.setState({
      textInput: todo
    });
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.concat(todo)
    })

    //Sets text input back to blank
    document.getElementById('todo-input').value = '';

    let data = {
      todos: this.state.todos,
      user: this.props.state.user.email
    }
    const context = this;

    axios.post('/todos/add', data).then(function(todos) {
      context.props.setTodos(data.data.todos);
    })
  }

  deleteTodo(i) {
    this.setState({
      todos: this.state.todos.filter((x,j) => j !== i)
    })
  }

  render() {
    return (
      <div>
        <input id="todo-input" className="form-control" type="text" onChange={ this.handleChange.bind(this) }></input>
        <button className="btn btn-default" onClick={ this.addTodo.bind(this, this.state.textInput) }>Add Task</button>
        <div>
          <h3>Todos</h3>
          <div>
            {
              this.state.todos.map((todo, i)=> {
                return (
                  <div onClick={this.deleteTodo.bind(this, i)}>
                    { todo }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state: state
  };
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setTodos: setTodos
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);