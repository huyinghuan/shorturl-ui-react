var Store = /** @class */ (function () {
    function Store(fn) {
        this.reducer = function () { };
        this.state = { value: 0 };
        this.subscribeHandler = function () { };
        this.reducer = fn;
    }
    Store.prototype.subscribe = function (fn) {
        this.subscribeHandler = fn;
    };
    Store.prototype.dispatch = function (action) {
        this.state = this.reducer(this.state, action);
        this.subscribeHandler();
    };
    Store.prototype.getState = function () {
        return this.state;
    };
    return Store;
}());
function createStore(fn) {
    return new Store(fn);
}
//export { createStore }
function counterReducer(state, action) {
    if (state === void 0) { state = { value: 0 }; }
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 };
        case 'counter/decremented':
            return { value: state.value - 1 };
        default:
            return state;
    }
}
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
var store = createStore(counterReducer);
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.
store.subscribe(function () { return console.log(store.getState()); });
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' });
// {value: 1}
store.dispatch({ type: 'counter/incremented' });
// {value: 2}
store.dispatch({ type: 'counter/decremented' });
// {value: 1}
