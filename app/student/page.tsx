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
    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <div className="mt-[-30vh]">
        <form className="w-full max-w-md">
          <Card className="w-[350px] bg-white border-2 border-blue-500">
            <CardHeader>
              <CardTitle className="text-black">Welcome to the TAAS</CardTitle>
              <CardDescription className="text-primary text-black">Applications are due December 4th.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button className="border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" formAction={studentUpdates}>
                Continue
              </Button>
              <Button className="border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}