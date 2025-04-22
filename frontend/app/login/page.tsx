'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
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

      localStorage.setItem('access-token', tokenData['access-token'] || '')
      localStorage.setItem('client', tokenData.client || '')
      localStorage.setItem('uid', tokenData.uid || '')

      alert('ログイン成功！')
      setError('')
    } catch (err) {
      setError('エラーが発生しました')
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">ログイン</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        ログイン
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}