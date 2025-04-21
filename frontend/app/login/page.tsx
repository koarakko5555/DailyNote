'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tokenInfo, setTokenInfo] = useState({})

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/auth/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError('ログインに失敗しました')
        return
      }

      const headers = res.headers
      const tokenData = {
        'access-token': headers.get('access-token'),
        client: headers.get('client'),
        uid: headers.get('uid'),
      }

      setTokenInfo(tokenData)
      // localStorage などに保存するのもアリ
    } catch (err) {
      setError('エラーが発生しました')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>ログイン</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}