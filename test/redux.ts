
class Store {
    reducer: IReducer<any> = function () { }
    state = { value: 0 }
    constructor(fn: IReducer<any>) {
        this.reducer = fn
    }
    subscribeHandler: Function = function () { }
    subscribe(fn: Function) {
        this.subscribeHandler = fn
    }
    dispatch(action: IReducerAction) {
        this.state = this.reducer(this.state, action)
        this.subscribeHandler()
    }
    getState() {
        return this.state
    }
}

interface IReducerAction {
    type: string
    payload?: any
}

interface IReducer<T> {
    (state: T, action: IReducerAction): T
}

function createStore(fn: IReducer<any>) {
    return new Store(fn)
}

//export { createStore }

function counterReducer(state = { value: 0 }, action: any): any {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        default:
            return state
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' })
// {value: 1}
store.dispatch({ type: 'counter/incremented' })
// {value: 2}
store.dispatch({ type: 'counter/decremented' })
  // {value: 1}