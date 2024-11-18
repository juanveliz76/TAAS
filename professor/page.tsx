import Link from "next/link";
import { selectClassesAction, selectTAsPreference } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

export default function ProfessorLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Professor Dashboard</h1>

      <div className="flex flex-col gap-4">
        {/* Button to pick preferred classes for next year */}
        <Link href="/professor/select-classes">
          <SubmitButton formAction={selectClassesAction} pendingText="Loading...">
            Pick Preferred Classes for Next Year
          </SubmitButton>
        </Link>

        {/* Button to pick preferred TAs for current classes */}
        <Link href="/professor/select-TA-preference">
          <SubmitButton formAction={selectTAsPreference} pendingText="Loading...">
            Pick Preferred TAs for Current Classes
          </SubmitButton>
        </Link>
      </div>
    </div>
  );
}
