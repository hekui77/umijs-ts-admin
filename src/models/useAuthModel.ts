import { useState, useCallback } from 'react'

interface userInfoType {
  phone: string,
}

export default function useAuthModel() {
  const [user, setUser] = useState<userInfoType | null>(null)

  const signin = useCallback((phone: string, password: string) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    signin,
    signout
  }
}