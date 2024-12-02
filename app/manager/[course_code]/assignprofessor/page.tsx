"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  toggleProfessorAssignment,
  getProfessorPreferences,
  getAssignedProfessors,
} from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function ProfessorPreferencesPage({
  params,
}: {
  params: Promise<{ course_code: string }>;
}) {
  const router = useRouter();
  const [cc, setCc] = useState<string | null>(null);
  const [unassigned, setUnassigned] = useState<any[]>([]);
  const [assigned, setAssigned] = useState<any[]>([]);

  // Fetch course code
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCc(resolvedParams.course_code);
    };
    fetchParams();
  }, [params]);

  // Fetch preferences and assignments
  useEffect(() => {
    if (cc) {
      refreshData();
    }
  }, [cc]);

  const refreshData = async () => {
    if (!cc) return;

    const allPreferences = await getProfessorPreferences(cc);
    const assignedProfs = await getAssignedProfessors(cc);

    // Separate unassigned and merge preferences with assigned professors
    const unassignedProfs = allPreferences.filter(
      (pref) =>
        !assignedProfs.some((assigned) => assigned.professor === pref.professor)
    );
    const mergedAssigned = assignedProfs.map((assigned) => {
      const preference = allPreferences.find(
        (pref) => pref.professor === assigned.professor
      )?.preference;
      return { ...assigned, preference: preference || "N/A" };
    });

    setUnassigned(unassignedProfs);
    setAssigned(mergedAssigned);
  };

  const handleAssignToggle = async (professor: string) => {
    if (!cc) return;
    await toggleProfessorAssignment(cc, professor);

    // Refresh data immediately after toggling assignment
    await refreshData();
  };

  if (!cc) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Professor Assignment for Course:{" "}
        <span className="text-orange-500">{cc}</span>
      </h1>

      <div className="flex gap-12">
        {/* Unassigned Professors */}
        <div className="w-1/2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Unassigned Professors
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Professor Email
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Preference Level
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Assign
                </th>
              </tr>
            </thead>
            <tbody>
              {unassigned.map((prof) => (
                <tr
                  key={prof.professor}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="py-3 px-4 border-b">{prof.professor}</td>
                  <td className="py-3 px-4 border-b">{prof.preference}</td>
                  <td className="py-3 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(prof.professor)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assigned Professors */}
        <div className="w-1/2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Assigned Professors
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Professor Email
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Preference Level
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((prof) => (
                <tr
                  key={prof.professor}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="py-3 px-4 border-b">{prof.professor}</td>
                  <td className="py-3 px-4 border-b">{prof.preference}</td>
                  <td className="py-3 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(prof.professor)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push(`/manager/${cc}`)}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
