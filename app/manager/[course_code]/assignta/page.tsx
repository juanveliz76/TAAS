"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  toggleStudentAssignment,
  getStudentPreferences,
  getAssignedStudents,
  getStudentScores,
} from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function StudentPreferencesPage({
  params,
}: {
  params: Promise<{ course_code: string }>;
}) {
  const router = useRouter();
  const [cc, setCc] = useState<string | null>(null);
  const [unassigned, setUnassigned] = useState<any[]>([]);
  const [assigned, setAssigned] = useState<any[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  // Fetch course code
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCc(resolvedParams.course_code);
    };
    fetchParams();
  }, [params]);

  // Fetch preferences, assignments, and scores
  useEffect(() => {
    if (cc) {
      refreshData();
    }
  }, [cc]);

  const refreshData = async () => {
    if (!cc) return;

    const allPreferences = await getStudentPreferences(cc);
    const assignedStuds = await getAssignedStudents(cc);
    const scoresData = await getStudentScores(cc);

    const formattedScores = scoresData.reduce((acc, scoreObj) => {
      acc[scoreObj.student_email] = scoreObj.score;
      return acc;
    }, {} as { [key: string]: number });

    const unassignedStuds = allPreferences.filter(
      (pref) => !assignedStuds.some((assigned) => assigned.student_email === pref.student_email)
    );

    const mergedAssigned = assignedStuds.map((assigned) => {
      const preference = allPreferences.find((pref) => pref.student_email === assigned.student_email)?.preference;
      return { ...assigned, preference: preference || "N/A" };
    });

    const sortedUnassigned = unassignedStuds.sort(
      (a, b) => (formattedScores[b.student_email] || 0) - (formattedScores[a.student_email] || 0)
    );
    const sortedAssigned = mergedAssigned.sort(
      (a, b) => (formattedScores[b.student_email] || 0) - (formattedScores[a.student_email] || 0)
    );

    setUnassigned(sortedUnassigned);
    setAssigned(sortedAssigned);
    setScores(formattedScores);
  };

  const handleAssignToggle = async (studentEmail: string) => {
    if (!cc) return;
    await toggleStudentAssignment(cc, studentEmail);
    await refreshData();
  };

  if (!cc) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Assignment for Course: {cc}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Unassigned Students */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Unassigned Students</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Student Email</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Preference Level</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Smart Score</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Assign</th>
              </tr>
            </thead>
            <tbody>
              {unassigned.map((item) => (
                <tr key={item.student_email} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{item.student_email}</td>
                  <td className="py-3 px-4 border-b">{item.preference}</td>
                  <td className="py-3 px-4 border-b">{scores[item.student_email] || 0}</td>
                  <td className="py-3 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(item.student_email)}
                      className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assigned Students */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Assigned Students</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Student Email</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Preference Level</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Smart Score</th>
                <th className="py-3 px-4 border-b border-gray-300 bg-gray-100">Remove</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((item) => (
                <tr key={item.student_email} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{item.student_email}</td>
                  <td className="py-3 px-4 border-b">{item.preference}</td>
                  <td className="py-3 px-4 border-b">{scores[item.student_email] || 0}</td>
                  <td className="py-3 px-4 border-b">
                    <Button
                      onClick={() => handleAssignToggle(item.student_email)}
                      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
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

      <button
        onClick={() => router.push(`/manager/${cc}`)}
        className="mt-8 px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 block mx-auto"
      >
        Go Back
      </button>
    </div>
  );
}
