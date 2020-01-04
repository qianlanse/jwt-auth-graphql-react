import React, { useState, useEffect } from 'react'
import Routes from './Routes'
import { setAccessToken } from './accessToken';

interface Props {
}

export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch('http://localhost:5000/refresh_token', {
            method: 'post',
            credentials: 'include'
        }).then(async res => {
            const { accessToken } = await res.json()
            setAccessToken(accessToken)
            setLoading(false)
        })
    }, [])
    
    if (loading) {
        return <div>loading..</div>
    }
    return (
        <Routes />
    )
}