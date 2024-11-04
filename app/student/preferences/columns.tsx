"use client"
 
import { ColumnDef } from "@tanstack/react-table"

export type course = {
  course_code: string
  preference: 0 | 1 | 2 | 3 | null
}
 
export const columns: ColumnDef<course>[] = [
  {
    accessorKey: "course_code",
    header: "Course",
  },
  {
    accessorKey: "preference",
    header: "Preference",
  },
]
