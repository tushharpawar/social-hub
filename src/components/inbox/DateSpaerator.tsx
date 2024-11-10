import React from 'react'
import { DateSeparatorProps } from 'stream-chat-react'

const DateSpaerator = (
    props:DateSeparatorProps
) => {
    const {date} = props

    function formatDate (date:Date):string{
        return `${date.toLocaleDateString('en-US',{dateStyle:"full"})}`
    }
  return (
    <div className='relative flex items-center justify-center my-6'>
        <span className='absolute left-auto right-auto text-xs font-semibold text-gray-600 bg-white px-2'>
            {formatDate(date)}
        </span>
    </div>
  )
}

export default DateSpaerator