import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions'
import moment from 'moment';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
    let inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => input.value = '');
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <div className="reminder-tasks">
                <li className="list-group-item reminder-items"  key={reminder.id}>
                  <div className="list-item">
                    <div>{reminder.text}</div>
                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                  </div>
                  <div 
                    className="list-item delete-button"
                    onClick={() => this.deleteReminder(reminder.id)}
                  >
                    &#x2715;
                  </div>
                </li>
              </div>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div class="sandbox sandbox-correct-pronounciation">
          <h1 class="heading heading-correct-pronounciation">
            <var>Todo List Reminder</var>
          </h1>
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
          <div
            className="btn btn-danger"
            onClick={() => this.props.clearReminders()}
          >
            Clear reminders
          </div>
          { this.renderReminders() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);