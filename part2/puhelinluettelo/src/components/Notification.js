export const Notification = ({message, msgClass}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={msgClass}>
            {message}
        </div>
    )
}

export const notificationHandler = (msgClass, msg, msgClassHandler, msgHandler, timeout=2000) => {

    msgClassHandler(msgClass)
    msgHandler(msg)

    setTimeout(() => {
        msgHandler(null)
    }, timeout)
}
