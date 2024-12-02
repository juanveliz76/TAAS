"use client";

import { fetchStudentDataAction } from "@/app/actions";
import { useState, useEffect } from "react";

interface Student {
  email: string;
  name: string;
  profile_completed: boolean;
  travel: string;
  research_interest: string;
  score: string;
}

const StudentProfilePage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [ranks, setRanks] = useState<Record<string, string>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const professorEmail = "professor@ufl.edu"; // Replace with the logged-in professor's email dynamically

  useEffect(() => {
    const fetchStudents = async () => {
      const fetchedStudents: any[] | { error: string } = await fetchStudentDataAction();

      if (Array.isArray(fetchedStudents)) {
        setStudents(fetchedStudents);
      } else {
        console.error(fetchedStudents.error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const allRanksFilled =
      students.length > 0 &&
      Object.keys(ranks).length === students.length &&
      Object.values(ranks).every((rank) => rank !== "");

    setIsSubmitDisabled(!allRanksFilled);
  }, [ranks, students]);

  const handleRankChange = (email: string, value: string) => {
    setRanks((prev) => ({ ...prev, [email]: value }));
  };

  const handleClear = (email: string) => {
    setRanks((prev) => ({ ...prev, [email]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    
    // Redirect after submission
    window.location.href = "/professor/select-TA-preference/confirm_submit";
  };

  const getAvailableRanks = (currentEmail: string) => {
    const assignedRanks = new Set(Object.values(ranks).filter((rank) => rank !== ""));
    return Array.from({ length: students.length }, (_, i) => (i + 1).toString()).filter(
      (rank) => rank === ranks[currentEmail] || !assignedRanks.has(rank)
    );
  };

  if (!students.length) {
    return <p>Loading student profiles...</p>;
  }

  return (
    <div className="flex min-h-screen p-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Student Profiles</h1>
        <form onSubmit={handleSubmit}>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left">Actions</th>
                <th className="border-b px-4 py-2 text-left">Rank</th>
                <th className="border-b px-4 py-2 text-left">Name</th>
                <th className="border-b px-4 py-2 text-left">Email</th>
                <th className="border-b px-4 py-2 text-left">Profile Completed</th>
                <th className="border-b px-4 py-2 text-left">Travel</th>
                <th className="border-b px-4 py-2 text-left">Research Interests</th>
                <th className="border-b px-4 py-2 text-left">Student Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.email} className="border-b">
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      onClick={() => handleClear(student.email)}
                    >
                      Clear
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={ranks[student.email] || ""}
                      onChange={(e) => handleRankChange(student.email, e.target.value)}
                    >
                      <option value="">Unranked</option>
                      {getAvailableRanks(student.email).map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">
                    {student.profile_completed ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{student.travel}</td>
                  <td className="px-4 py-2">{student.research_interest}</td>
                  <td className="px-4 py-2">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`mt-4 px-4 py-2 rounded font-bold transition ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Submit Rankings
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfilePage;
