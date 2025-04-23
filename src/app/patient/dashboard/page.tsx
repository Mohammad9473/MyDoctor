"use client";

export default function PatientDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold">
          Patient Dashboard
        </h1>
        <p className="mt-3 text-2xl">
          Welcome, Patient!
        </p>
        {/* Add patient-specific features here, like submitting prescription requests */}
      </main>
    </div>
  );
}
