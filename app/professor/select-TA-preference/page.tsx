import Link from "next/link";

const classes = [
  { name: "COP 4600 - Operating Systems" },
  { name: "CIS 4301 - Information and Database Systems 1" },
 // { name: "Algorithms" },
 // { name: "Software Engineering" },
];

export default function SelectTAPreferencePage() {
  const getRouteForClass = (className: string) => {
    if (className === "COP 4600 - Operating Systems") return "/professor/select-TA-preference/1";
    else if (className === "CIS 4301 - Information and Database Systems 1") return "/professor/select-TA-preference/2";
    else if (className === "Algorithms") return "/professor/select-TA-preference/3";
    else if (className === "Software Engineering") return "/professor/select-TA-preference/4";
    return "#"; // Default route if no match
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Course to Set TA Preferences</h1>

      <div className="flex flex-col gap-4">
        {classes.map((cls, index) => (
          <Link
            key={index}
            href={getRouteForClass(cls.name)}
            className="border p-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
          >
            {cls.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
