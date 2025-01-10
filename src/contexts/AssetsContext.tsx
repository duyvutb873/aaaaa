'use client'

import React, { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance'

interface Asset {
  id: string
  name: string
  iconUrl?: string
}

const fetchAssets = async (): Promise<Asset[]> => {
  const response = await axiosInstance.get('/api/v1/cms/posts/filter/assets')
  return response.data
}

const AssetsContext = createContext<{
  assets: Asset[]
  isLoading: boolean
}>({ assets: [], isLoading: false })

export const AssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    gcTime: 10 * 60 * 1000
  })

  return <AssetsContext.Provider value={{ assets, isLoading }}>{children}</AssetsContext.Provider>
}

export const useAssets = () => {
  const context = useContext(AssetsContext)
  if (!context) {
    throw new Error('useAssets must be used within an AssetsProvider')
  }
  return context
}
