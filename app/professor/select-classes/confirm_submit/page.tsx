import { fetchProfClassPrefDataAction } from "@/app/actions";

interface ProfessorClassPreference {
  course_code: string;
  preference: string;
}

const ThankYouPage = async () => {
  // Fetch data directly in the component
  const preferences = await fetchProfClassPrefDataAction();

  if (!Array.isArray(preferences)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p className="text-lg text-red-500">
            Failed to load your preferences. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded shadow-lg mb-6">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg">
          Your submission has been received successfully. We appreciate your input!
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Submitted Preferences</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Course Code</th>
              <th className="border border-gray-300 px-4 py-2">Preference</th>
            </tr>
          </thead>
          <tbody>
            {preferences.map((pref: ProfessorClassPreference, index: number) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{pref.course_code}</td>
                <td className="border border-gray-300 px-4 py-2">{pref.preference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThankYouPage;
