"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import preferences from "./student/preferences/page";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  const { data } = await supabase
    .from("role")
    .select("role")
    .eq("email", email);

  if (data != null && data[0].role == "Student") {
    const { data } = await supabase
      .from("student")
      .select("profile_complete")
      .eq("email", email);

    return redirect("/student");
  } else if (data != null && data[0].role == "Professor") {
    return redirect("/professor");
  } else {
    return redirect("/manager");
  }
};

export const studentUpdates = async () => {
  return redirect("/student/updates");
};

export const studentPref = async () => {
  //setUpdates("student@ufl.edu",travel);
  return redirect("/student/preferences");
};

export const studentWelcome = async () => {
  return redirect("/student");
};

export const setUpdates = async (email: string, t: string) => {
  const supabase = createClient();

  const {} = await supabase
    .from("student")
    .update({ travel: t })
    .eq("email", email);
};

export const setUpdatesResearch = async (
  email: string,
  r: string,
  t: boolean,
) => {
  const supabase = createClient();

  const {} = await supabase
    .from("student")
    .update({ AIML: t })
    .eq("email", email);
};

export async function getUpdates(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("student")
    .select("travel, AIML")
    .eq("email", email);

  return data;
}

export async function getStudentPref(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("student_class_preference")
    .select("course_code, preference")
    .eq("student_email", email);

  return data;
}

export async function addPref(email: string, course: string, pref: number) {
  const supabase = createClient();
  //console.log(email, course, pref)

  const { data } = await supabase
    .from("student_class_preference")
    .select("preference")
    .eq("student_email", email)
    .eq("course_code", course);

  if (data?.length != 0) {
    const {} = await supabase
      .from("student_class_preference")
      .update({ preference: pref })
      .eq("student_email", email)
      .eq("course_code", course);
  } else {
    const {} = await supabase
      .from("student_class_preference")
      .insert({ student_email: email, course_code: course, preference: pref });
  }
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export async function getCourseDetails(course_code: string) {
  const supabase = createClient();
  // Query Supabase to get the course by its course code
  const { data, error } = await supabase
    .from("courses")
    .select("course_code, has_professor") // Select relevant fields
    .eq("course_code", course_code)
    .single();

  if (error) {
    console.error("Error fetching course details:", error);
    return null;
  }

  console.log(data);
  return data; // Returns course details including the boolean column
}

export const getCourses = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("courses").select();
    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export async function getProfessorPreferences(course_code: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("professor_class_preference")
    .select(
      `
      professor,
      preference
      `,
    )
    .eq("course_code", course_code);

  if (error) {
    console.error("Error fetching professor preferences:", error);
    return null;
  }
  return data;
}

export async function toggleProfessorAssignment(
  course_code: string,
  professor: string,
) {
  const supabase = createClient();

  // Check if the row exists
  const { data: existingData, error: checkError } = await supabase
    .from("professor_course")
    .select()
    .eq("course_code", course_code)
    .eq("professor", professor);

  if (checkError && checkError.code !== "PGRST104") {
    console.error("Error checking assignment:", checkError.message);
    return;
  }

  console.log("Existing data:", existingData);

  if (existingData && existingData.length > 0) {
    // Row exists, so delete it
    console.log("ROW EXIST ----------------------");
    const { error: deleteError } = await supabase
      .from("professor_course")
      .delete()
      .eq("course_code", course_code)
      .eq("professor", professor);

    if (deleteError)
      console.error("Error removing assignment:", deleteError.message);
  } else {
    // Row does not exist, so insert it
    console.log("ROW DOES NOT EXIST ----------------------");
    const { error: insertError } = await supabase
      .from("professor_course")
      .insert({ course_code: course_code, professor: professor });

    if (insertError)
      console.error("Error adding assignment:", insertError.message);
  }
}

export async function isProfessorAssigned(
  course_code: string,
  professor: string,
) {
  const supabase = createClient();

  // Check if the row exists
  const { data, error } = await supabase
    .from("professor_course")
    .select()
    .eq("course_code", course_code)
    .eq("professor", professor);

  if (error) {
    console.error("Error checking assignment:", error.message);
    return false; // If there's an error, return false
  }

  return data; // Return true if data exists, false otherwise
}

export async function getAssignedProfessors(course_code: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("professor_course")
    .select("professor")
    .eq("course_code", course_code);

  if (error) {
    console.error("Error fetching assigned professors:", error.message);
    return [];
  }

  return data;
}

//for student assignments

export async function getStudentPreferences(course_code: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("student_class_preference")
    .select(
      `
    student_email,
    preference
    `,
    )
    .eq("course_code", course_code);

  if (error) {
    console.error("Error fetching student preferences:", error.message);
    return [];
  }

  return data;
}

export async function getAssignedStudents(course_code: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("student_course")
    .select("student_email")
    .eq("course_code", course_code);

  if (error) {
    console.error("Error fetching assigned students:", error.message);
    return [];
  }

  return data;
}

export async function toggleStudentAssignment(
  course_code: string,
  student_email: string,
) {
  const supabase = createClient();

  // Check if student is already assigned to the course
  const { data: assignedData, error: checkError } = await supabase
    .from("student_course")
    .select()
    .eq("course_code", course_code)
    .eq("student_email", student_email);

  if (checkError) {
    console.error("Error checking assignment:", checkError.message);
    return;
  }

  if (assignedData && assignedData.length > 0) {
    // Student is assigned; remove assignment but keep score
    const { error: deleteError } = await supabase
      .from("student_course")
      .delete()
      .eq("course_code", course_code)
      .eq("student_email", student_email);

    if (deleteError) {
      console.error("Error removing assignment:", deleteError.message);
      return;
    }
  } else {
    // Student is not assigned; assign and check score
    const { error: insertError } = await supabase
      .from("student_course")
      .insert({ course_code, student_email });

    if (insertError) {
      console.error("Error assigning student:", insertError.message);
      return;
    }

    // Check if a score exists in `student_course_score`
    const { data: scoreData, error: scoreError } = await supabase
      .from("student_course_score")
      .select()
      .eq("course_code", course_code)
      .eq("student_email", student_email);

    if (scoreError && scoreError.code !== "PGRST104") {
      console.error("Error fetching student score:", scoreError.message);
      return;
    }

    // If no score exists, set an initial score (if needed)
    if (!scoreData) {
      const { error: initialScoreError } = await supabase
        .from("student_course_score")
        .insert({
          course_code: course_code,
          student_email: student_email,
          score: 0,
        });

      if (initialScoreError) {
        console.error(
          "Error setting initial score:",
          initialScoreError.message,
        );
      }
    }
  }
}

export const getStudentScores = async (courseCode: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("student_course_score") // Replace with your actual table name
      .select(
        `
        student_email,
        score
        `,
      )
      .eq("course_code", courseCode);

    if (error) {
      console.error("Error fetching student scores:", error);
      return [];
    }

    console.log(data);

    return data;
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return [];
  }
};
export const selectClassesAction = async () => {
  return redirect("professor/select-classes");
};

export const selectTAsPreference = async () => {
  return redirect("professor/select-TA-preference"); // Redirects to the page for selecting TAs
};
export const confirmSubmit = async () => {
  return redirect("professor/select-classes/confirm_submit");
};

// Fetch Student Data Action
export const fetchStudentDataAction = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("student").select("*");

  if (error) {
    console.error("Error fetching students:", error.message);
    return { error: "Failed to fetch students." };
  }

  return data;
};

export const fetchProfessorPreferencesAction = async (
  professorName: string,
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("professor_class_preferences")
    .select("professor")
    .eq("professor", professorName)
    .single();

  if (error) {
    console.error("Error fetching professor preferences:", error.message);
    return { hasPreferences: false };
  }

  return { hasPreferences: Boolean(data) };
};
