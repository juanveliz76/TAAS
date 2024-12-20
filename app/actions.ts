"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import preferences from "./student/preferences/page";
import { v4 as uuidv4 } from 'uuid';

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

  if(data != null && data[0].role == 'Student') {
    const { data } = await supabase
    .from('student')
    .select('profile_complete')
    .eq('email', email)

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

  const { } = await supabase
    .from('student')
    .update({travel: t}) 
    .eq('email', email)
}

export const setUpdatesResearch = async (email: string, AIML: boolean, ALGO: boolean, BIO: boolean, CC: boolean, CV: boolean, D: boolean, G: boolean, HCI: boolean, N:boolean) => {
  const supabase = createClient();

  const { } = await supabase
    .from('student')
    .update({AIML: AIML, ALGO: ALGO, BIO: BIO, CC: CC, CV: CV, D: D, G: G, HCI: HCI, N: N}) 
    .eq('email', email)
}

export async function getUpdates(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase
  .from('student')
  .select('travel, AIML, ALGO, BIO, CC, CV, D, G, HCI, N') 
  .eq('email', email)
  
  return data;
}

export async function getStudentPref(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase
  .from('student_class_preference')
  .select('course_code, preference')
  .eq('student_email', email)
  
  return data;
}

export async function addPref(email: string, course: string, pref: number) {
  const supabase = createClient();
  console.log(email, course, pref)

  const { data } = await supabase
    .from('student_class_preference')
    .select('preference') 
    .eq('student_email', email)
    .eq('course_code', course)


    console.log(data?.length)

  if(data?.length != 0) {
    const { } = await supabase
    .from('student_class_preference')
    .update({preference: pref}) 
    .eq('student_email', email)
    .eq('course_code', course)
  }
  else {
    const {error} = await supabase
    .from('student_class_preference')
    .insert({ student_email: email, course_code: course, preference: pref })

    console.log(error)
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
  const supabase = createClient();
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

export const selectClassesAction = async () => {
  return redirect("professor/select-classes");
};
export const selectTAsPreference = async () => {
  return redirect("professor/select-TA-preference"); // Redirects to the page for selecting TAs
};
export const confirmSubmit = async () => {
  return redirect("professor/select-classes/confirm_submit")
}

// Fetch Student Data Action
export const fetchStudentDataAction = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('student').select('*');

  if (error) {
    console.error("Error fetching students:", error.message);
    return { error: "Failed to fetch students." };
  }

  return data;
};

export const fetchProfessorPreferencesAction = async (professorName: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("professor_class_preferences")
    .select('professor')
    .eq('professor', professorName)
    .single();

  if (error) {
    console.error("Error fetching professor preferences:", error.message);
    return { hasPreferences: false };
  }

  return { hasPreferences: Boolean(data) };
};
