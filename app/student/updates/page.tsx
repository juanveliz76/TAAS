"use client";

import { studentPref } from "@/app/actions";
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { setUpdates, getUpdates, setUpdatesResearch } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox";


export default function updates() {
  const [t, setT] = useState("");
  const [AIML, setAIML] = useState(false);
  const [AIMLstring, getAIML] = useState("");
  const [old, setOld] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const updatesOld = await getUpdates("student@ufl.edu");
      if(updatesOld) {
        setT(updatesOld[0].travel);
        setAIML(updatesOld[0].AIML);
      }

    };
    fetchData();
  }, []);

  function sub() {
    //useEffect(() => {
      const writeData = async () => {
        await setUpdates("student@ufl.edu", t);
        await setUpdatesResearch("student@ufl.edu", "AIML", AIML);
      };
      writeData();
      studentPref();
    //}, []);
  }

  function place(x: number) {
    if (x == 1 && old) {
      return old;
    }
    return "x"
  }

  return (
    <form>
      <div className="flex items-center space-x-2">
        <Checkbox id="AIML" checked={AIML} onCheckedChange={setAIML as (checked: CheckedState) => void} />
        <label
          htmlFor="AIML"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          AI/Machine Learning
        </label>
        <Checkbox id="ALGO" />
        <label
          htmlFor="ALGO"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Algorithms
        </label>
        <Checkbox id="BIOINFORMATICS" />
        <label
          htmlFor="BIOINFORMATICS"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Bioinformatics
        </label>
        <Checkbox id="CC" />
        <label
          htmlFor="CC"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Cloud Computing
        </label>
      </div>
      <br></br>
      <br></br>
      <div className="grid w-full gap-2">
        <Textarea value = {t} placeholder="List any travel plans for the current semester." onChange={(e) => setT(e.target.value)}/>
        <SubmitButton pendingText="Saving.." formAction={sub}>Save</SubmitButton>
      </div>
    </form>
  )
}