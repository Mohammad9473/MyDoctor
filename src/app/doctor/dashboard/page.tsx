"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendPrescriptionEmail } from '@/ai/flows/send-prescription-email-flow';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';


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

  useEffect(() => {
    const fetchPrescriptionRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "prescriptionRequests"));
        const requests: PrescriptionRequest[] = [];
        querySnapshot.forEach((doc) => {
          // Assuming your data structure matches the PrescriptionRequest interface
          requests.push({
            id: doc.id,
            ...doc.data() as Omit<PrescriptionRequest, 'id'>,
          });
        });
        setPrescriptionRequests(requests);
      } catch (error) {
        console.error("Error fetching prescription requests:", error);
      }
    };

    fetchPrescriptionRequests();
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
    <ProtectedRoute>

      <div className="flex flex-col items-center justify-start min-h-screen py-4 bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4 text-foreground">
          Doctor Dashboard
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Welcome, Doctor!
        </p>

        <section className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Prescription Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScrollArea className="h-[500px] w-full rounded-md border shadow-sm">
              <div className="p-4 space-y-4">
                {prescriptionRequests.map((request) => (
                  <Card
                    key={request.id}
                    onClick={() => handleRequestSelect(request)}
                    className={`cursor-pointer transition-colors duration-200 hover:bg-secondary ${selectedRequest?.id === request.id ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Request ID: {request.id}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">Disease: {request.disease}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Patient Details: {request.patientDetails}</p>
                      {request.preferredDoctor && <p className="text-sm">Preferred Doctor: {request.preferredDoctor}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Enter Prescription</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Enter the prescription details for the selected patient.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {selectedRequest ? (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Patient: {selectedRequest.patientDetails}</p>
                      <p className="text-sm font-medium">Disease: {selectedRequest.disease}</p>
                    </div>
                    <Textarea
                      placeholder="Prescription Details"
                      value={prescriptionDetails}
                      onChange={(e) => setPrescriptionDetails(e.target.value)}
                      className="shadow-sm"
                    />
                    <Button onClick={handleSendPrescription} className="w-full">Send Prescription</Button>
                    {emailResult && <p className={`text-sm ${emailResult.startsWith('Prescription sent') ? 'text-green-500' : 'text-red-500'}`}>{emailResult}</p>}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Select a prescription request to view and enter prescription details.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
    </ProtectedRoute>

  );
}

