import Link from "next/link";
import { selectClassesAction, selectTAsPreference } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

export default function ProfessorLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Centered and styled dashboard title */}
      <h1 className="text-4xl font-bold text-blue-500 mb-8 text-center">
        Professor Dashboard
      </h1>

      {/* Button container */}
      <div className="flex flex-col gap-6">
        {/* Button to pick preferred classes for next year */}
        <Link href="/professor/select-classes">
          <SubmitButton
            formAction={selectClassesAction}
            pendingText="Loading..."
            className="bg-blue-500 text-white px-6 py-3 text-lg rounded hover:bg-blue-600 transition"
          >
            Pick Preferred Classes for Next Year
          </SubmitButton>
        </Link>

        {/* Button to pick preferred TAs for current classes */}
        <Link href="/professor/select-TA-preference">
          <SubmitButton
            formAction={selectTAsPreference}
            pendingText="Loading..."
            className="bg-blue-500 text-white px-6 py-3 text-lg rounded hover:bg-blue-600 transition"
          >
            Pick Preferred TAs for Current Classes
          </SubmitButton>
        </Link>
      </div>
    </div>
  );
}
