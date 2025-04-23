"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrescriptionRequest {
  id: string;
  patientDetails: string;
  disease: string;
  preferredDoctor?: string;
}

export default function DoctorDashboard() {
  const [prescriptionRequests, setPrescriptionRequests] = useState<PrescriptionRequest[]>([]);

  // Placeholder data - replace with actual data fetching from a database or API
  useEffect(() => {
    // Simulate fetching data
    const dummyData: PrescriptionRequest[] = [
      { id: "1", patientDetails: "John Doe, 30 years old, history of allergies", disease: "Seasonal Allergies", preferredDoctor: "Dr. Smith" },
      { id: "2", patientDetails: "Jane Smith, 45 years old, high blood pressure", disease: "Hypertension" },
      { id: "3", patientDetails: "Mike Brown, 25 years old, occasional migraines", disease: "Migraine" },
    ];
    setPrescriptionRequests(dummyData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <main className="flex flex-col items-center justify-start w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mt-4">
          Doctor Dashboard
        </h1>
        <p className="mt-3 text-2xl">
          Welcome, Doctor!
        </p>

        <section className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4">Prescription Requests</h2>
          <ScrollArea className="w-full h-[400px] rounded-md border">
            <div className="p-4 space-y-4">
              {prescriptionRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle>Request ID: {request.id}</CardTitle>
                    <CardDescription>Disease: {request.disease}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Patient Details: {request.patientDetails}</p>
                    {request.preferredDoctor && <p>Preferred Doctor: {request.preferredDoctor}</p>}
                    {/* Add actions here, like "View Details" and "Approve Prescription" */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
    </div>
  );
}
