export const setNotification = (notification) => {
    return {
        type: 'SET',
        data: { notification }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            return action.data.notification
        case 'REMOVE':
            return null
        default:
            return state
    }
}

export default notificationReducer
