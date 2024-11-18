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
      (pref) => !assignedProfs.some((assigned) => assigned.professor === pref.professor)
    );
    const mergedAssigned = assignedProfs.map((assigned) => {
      const preference = allPreferences.find((pref) => pref.professor === assigned.professor)?.preference;
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Professor Assignment for Course: {cc}</h1>

      <div className="flex gap-8">
        {/* Unassigned Professors */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Unassigned Professors</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Professor Email</th>
                <th className="py-2 px-4 border-b">Preference Level</th>
                <th className="py-2 px-4 border-b">Assign</th>
              </tr>
            </thead>
            <tbody>
              {unassigned.map((prof) => (
                <tr key={prof.professor}>
                  <td className="py-2 px-4 border-b">{prof.professor}</td>
                  <td className="py-2 px-4 border-b">{prof.preference}</td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(prof.professor)}
                    className="bg-green-500 text-white hover:bg-green-600"
                    >Assign</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assigned Professors */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Assigned Professors</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Professor Email</th>
                <th className="py-2 px-4 border-b">Preference Level</th>
                <th className="py-2 px-4 border-b">Remove</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((prof) => (
                <tr key={prof.professor}>
                  <td className="py-2 px-4 border-b">{prof.professor}</td>
                  <td className="py-2 px-4 border-b">{prof.preference}</td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(prof.professor)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => router.push(`/manager/${cc}`)}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Go Back
      </button>
    </div>
  );
}
