import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register] = useRegisterMutation()

    return (
        <form onSubmit={async e => {
            e.preventDefault()
            await register({
                variables: {
                    email,
                    password
                }
            })
            history.push('/')
        }}>
            <div>
                <input type="email" required value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <input type="password" required value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <input type="submit" value="register"/>
            </div>
        </form>
    )
}