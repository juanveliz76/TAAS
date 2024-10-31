"use client";

import { studentPref } from "@/app/actions";
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { setUpdates, getUpdates } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox"


const updates = async () => {
  const [t, setT] = useState("");
  const [AIML, setAIML] = useState(false);
  console.log(AIML);
  const old = await getUpdates("student@ufl.edu");

  function sub() {
    useEffect(() => {
      const writeData = async () => {
        console.log(t);
        await setUpdates("student@ufl.edu", t);
      };
      writeData();
    }, []);
  }

  function place(x: number) {
    if (x == 1 && old) {
      return old[0].travel;
    }
    return null
  }

  return (
    <form onSubmit={sub}>
      <div className="flex items-center space-x-2">
        <Checkbox id="AIML" />
        <label onChange={(e) => setAIML(e.bubbles)}
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
        <Textarea value={place(1)} placeholder="List any travel plans for the current semester." onChange={(e) => setT(e.target.value)}/>
        <SubmitButton pendingText="Saving" formAction={studentPref}>Save</SubmitButton>
      </div>
    </form>
  )
}

export default updates;