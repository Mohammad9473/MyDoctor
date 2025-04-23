"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendPrescriptionEmail } from '@/ai/flows/send-prescription-email-flow';

interface PrescriptionRequest {
  id: string;
  patientDetails: string;
  disease: string;
  preferredDoctor?: string;
  patientEmail: string; // Added patientEmail
}

export default function DoctorDashboard() {
  const [prescriptionRequests, setPrescriptionRequests] = useState<PrescriptionRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PrescriptionRequest | null>(null);
  const [prescriptionDetails, setPrescriptionDetails] = useState('');
  const [emailResult, setEmailResult] = useState<string | null>(null);

  // Placeholder data - replace with actual data fetching from a database or API
  useEffect(() => {
    // Simulate fetching data
    const dummyData: PrescriptionRequest[] = [
      { id: "1", patientDetails: "John Doe, 30 years old, history of allergies", disease: "Seasonal Allergies", preferredDoctor: "Dr. Smith", patientEmail: "john.doe@example.com" },
      { id: "2", patientDetails: "Jane Smith, 45 years old, high blood pressure", disease: "Hypertension", patientEmail: "jane.smith@example.com" },
      { id: "3", patientDetails: "Mike Brown, 25 years old, occasional migraines", disease: "Migraine", patientEmail: "mike.brown@example.com" },
    ];
    setPrescriptionRequests(dummyData);
  }, []);

  const handleRequestSelect = (request: PrescriptionRequest) => {
    setSelectedRequest(request);
    setPrescriptionDetails(''); // Clear previous prescription details
    setEmailResult(null); // Clear previous email result
  };

  const handleSendPrescription = async () => {
    if (selectedRequest) {
      // Call the Genkit flow to send the prescription email
      const result = await sendPrescriptionEmail({
        patientEmail: selectedRequest.patientEmail,
        prescriptionDetails: prescriptionDetails,
      });
      setEmailResult(result.success ? 'Prescription sent successfully!' : 'Failed to send prescription.');
    }
  };

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
          <div className="flex">
            <ScrollArea className="w-1/2 h-[400px] rounded-md border mr-4">
              <div className="p-4 space-y-4">
                {prescriptionRequests.map((request) => (
                  <Card key={request.id} onClick={() => handleRequestSelect(request)} className={`cursor-pointer ${selectedRequest?.id === request.id ? 'bg-accent' : ''}`}>
                    <CardHeader>
                      <CardTitle>Request ID: {request.id}</CardTitle>
                      <CardDescription>Disease: {request.disease}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Patient Details: {request.patientDetails}</p>
                      {request.preferredDoctor && <p>Preferred Doctor: {request.preferredDoctor}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>Enter Prescription</CardTitle>
                <CardDescription>Enter the prescription details for the selected patient.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {selectedRequest ? (
                  <>
                    <p>Patient: {selectedRequest.patientDetails}</p>
                    <p>Disease: {selectedRequest.disease}</p>
                    <Textarea
                      placeholder="Prescription Details"
                      value={prescriptionDetails}
                      onChange={(e) => setPrescriptionDetails(e.target.value)}
                    />
                    <Button onClick={handleSendPrescription}>Send Prescription</Button>
                    {emailResult && <p>{emailResult}</p>}
                  </>
                ) : (
                  <p>Select a prescription request to view and enter prescription details.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
