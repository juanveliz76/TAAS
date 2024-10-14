import { nextAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

export default function Next({ }: { }) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        Student
        <SubmitButton pendingText="Next" formAction={nextAction}>
          Next
        </SubmitButton>
      </div>
    </form>
  );
}
