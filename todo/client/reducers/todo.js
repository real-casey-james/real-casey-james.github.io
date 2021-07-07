import { DELETE_TODO_SUCCESS, FETCH_TODO_SUCCESS, POST_TODO_SUCCESS, UPDATE_TODO_SUCCESS } from "../actions/todo";

export default function todo (state = [], action) {
    switch (action.type) {
        case POST_TODO_SUCCESS:
        case FETCH_TODO_SUCCESS:
        case UPDATE_TODO_SUCCESS:
        case DELETE_TODO_SUCCESS:
            return action.todos
        default:
            return state
    }
}