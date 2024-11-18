"use client";

import { useState } from "react";
import Link from "next/link";

// Sample list of classes to choose from
const classes = [
  "CS101 - Computer Programming 1",
  "CS102 - Computer Programming 2",
  "CS201 - Data Structures & Algorithms",
  "CS301 - Info Systems and Database Fundamentals",
  "CS401 - Operating Systems",
  "CS402 - Computer Networks Fundamentals",
  "CS403 - Artificial Intelligence",
  "CS404 - Machine Learning",
];

export default function SelectClasses() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>(new Array(8).fill(""));
  const [rankings, setRankings] = useState<number[]>(new Array(8).fill(0));
  const [submitted, setSubmitted] = useState(false); // New state to track submission

  // Helper to determine which classes are available (i.e., not yet chosen)
  const availableClasses = (currentIndex: number) => {
    const usedClasses = selectedClasses.filter((_, index) => index !== currentIndex);
    return classes.filter((cls) => !usedClasses.includes(cls));
  };

  // Helper to determine which rankings are available (i.e., not yet chosen)
  const availableRankings = (currentIndex: number) => {
    const usedRankings = rankings.filter((_, index) => index !== currentIndex);
    return Array.from({ length: 8 }, (_, i) => i + 1).filter(
      (rank) => !usedRankings.includes(rank)
    );
  };

  const handleClassChange = (index: number, value: string) => {
    const updatedClasses = [...selectedClasses];
    updatedClasses[index] = value;
    setSelectedClasses(updatedClasses);
  };

  const handleRankingChange = (index: number, value: string) => {
    const updatedRankings = [...rankings];
    updatedRankings[index] = parseInt(value);
    setRankings(updatedRankings);
  };

  // Function to clear the selected class and ranking for a specific index
  const handleClear = (index: number) => {
    const updatedClasses = [...selectedClasses];
    const updatedRankings = [...rankings];
    updatedClasses[index] = "";
    updatedRankings[index] = 0;
    setSelectedClasses(updatedClasses);
    setRankings(updatedRankings);
  };

  // Check if all classes and rankings are filled to enable/disable the submit button
  const isSubmitDisabled = selectedClasses.some((cls) => cls === "") || rankings.some((rank) => rank === 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here, you can make a request to save the user's selected classes and rankings
    console.log("Selected Classes:", selectedClasses);
    console.log("Rankings:", rankings);

    // Set submission state to true to trigger redirect
    setSubmitted(true);
  };

  // If the form has been submitted, render the redirect link
  if (submitted) {
    // Redirect to confirmation page after a short delay
    setTimeout(() => {
      window.location.href = "/professor/select-classes/confirm_submit"; // Redirect using window.location
    }, 1000); // Delay for 1 second
    return <p className="text-blue-500">Redirecting to confirmation...</p>; // Inform the user
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

              <label htmlFor={`ranking-${index}`} className="text-sm font-medium">
                Rank (1 - 8)
              </label>
              <div className="flex items-center gap-2">
                <select
                  id={`ranking-${index}`}
                  value={rankings[index] || ""}
                  onChange={(e) => handleRankingChange(index, e.target.value)}
                  className="p-2 border rounded-md flex-1"
                  required
                >
                  <option value="" disabled>
                    Select a ranking
                  </option>
                  {availableRankings(index).map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
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
