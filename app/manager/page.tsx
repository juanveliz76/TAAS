"use client";

import { useEffect, useState } from "react";
import { createAdditionalUsers, getCourses } from "@/app/actions";
import { useRouter } from "next/navigation"; // This allows you to programmatically navigate between pages
import Link from "next/link"; // Use Link for dynamic routing

export default function ManagerPage() {
  const router = useRouter();

  const [courses, setCourses] = useState(null); // State to store the courses data

  useEffect(() => {
    // Fetch the courses data when the component mounts
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Fall 2024: Courses</h2>
        {/* Table to display courses */}
        {courses ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Course codes</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item: any) => (
                <tr key={item.course_code}>
                  {/* Link to the course page dynamically */}
                  <td className="py-2 px-4 border-b">
                    <Link href={`/manager/${item.course_code}`}>
                      <div className="text-blue-600 hover:underline">
                        {item.course_code}
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "Loading..."
        )}
      </div>

    </div>
  );
}
