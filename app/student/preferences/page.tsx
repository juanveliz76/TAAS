"use client";

import React from 'react';
import { studentWelcome } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { course, columns } from "./columns"
import { DataTable } from "./data-table"
import { getStudentPref, addPref } from "@/app/actions";
import { useEffect, useState } from "react";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { randomBytes, randomFill } from 'crypto';
import { isNullOrUndefined } from 'util';

async function getData(): Promise<course[]> {
  // Fetch data from your API here.
  const prefs = await getStudentPref("student@ufl.edu")

  if(prefs) {
    return prefs as course[]
  }
  else {
    return [
      {
        course_code: "0",
        preference: 0
      },
      // ...
    ]
  }
}

export default function preferences() {
  const [c, setC] = useState("")
  const [r, setR] = useState("")
  const [data, setData] = useState<course[]>([
    { course_code: '', preference: null },
    { course_code: '', preference: null },
  ]);

  //const data = await getData()
  useEffect(() => {
    const fetchData = async () => {
      const prefs = await getData()
      setData(prefs);
    };
    fetchData();
  }, []);

  function add() {
    const writeData = async () => {
      await addPref("student@ufl.edu", c, r as unknown as number)
      const data = await getData()
    }
    writeData();
    window.location.reload();
  }

    return (
      <form>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="container text-center">
          <div className="d-flex justify-content-center">
            <Select name="select1" onValueChange={(e) => setC(e)}>
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
            <Select name="select2" onValueChange={(e2) => setR(e2)}>
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
            <SubmitButton pendingText="Adding.." formAction={add}>Add</SubmitButton>
            &nbsp;
            {/* {<SubmitButton pendingText="Saving.." formAction={studentWelcome}>
              Save
            </SubmitButton>} */}
          </div>
        </div>
      </form>
    );
  };
