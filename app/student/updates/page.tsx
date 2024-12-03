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
  const [ALGO, setALGO] = useState(false);
  const [BIO, setBIO] = useState(false);
  const [CC, setCC] = useState(false);
  const [CV, setCV] = useState(false);
  const [D, setD] = useState(false);
  const [G, setG] = useState(false);
  const [HCI, setHCI] = useState(false);
  const [N, setN] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const updatesOld = await getUpdates("student@ufl.edu");
      if(updatesOld) {
        setT(updatesOld[0].travel);
        setAIML(updatesOld[0].AIML);
        setALGO(updatesOld[0].ALGO);
        setBIO(updatesOld[0].BIO);
        setCC(updatesOld[0].CC);
        setCV(updatesOld[0].CV);
        setD(updatesOld[0].D);
        setG(updatesOld[0].G);
        setHCI(updatesOld[0].HCI);
        setN(updatesOld[0].N);
      }

    };
    fetchData();
  }, []);

  function sub() {
    //useEffect(() => {
      const writeData = async () => {
        await setUpdates("student@ufl.edu", t);
        await setUpdatesResearch("student@ufl.edu", AIML, ALGO, BIO, CC, CV, D, G, HCI, N);
      };
      writeData();
      studentPref();
    //}, []);
  }

  return (
    <form>
      <div className="flex justify-center bg-white-100 space-y-4">
      <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="AIML" checked={AIML} onCheckedChange={setAIML as (checked: CheckedState) => void} />
        <label
          htmlFor="AIML"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          AI/Machine Learning
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="ALGO" checked={ALGO} onCheckedChange={setALGO as (checked: CheckedState) => void} />
        <label
          htmlFor="ALGO"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Algorithms
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="BIO" checked={BIO} onCheckedChange={setBIO as (checked: CheckedState) => void}/>
        <label
          htmlFor="BIO"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Bioinformatics
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="CC" checked={CC} onCheckedChange={setCC as (checked: CheckedState) => void} />
        <label
          htmlFor="CC"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Cloud Computing
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="CV" checked={CV} onCheckedChange={setCV as (checked: CheckedState) => void} />
        <label
          htmlFor="CV"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Computer Vision
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="D" checked={D} onCheckedChange={setD as (checked: CheckedState) => void} />
        <label
          htmlFor="D"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Data
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="G" checked={G} onCheckedChange={setG as (checked: CheckedState) => void} />
        <label
          htmlFor="G"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Graphics
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="HCI" checked={HCI} onCheckedChange={setHCI as (checked: CheckedState) => void} />
        <label
          htmlFor="HCI"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Human Computer Interaction
        </label>
        </div>
        <div className="flex items-center space-x-2">
        <Checkbox className="border-blue-500 focus:ring-blue-500" id="N" checked={N} onCheckedChange={setN as (checked: CheckedState) => void} />
        <label
          htmlFor="N"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
          Networking
        </label>
      </div>
      </div>
      </div>
      <br></br>
      <br></br>
      <div className="grid w-full gap-2">
        <Textarea className="bg-white" value = {t} placeholder="List any travel plans for the current semester." onChange={(e) => setT(e.target.value)}/>
        <SubmitButton className="border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" pendingText="Saving.." formAction={sub}>Save</SubmitButton>
      </div>
    </form>
  )
}