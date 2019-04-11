import React from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: { email: '', password: '' },
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/groups')
      })
      .catch(() => {
        this.setState({ error: 'Invalid Credentials, login Fail.'})
      })
  }

  render() {
    return (
      <main>
        <form className="formWrapper" onSubmit={this.handleSubmit}>
          <div className="loginForm">
            <h2>Welcome back to WellNest!</h2>
            <h3>Please sign in below.</h3>
            <div className="email">Email
            </div>
            <input
              placeholder="Email"
              value={this.state.data.email}
              onChange={this.handleChange}
            >
            </input>
            <div className="password">Password
            </div>
            <input
              placeholder="Password"
              value={this.state.data.password}
              onChange={this.handleChange}
            >
            </input>
            <div className="logInButton">
              <button>Submit</button>
            </div>
            <div className="registerInstead">
              <button>Register Instead</button>
            </div>
          </div>
        </form>
      </main>
    )
  }

}

export default Login