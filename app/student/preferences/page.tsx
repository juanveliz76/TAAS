"use client";

import { studentWelcome } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import * as React from "react"
import { course, columns } from "./columns"
import { DataTable } from "./data-table"
import { getStudentPref, addPref } from "@/app/actions";
import { useEffect } from "react";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

async function getData(): Promise<course[]> {
  // Fetch data from your API here.
  const prefs = await getStudentPref("student@ufl.edu")

  if(prefs) {
    return prefs as course[];
  }
  else {
    return [
      {
        name: "0",
        preference: 0
      },
      // ...
    ]
  }
}

const preferences = async () => {
    const data = await getData()

    return (
      <>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="container text-center">
          <div className="d-flex justify-content-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CAP5100">CAP5100</SelectItem>
                  <SelectItem value="COP3530">COP3530</SelectItem>
                  <SelectItem value="COP4600">COP4600</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br></br>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a preference level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">Highly prefered</SelectItem>
                  <SelectItem value="2">Somewhat prefered</SelectItem>
                  <SelectItem value="1">Neither prefered nor undesired</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br></br>
            {<SubmitButton pendingText="adding.." formAction={studentWelcome}>
              Add
            </SubmitButton>}
            &nbsp;
            {<SubmitButton pendingText="saving.." formAction={studentWelcome}>
              Save
            </SubmitButton>}
          </div>
        </div>
      </>
    );
  };
  
export default preferences;