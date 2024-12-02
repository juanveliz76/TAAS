"use client";

import { useState } from "react";
import Link from "next/link";

// Sample list of classes to choose from
const classes = [
  "CEN 3031 - Introduction to Software Engineering",
  "CIS 4301 - Information and Database Systems 1",
  "COP 3502C - Programming Fundamentals 1",
  "COP 3503C - Programming Fundamentals 2",
  "MAS 3114 - Computational Linear Algebra",
  "COP 4600 - Operating Systems",
  "STA 3032 - Engineering Statistics",
  "COP 4020 - Programming Language Concepts",
];

export default function SelectClasses() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>(new Array(8).fill(""));
  const [preferences, setPreferences] = useState<string[]>(new Array(8).fill(""));
  const [submitted, setSubmitted] = useState(false);

  // Helper to determine which classes are available (i.e., not yet chosen)
  const availableClasses = (currentIndex: number) => {
    const usedClasses = selectedClasses.filter((_, index) => index !== currentIndex);
    return classes.filter((cls) => !usedClasses.includes(cls));
  };

  const handleClassChange = (index: number, value: string) => {
    const updatedClasses = [...selectedClasses];
    updatedClasses[index] = value;
    setSelectedClasses(updatedClasses);
  };

  const handlePreferenceChange = (index: number, value: string) => {
    const updatedPreferences = [...preferences];
    updatedPreferences[index] = value;
    setPreferences(updatedPreferences);
  };

  // Function to clear the selected class and preference for a specific index
  const handleClear = (index: number) => {
    const updatedClasses = [...selectedClasses];
    const updatedPreferences = [...preferences];
    updatedClasses[index] = "";
    updatedPreferences[index] = "";
    setSelectedClasses(updatedClasses);
    setPreferences(updatedPreferences);
  };

  // Check if all classes and preferences are filled to enable/disable the submit button
  const isSubmitDisabled = selectedClasses.some((cls) => cls === "") || preferences.some((pref) => pref === "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Selected Classes:", selectedClasses);
    console.log("Preferences:", preferences);

    setSubmitted(true);
  };

  if (submitted) {
    setTimeout(() => {
      window.location.href = "/professor/select-classes/confirm_submit";
    }, 1000);
    return <p className="text-blue-500">Redirecting to confirmation...</p>;
  }

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Select and Rank Classes</h1>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={`class-${index}`} className="text-lg font-medium">
                Class {index + 1}
              </label>
              <div className="flex items-center gap-2">
                <select
                  id={`class-${index}`}
                  value={selectedClasses[index] || ""}
                  onChange={(e) => handleClassChange(index, e.target.value)}
                  className="p-2 border rounded-md flex-1"
                  required
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {availableClasses(index).map((className, i) => (
                    <option key={i} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleClear(index)}
                  className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition"
                >
                  Clear
                </button>
              </div>

              <label htmlFor={`preference-${index}`} className="text-sm font-medium">
                Preference
              </label>
              <div className="flex items-center gap-2">
                <select
                  id={`preference-${index}`}
                  value={preferences[index] || ""}
                  onChange={(e) => handlePreferenceChange(index, e.target.value)}
                  className="p-2 border rounded-md flex-1"
                  required
                >
                  <option value="" disabled>
                    Select preference
                  </option>
                  <option value="Not Preferred">Not Preferred</option>
                  <option value="Somewhat Preferred">Somewhat Preferred</option>
                  <option value="Highly Preferred">Highly Preferred</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleClear(index)}
                  className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition"
                >
                  Clear
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`mt-6 p-2 rounded-lg text-white font-bold transition ${
            isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={isSubmitDisabled}
        >
          Submit Preferences
        </button>
      </form>
    </div>
  );
}
