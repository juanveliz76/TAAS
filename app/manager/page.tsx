"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions";
import { useRouter } from "next/navigation"; // This allows you to programmatically navigate between pages
import Link from "next/link"; // Use Link for dynamic routing

export default function ManagerPage() {
  const router = useRouter();

  const [courses, setCourses] = useState(null); // State to store the courses data


  return (
    <div className="container mx-auto p-4">
     
    </div>
  );
}
