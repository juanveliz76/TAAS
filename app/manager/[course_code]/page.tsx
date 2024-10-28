"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCourseDetails } from "@/app/actions"; // Import the backend call

export default function coursePage({
  params,
}: {
  params: { course_code: string };
}) {
  const cc = params.course_code;
  const [course, setCourse] = useState(null); // State to store the courses data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (cc) {
      // Fetch course details when course_code is available
      const fetchCourse = async () => {
        const courseData = await getCourseDetails(cc); // Fetch course details
        setCourse(courseData);
        setLoading(false); // Stop loading once data is fetched
        //console.log(courseData);
      };
      fetchCourse();
    }
  }, [cc]);

  console.log("object: ", course);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found</p>; // Handle error case
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course: {course.course_name}</h1>
      {/* Conditionally render the page based on the boolean value */}
      {course.has_professor ? (
        <div>
          <h2 className="text-xl font-semibold">Choose Teaching Assistants</h2>
          {/* Render "Choose Teaching Assistants" component or content here */}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Choose a Professor</h2>
          {/* Render "Choose a Professor" component or content here */}
        </div>
      )}
    </div>
  );
}
