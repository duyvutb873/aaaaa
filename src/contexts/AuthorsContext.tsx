'use client'

import React, { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance'

// Định nghĩa kiểu dữ liệu
interface Author {
  id: string
  name: string
  avatar?: string
}

const fetchAuthors = async (): Promise<Author[]> => {
  const response = await axiosInstance.get('/api/v1/cms/posts/filter/authors')
  return response.data
}

// Context
const AuthorsContext = createContext<{
  authors: Author[]
  isLoading: boolean
}>({ authors: [], isLoading: false })

export const AuthorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: authors = [], isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
    gcTime: 10 * 60 * 1000
  })

  return <AuthorsContext.Provider value={{ authors, isLoading }}>{children}</AuthorsContext.Provider>
}

export const useAuthors = () => {
  const context = useContext(AuthorsContext)
  if (!context) {
    throw new Error('useAuthors must be used within an AuthorsProvider')
  }
  return context
}
