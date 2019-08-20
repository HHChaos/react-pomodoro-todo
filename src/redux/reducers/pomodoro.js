const initialState = {
    workTimer: 25 * 60 * 1000,
    shortBreak: 5 * 60 * 1000,
    longBreak: 15 * 60 * 1000,
    completedRings: 0,
    inBreak: false,
    inPause: true
};

export const types = {
    START_TIMER: "START_TIMER",
    PAUSE_TIMER: "PAUSE_TIMER",
    COMPLETE_TIMER: "COMPLETE_TIMER",
};

export const actions = {
    startTimer: () => ({
        type: types.START_TIMER
    }),
    pauseTimer: () => ({
        type: types.PAUSE_TIMER
    }),
    completeTimer: () => ({
        type: types.COMPLETE_TIMER
    })
};

const reducer = (state = initialState, action) => {
    //console.log("action " + JSON.stringify(action));
    switch (action.type) {
        case types.START_TIMER:
            return { ...state, inPause: false };
        case types.PAUSE_TIMER:
            return {
                ...state,
                completedRings: state.inBreak ? ++state.completedRings : state.completedRings,
                inPause: true,
                inBreak: !state.inBreak
            };
        case types.COMPLETE_TIMER:
            return {
                ...state,
                completedRings: state.inBreak ? ++state.completedRings : state.completedRings,
                inPause: true,
                inBreak: !state.inBreak
            };
        default:
            return state;
    }
};

export default reducer;