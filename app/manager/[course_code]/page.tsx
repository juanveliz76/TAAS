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



  console.log("object: ", course);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found</p>; // Handle error case
  }

  return (
    <div className="container mx-auto p-4">
      
    </div>
  );
}
