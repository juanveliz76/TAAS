"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center">

      {/* Hero Section */}
      <section className="container mx-auto text-center py-12 px-6">
        <h2 className="text-4xl font-bold mb-4 text-blue-700">
          Teaching Assistant Assignment System
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Easily assign teaching assistants, track preferences, and manage
          courses with an intuitive and efficient system designed for your
          academic needs.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 w-full">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
            <img
              src="/icons/assign.png"
              alt="Assign"
              className="h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Effortless Assignments</h3>
            <p className="text-gray-600">
              Quickly assign teaching assistants to courses and ensure the best
              fit based on preferences.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
            <img
              src="/icons/preferences.png"
              alt="Preferences"
              className="h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Track Preferences</h3>
            <p className="text-gray-600">
              Review student preferences for courses and make data-driven
              decisions.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
            <img
              src="/icons/analytics.png"
              alt="Analytics"
              className="h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Monitor assignments and preferences using a centralized dashboard.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
