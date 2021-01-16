const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}


const Notification = ({message, isError}) => {
    if (message == null) return null

    const style = {
        ...messageStyle,
        color: isError ? 'red' : 'green'
    }

    return (
        <div style={style}>{message}</div>
    )
}

export default Notification