"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('littleSeed_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('littleSeed_users') || '[]')
      
      // Check if email already exists
      if (existingUsers.find((user: any) => user.email === userData.email)) {
        throw new Error('Email already exists')
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
      }

      // Save to localStorage
      existingUsers.push(newUser)
      localStorage.setItem('littleSeed_users', JSON.stringify(existingUsers))

      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('littleSeed_users') || '[]')
      
      // Find user with matching credentials
      const foundUser = existingUsers.find(
        (user: any) => user.email === email && user.password === password
      )

      if (!foundUser) {
        return false
      }

      // Set current user (without password)
      const userWithoutPassword = {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      }

      setUser(userWithoutPassword)
      localStorage.setItem('littleSeed_user', JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('littleSeed_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}