import { SubmitButton } from "@/components/submit-button";
import { studentUpdates } from "@/app/actions";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Next({ }: { }) {
  return (
    <form>
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Welcome to the TAAS</CardTitle>
      <CardDescription>Applications are due December 4th.</CardDescription>
    </CardHeader>
    <CardContent>
    </CardContent>
    <CardFooter className="flex justify-between">
      <SubmitButton pendingText="Loading.." formAction={studentUpdates}>
      Continue
      </SubmitButton>
      <Button>Submit</Button>
    </CardFooter>
  </Card>
  </form>
  );
}