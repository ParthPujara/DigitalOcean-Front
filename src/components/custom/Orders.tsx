import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
export default function Orders() {
    return (
        <Popover>
            <PopoverTrigger>
                Enable Orders
            </PopoverTrigger>
            <PopoverContent sideOffset={5} align='start' side='left'></PopoverContent>
        </Popover>
    )
}
