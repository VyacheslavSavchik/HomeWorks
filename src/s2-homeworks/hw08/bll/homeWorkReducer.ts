import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType) => { // need to fix any
    switch (action.type) {
        case 'sort': {// by name
            let copyState = [...state].sort((a, b) => (a.name > b.name ? 1 :-1))

            return action.payload === 'up' ? copyState : copyState.reverse()

            }


        case 'check': {
            let copy = [...state]
            return copy.filter(el => el.age >= 18)// need to fix
        }
        default:
            return state
    }
}
