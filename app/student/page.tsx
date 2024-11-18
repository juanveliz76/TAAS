import { SubmitButton } from "@/components/submit-button";
import { studentUpdates } from "@/app/actions";


export default function Next({ }: { }) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <SubmitButton pendingText="Loading.." formAction={studentUpdates}>
          Continue Application
        </SubmitButton>
      </div>
    </form>
  );
}