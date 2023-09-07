import { useState } from "react"
import loginService from "../services/login"
import Notification from "./Notification"
const LoginForm = ({
  setUser
}) => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loginNotification, setLoginNotification] = useState(['', ''])
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
    } catch (exception) {
      setLoginNotification(['wrong username or password', 'error'])
      setTimeout(() => {
        setLoginNotification(['', ''])
      }, 4000)
    }
  }
  return (
    <form onSubmit={handleLogin} >
      <div>
        <label>
          username
          <input value={newUsername} onChange={({ target }) => setNewUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input type='password' value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
        </label>
      </div>
      <input type='submit' value="login" />
      {console.log(loginNotification[1])}
      <Notification message={loginNotification[0]} msgClass={loginNotification[1]} />
    </form>
  )
}

export default LoginForm
