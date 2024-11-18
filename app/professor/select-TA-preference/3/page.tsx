// app/student/page.tsx
import { fetchStudentDataAction } from "@/app/actions"; // Adjust the import path based on your file structure

// Define the Student interface
interface Student {
  email: string;
  name: string;
  profile_completed: boolean;
  travel: string;
  research_interest: string;
}

const StudentProfilePage = async () => {
  // Fetch the student data directly in the component
  const students = await fetchStudentDataAction();

  return (
    <div className="flex min-h-screen p-8">
      {/* Table for Student Profiles */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Student Profiles</h1>
        {Array.isArray(students) && students.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left">Rank</th>
                <th className="border-b px-4 py-2 text-left">Name</th>
                <th className="border-b px-4 py-2 text-left">Email</th>
                <th className="border-b px-4 py-2 text-left">Profile Completed</th>
                <th className="border-b px-4 py-2 text-left">Travel</th>
                <th className="border-b px-4 py-2 text-left">Research Interests</th>
                <th className="border-b px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td> {/* Display Rank */}
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">
                    {student.profile_completed ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{student.travel}</td>
                  <td className="px-4 py-2">{student.research_interest}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1">Rank Up</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Rank Down</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePage;
