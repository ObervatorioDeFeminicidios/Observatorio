"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from '@radix-ui/react-icons';
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ColumnFilterProps } from "./column-filter";

/**
 * DatePickerWithRange is a component that renders a date range picker for a column.
 * @param column - The column to select.
 * @returns A React component that renders a date range picker for the column.
 */
export const DatePickerWithRange: React.FC<ColumnFilterProps> = ({ column }) => {
  const [date, setDate] = React.useState<DateRange | undefined>()

  // Add handler for date selection
  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    column.setFilterValue(selectedDate ? {
      from: selectedDate.from ? format(selectedDate.from, "yyyy/MM/dd") : undefined,
      to: selectedDate.to ? format(selectedDate.to, "yyyy/MM/dd") : undefined,
    } : undefined)
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "max-h-6 min-w-32 font-light border-secondary p-1 text-xs text-primary-foreground justify-start text-left overflow-hidden",
              !date && "text-muted-foreground"
            )}
          >
            {!date?.from && !date?.to && <CalendarIcon />}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yy/MM/dd")} -{" "}
                  {format(date.to, "yy/MM/dd")}
                </>
              ) : (
                format(date.from, "yy/MM/dd")
              )
            ) : (
              <span className="text-xs ml-1">Fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
