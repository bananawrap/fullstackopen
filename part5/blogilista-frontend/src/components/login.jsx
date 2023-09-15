import { useState } from "react"
import loginService from "../services/login"
import Notification from "./Notification"
const LoginForm = ({
  setUser,
  notification,
  setNotification,
  setLoginVisible,
}) => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleLogin = async () => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: newUsername, password: newPassword
      })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setNewUsername('')
      setNewPassword('')
      setLoginVisible(false)
    } catch (exception) {
      setNotification(['wrong username or password', 'error'])
      setTimeout(() => {
        setNotification(['', ''])
      }, 4000)
    }
  }

  return (
    <form onSubmit={handleLogin} >
      <div>
        <label>
          username
          <input id="username" value={newUsername} onChange={({ target }) => setNewUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input id="password" type='password' value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
        </label>
      </div>
      <input id="login-submit" type='submit' value="login" />
      <button type="button" onClick={() => setLoginVisible(false)}>cancel</button>
      <Notification message={notification[0]} msgClass={notification[1]} />
    </form>
  )
}

export default LoginForm
