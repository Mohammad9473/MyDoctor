"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { requestPrescription } from '@/ai/flows/request-prescription-flow';

const formSchema = z.object({
  patientDetails: z.string().min(10, {
    message: "Patient details must be at least 10 characters.",
  }),
  disease: z.string().min(3, {
    message: "Disease name must be at least 3 characters.",
  }),
  preferredDoctor: z.string().optional(),
});

export default function PatientDashboard() {
  const [requestResult, setRequestResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientDetails: "",
      disease: "",
      preferredDoctor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Call the Genkit flow to request a prescription
    const result = await requestPrescription(values);
    setRequestResult(result.nextSteps);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <main className="flex flex-col items-center justify-start w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mt-4">
          Patient Dashboard
        </h1>
        <p className="mt-3 text-2xl">
          Welcome, Patient!
        </p>

        <section className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4">Request a Prescription</h2>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Enter your details</CardTitle>
              <CardDescription>Please fill out the form below to request a prescription.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="patientDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your medical history and current symptoms" {...field} />
                        </FormControl>
                        <FormDescription>
                          Include any relevant information about your health.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="disease"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disease/Condition</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the disease or condition" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredDoctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Doctor (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the name of your preferred doctor" {...field} />
                        </FormControl>
                        <FormDescription>
                          If you have a preferred doctor, please enter their name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={!form.formState.isValid}>Submit Request</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {requestResult && (
            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>Request Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{requestResult}</p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
