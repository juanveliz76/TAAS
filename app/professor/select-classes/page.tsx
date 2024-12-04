"use client";

import { useEffect, useState } from "react";
import { fetchCourses } from "@/app/actions"; // Adjust the import path based on your file structure
import { sendProfCoursePreferences } from "@/app/actions";

interface Course {
  course_code: string;
}

export default function SelectClasses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const professorEmail = "professor@ufl.edu"; // Replace with the logged-in professor's email dynamically

  useEffect(() => {
    const fetchCoursesData = async () => {
      const fetchedCourses: any[] | { error: string } = await fetchCourses();

      if (Array.isArray(fetchedCourses)) {
        setCourses(fetchedCourses);
        setPreferences(new Array(fetchedCourses.length).fill(""));
        setSelectedCourses(new Array(fetchedCourses.length).fill(""));
      } else {
        console.error(fetchedCourses.error);
      }
    };

    fetchCoursesData();
  }, []);

  const handlePreferenceChange = (index: number, value: string) => {
    const updatedPreferences = [...preferences];
    updatedPreferences[index] = value;
    setPreferences(updatedPreferences);
  };

  const handleCourseChange = (index: number, value: string) => {
    const updatedSelectedCourses = [...selectedCourses];
    updatedSelectedCourses[index] = value;
    setSelectedCourses(updatedSelectedCourses);
  };

  const handleClearCourse = (index: number) => {
    const updatedSelectedCourses = [...selectedCourses];
    updatedSelectedCourses[index] = "";
    setSelectedCourses(updatedSelectedCourses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = preferences.map((preference, index) => ({
      professor: professorEmail,
      course_code: selectedCourses[index],
      preference,
      Preferences_Filled: true,
    }));

    try {
      const { error } = await sendProfCoursePreferences(payload);

      if (!error) {
        console.log("Preferences successfully saved:", payload);
        setSubmitted(true);
      } else {
        console.error("Failed to save preferences:", error.message);
      }
    } catch (error) {
      console.error("An error occurred while saving preferences:", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        window.location.href = "/professor/select-classes/confirm_submit";
      }, 1000);
    }
  }, [submitted]);

  if (submitted) {
    return <p className="text-blue-500">Redirecting to confirmation...</p>;
  }

  if (!courses.length) {
    return <p className="text-blue-500">Loading courses...</p>;
  }

  const availableCourses = (index: number) => {
    return courses.filter(
      (course) => !selectedCourses.includes(course.course_code) || selectedCourses[index] === course.course_code
    );
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Select and Rank Classes</h1>

        <div className="flex flex-col gap-4">
          {Array.from({ length: courses.length }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor={`class-${index}`} className="text-lg font-medium flex-1 text-orange-500">
                  Class {index + 1}
                </label>
                {selectedCourses[index] && (
                  <button
                    type="button"
                    className="text-sm text-red-500 underline"
                    onClick={() => handleClearCourse(index)}
                  >
                    Clear
                  </button>
                )}
              </div>

              <select
                id={`class-${index}`}
                value={selectedCourses[index] || ""}
                onChange={(e) => handleCourseChange(index, e.target.value)}
                className={`p-2 border-2 border-blue-500 rounded-md flex-1 ${
                  selectedCourses[index] ? "text-orange-500" : "text-black"
                }`}
                required
              >
                <option value="" disabled className="text-black">
                  Select a course
                </option>
                {availableCourses(index).map((course) => (
                  <option key={course.course_code} value={course.course_code} className="text-orange-500">
                    {course.course_code}
                  </option>
                ))}
              </select>

              <label htmlFor={`preference-${index}`} className="text-sm font-medium text-orange-500">
                Preference
              </label>
              <select
                id={`preference-${index}`}
                value={preferences[index] || ""}
                onChange={(e) => handlePreferenceChange(index, e.target.value)}
                className={`p-2 border-2 border-blue-500 rounded-md flex-1 ${
                  preferences[index] ? "text-orange-500" : "text-black"
                }`}
                required
              >
                <option value="" disabled className="text-black">
                  Select preference
                </option>
                <option value="Not Preferred" className="text-orange-500">
                  Not Preferred
                </option>
                <option value="Somewhat Preferred" className="text-orange-500">
                  Somewhat Preferred
                </option>
                <option value="Highly Preferred" className="text-orange-500">
                  Highly Preferred
                </option>
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 p-2 rounded-lg text-white font-bold bg-orange-500 hover:bg-orange-600 transition"
        >
          Submit Preferences
        </button>
      </form>
    </div>
  );
}
