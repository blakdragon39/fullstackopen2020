let timeoutId

export const setNotification = (notification, timeoutSeconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { notification }
        })

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => dispatch({
            type: 'REMOVE_NOTIFICATION'
        }), timeoutSeconds * 1000)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer
