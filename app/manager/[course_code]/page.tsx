"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function CoursePage({
  params,
}: {
  params: Promise<{ course_code: string }>;
}) {
  const router = useRouter();
  const [cc, setCc] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCc(resolvedParams.course_code);
    }
    fetchParams();
  }, [params]);

  if (!cc) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Course: {cc}</h1>
      <p>Select an action for this course:</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => router.push(`/manager/${cc}/assignprofessor`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Assign Professors
        </button>

        <button
          onClick={() => router.push(`/manager/${cc}/assignta`)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Assign Teaching Assistants
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push(`/manager`)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
