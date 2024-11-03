"use client"
 
import { ColumnDef } from "@tanstack/react-table"

export type course = {
  name: string
  preference: 0 | 1 | 2 | 3 | null
}
 
export const columns: ColumnDef<course>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "preference",
    header: "Preference",
  },
]
