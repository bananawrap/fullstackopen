import React, { useState, useEffect } from 'react'

const Notification = ({ message, msgClass }) => {
  const defaultStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const [notificationStyle, setNotificationStyle] = useState(defaultStyle)

  useEffect(() => {
    if (!message) {
      return
    }

    if (msgClass === 'error') {
      setNotificationStyle({
        ...defaultStyle,
        color: 'red',
      })
    } else if (msgClass === 'success') {
      setNotificationStyle({
        ...defaultStyle,
        color: 'green',
      })
    }
  }, [message])

  if (message) {
    return (
      <div>
        <p style={notificationStyle}>{message}</p>
      </div>
    )
  }
}

export default Notification
