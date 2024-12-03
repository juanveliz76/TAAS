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
import { Button } from '@/components/ui/button';

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
          <div className="flex justify-center bg-white-100">
            <Select name="select1" onValueChange={(e) => setC(e)}>
              <SelectTrigger className="w-[180px] border-2 border-black-500 focus:ring-2 focus:ring-black-500 focus:outline-none bg-white">
                <SelectValue placeholder="Select a course"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CAP5100">CAP5100</SelectItem>
                  <SelectItem value="COP3530">COP3530</SelectItem>
                  <SelectItem value="COP4600">COP4600</SelectItem>
                  <SelectItem value="CAP4730">CAP4730</SelectItem>
                  <SelectItem value="CAP4773">CAP4773</SelectItem>
                  <SelectItem value="CDA3101">CDA3101</SelectItem>
                  <SelectItem value="CDA4630">CDA4630</SelectItem>
                  <SelectItem value="CEN3031">CEN3031</SelectItem>
                  <SelectItem value="CEN3913">CEN3913</SelectItem>
                  <SelectItem value="CEN4072">CEN4072</SelectItem>
                  <SelectItem value="CEN4721">CEN4721</SelectItem>
                  <SelectItem value="CEN4914">CEN4914</SelectItem>
                  <SelectItem value="CGS3065">CGS3065</SelectItem>
                  <SelectItem value="CIS4301">CIS4301</SelectItem>
                  <SelectItem value="CIS4905">CIS4905</SelectItem>
                  <SelectItem value="CIS4930">CIS4930</SelectItem>
                  <SelectItem value="CNT4007">CNT4007</SelectItem>
                  <SelectItem value="COP2800">COP2800</SelectItem>
                  <SelectItem value="COP3275">COP3275</SelectItem>
                  <SelectItem value="COP3502">COP3502</SelectItem>
                  <SelectItem value="COP3503">COP3503</SelectItem>
                  <SelectItem value="COP4020">COP4020</SelectItem>
                  <SelectItem value="COT3100">COT3100</SelectItem>
                  <SelectItem value="COT4501">COT4501</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br></br>
            &nbsp;
            <Select name="select2" onValueChange={(e2) => setR(e2)}>
              <SelectTrigger className="w-[180px] border-2 border-black-500 focus:ring-2 focus:ring-black-500 focus:outline-none bg-white">
                <SelectValue placeholder="Select a preference level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">Highly prefered (3)</SelectItem>
                  <SelectItem value="2">Somewhat prefered (2)</SelectItem>
                  <SelectItem value="1">Neither prefered nor undesired (1)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
            <br></br>
            <Button className="border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" name = "add" formAction={add}>Add</Button>
            &nbsp;
            {<SubmitButton className="border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" name = "submit" pendingText="Saving.." formAction={studentWelcome}>
              Save
            </SubmitButton>}
          </div>
        </div>
      </form>
    );
  };
