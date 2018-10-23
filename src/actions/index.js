import { ADD_REMINDER } from '../constants';
import { DELETE_REMINDER } from '../constants';

export const addReminder = (text) => {
    const action = {
        type: ADD_REMINDER,
        text
    }
    console.log('action in addReminder', action);
    return action;
}
