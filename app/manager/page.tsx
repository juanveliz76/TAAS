"use client";

import { useEffect, useState } from "react";
import { getCourses, fetchCurrentSemesterAction, updateSemesterAction } from "@/app/actions";
import Link from "next/link";

export default function ManagerPage() {
  const [courses, setCourses] = useState(null);
  const [activeSection, setActiveSection] = useState("viewCourses"); // Single state to track the active section
  const [currentSemester, setCurrentSemester] = useState("");
  const [loadingSemester, setLoadingSemester] = useState(true);

  // Fetch semester from the backend
  useEffect(() => {
    const fetchSemester = async () => {
      const semester = await fetchCurrentSemesterAction();
      if (semester) {
        setCurrentSemester(semester);
      } else {
        console.error("Failed to fetch semester.");
      }
      setLoadingSemester(false);
    };
    fetchSemester();
  }, []);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
    };
    fetchData();
  }, []);

  // Update semester handler
  const handleSemesterUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const semesterValue = currentSemester.trim();
    if (!semesterValue) {
      alert("Please enter a valid semester.");
      return;
    }

    const success = await updateSemesterAction(semesterValue);
    if (success) {
      alert("Semester updated successfully!");
    } else {
      alert("Failed to update semester. Please try again.");
    }
  };

  return (

    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>

        {/* Sidebar Buttons */}
        <button
          className={`py-2 px-4 mb-4 rounded text-left w-full ${
            activeSection === "viewCourses"
              ? "bg-gray-700 text-white"
              : "bg-gray-600 hover:bg-gray-500"
          }`}
          onClick={() => setActiveSection("viewCourses")}
        >
          View Courses
        </button>

        <button
          className={`py-2 px-4 mb-4 rounded text-left w-full ${
            activeSection === "addRemoveCourses"
              ? "bg-gray-700 text-white"
              : "bg-gray-600 hover:bg-gray-500"
          }`}
          onClick={() => setActiveSection("addRemoveCourses")}
        >
          Add/Remove Courses
        </button>

        <button
          className={`py-2 px-4 mb-4 rounded text-left w-full ${
            activeSection === "semesterSettings"
              ? "bg-gray-700 text-white"
              : "bg-gray-600 hover:bg-gray-500"
          }`}
          onClick={() => setActiveSection("semesterSettings")}
        >
          Semester Settings
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* View Courses Section */}
        {activeSection === "viewCourses" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Fall 2024: Courses
            </h2>
            {courses ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-gray-600 font-medium">Course Code</th>
                      <th className="py-3 px-4 border-b text-gray-600 font-medium">Has Professor</th>
                      <th className="py-3 px-4 border-b text-gray-600 font-medium">Seats</th>
                      <th className="py-3 px-4 border-b text-gray-600 font-medium">Enrolled</th>
                      <th className="py-3 px-4 border-b text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course: any) => (
                      <tr key={course.course_code} className="hover:bg-gray-50">
                        {/* Course Code */}
                        <td className="py-3 px-4 border-b font-medium text-gray-700">
                          {course.course_code}
                        </td>

                        {/* Has Professor */}
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                              course.has_professor ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {course.has_professor ? "Yes" : "No"}
                          </span>
                        </td>

                        {/* Seats */}
                        <td className="py-3 px-4 border-b text-gray-600">{course.seats}</td>

                        {/* Number Enrolled */}
                        <td className="py-3 px-4 border-b text-gray-600">{course.numEnrolled}</td>

                        {/* Action Button */}
                        <td className="py-3 px-4 border-b">
                          <Link
                            href={`/manager/${course.course_code}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}

          </div>
        )}

        {/* Add/Remove Courses Section */}
        {activeSection === "addRemoveCourses" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Add/Remove Courses
            </h2>
            <p className="text-gray-600">
              This section will allow you to manage course additions and deletions.
            </p>
            {/* Add functionality for managing courses here */}
          </div>
        )}


        {/* Semester Settings Section */}
        {activeSection === "semesterSettings" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Semester Settings
            </h2>
            <p className="text-gray-600 mb-4">
              Configure settings for the semester.
            </p>
            <div>
              {loadingSemester ? (
                <p className="text-white-500">Loading current semester...</p>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const semesterValue = currentSemester.trim();

                    if (!semesterValue) {
                      alert("Please enter a valid semester.");
                      return;
                    }

                    const success = await updateSemesterAction(semesterValue); // Call to `updateSemesterAction`
                    if (success) {
                      alert("Semester updated successfully!");
                    } else {
                      alert("Failed to update semester. Please try again.");
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="semester"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Semester
                    </label>
                    <input
                      type="text"
                      id="semester"
                      name="semester"
                      value={currentSemester}
                      onChange={(e) => setCurrentSemester(e.target.value)}
                      placeholder="Enter semester (e.g., Fall 2024)"
                      className="mt-1 block w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />

                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Update Semester
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
