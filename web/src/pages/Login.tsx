import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql'
import { setAccessToken } from '../accessToken';

interface Props {
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useLoginMutation()

    return (
        <form onSubmit={async e => {
            e.preventDefault()
            const response = await login({
                variables: {
                    email,
                    password
                },
                update: (store, { data }) => {
                    if (!data) {
                        return null
                    }
                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: 'Query',
                            me: data.login.user
                        }
                    })
                }
            })
            console.log(response)
            if (response && response.data) {
                setAccessToken(response.data.login.accessToken)
            }
            history.push('/')
        }}>
            <div>
                <input type="email" required value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <input type="password" required value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <input type="submit" value="login"/>
            </div>
        </form>
    )
}