import Link from "next/link";

const StudentPref = () => {
    return (
      <>
        <div className="container text-center">
          <div className="d-flex justify-content-center">
          <Link className="text-foreground font-medium underline" href="/student">
              Back
            </Link>
          </div>
        </div>
      </>
    );
  };
  
  export default StudentPref;
  