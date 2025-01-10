'use client'

import React from 'react'
import { useAssets, useAuthors } from '../../contexts'
import { Input, Space, Select, Avatar, Tooltip  } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// import { useUrlParams } from '../../hooks/useUrlParams'

interface FilterDataType {
  type: string
  name: string
  label: string
  option?: string[]
  value?: string
}

const getInitial = (name) => {
  return name.charAt(0).toUpperCase()
}

const AFilter: React.FC = (filterData: FilterDataType[]) => {
  const { authors, isLoading: isLoadingAuthors } = useAuthors()
  const { assets, isLoading: isLoadingAssets } = useAssets()

//   const { setMultipleParams, } = useUrlParams()

  const setDefaultParam = (key: string, value: string[] | string) => {
    // setMultipleParams({
    //   page: '1',
    //   pageSize: '10',
    //   [key]: value
    // })
  }

  const handleSelectValue = (key: string, value: string[]): void => {
    switch (key) {
      case 'authors':
        // setDefaultParam('authors', value)
        break
      case 'assets':
        // setDefaultParam('assets', value)
        break
      default:
        break
    }
    // setDefaultParam()
  }

  const handleChangeInput = (key: string, value: string) => {
    switch (key) {
      case 's':
        // setDefaultParam('s', value)
        break

      default:
        break
    }
    // setDefaultParam()
  }

  const getList = (key: string): Array<FilterOptionType> => {
    switch (key) {
      case 'authors':
        return authors
      case 'assets':
        return assets
      default:
        break
    }
  }

  const getState = (key: string): Array<FilterOptionType> => {
    switch (key) {
      case 'authors':
        return isLoadingAuthors
      case 'assets':
        return isLoadingAssets
      default:
        break
    }
  }

  const handleRenderTooltip = (name: string, selectedValues: string[]) => {
    const hiddenTags = selectedValues.slice(1)
    return (
      <Tooltip title={hiddenTags.map((value) => getList(name).find((o) => o.id === value)?.name).join(', ')}>
        +{selectedValues.length - 1}
      </Tooltip>
    )
  }

  const renderImage = (data: string | undefined, name: string) => {
    return (
      <Avatar src={data || undefined} size='small' style={{ backgroundColor: '#ccc' }}>
        {!data && getInitial(name)}
      </Avatar>
    )
  }

  const filterByType: React.FC = (item) => {
    switch (item.type) {
      case 'select':
        return (
          <Select
            className='w-full min-w-44'
            mode='multiple'
            placeholder={`Select ${item.label}`}
            optionLabelProp='label'
            popupMatchSelectWidth={true}
            dropdownStyle={{ width: 400, maxwidth: 400, maxHeight: 400, overflowY: 'auto' }}
            maxTagCount={1}
            loading={getState(item.name)}
            maxTagPlaceholder={handleRenderTooltip(item.name, item.option)}
            onChange={(value) => handleSelectValue(item.name, value)}
            defaultValue={item.option}
          >
            {getList(item.name) &&
              getList(item.name)?.map((record) => (
                <Select.Option key={record.id} value={record.id} label={record.name}>
                  <div className='flex items-center gap-2'>
                    {renderImage(record.avatar || record.iconUrl, record.name)}
                    {record.name}
                  </div>
                </Select.Option>
              ))}
          </Select>
        )
      case 'input':
        return (
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Search'
            onChange={(e) => handleChangeInput(item.name, e.target.value)}
            defaultValue={item.value}
          />
        )
      default:
        return <div>Null</div>
    }
  }

//   if (isLoadingAuthors || isLoadingAssets) return <div>Loading.....</div>

  return (
    <div className='w-full flex justify-end items-center'>
      <Space size='large'>
        {filterData.filterData.map((item, index) => (
          <div key={item.name || index}>{filterByType(item)}</div>
        ))}
      </Space>
    </div>
  )
}

export default AFilter
