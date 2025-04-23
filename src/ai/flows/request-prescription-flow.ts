'use server';
/**
 * @fileOverview A prescription request AI agent.
 *
 * - requestPrescription - A function that handles the prescription request process.
 * - RequestPrescriptionInput - The input type for the requestPrescription function.
 * - RequestPrescriptionOutput - The return type for the requestPrescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RequestPrescriptionInputSchema = z.object({
  patientDetails: z.string().describe('Details of the patient, including medical history and current symptoms.'),
  disease: z.string().describe('The disease or condition for which the prescription is needed.'),
  preferredDoctor: z.string().optional().describe('The name of the preferred doctor, if any.'),
});

export type RequestPrescriptionInput = z.infer<typeof RequestPrescriptionInputSchema>;

const RequestPrescriptionOutputSchema = z.object({
  requestSummary: z.string().describe('A summary of the prescription request, including patient details and disease.'),
  nextSteps: z.string().describe('Next steps for the patient, such as waiting for doctor approval or scheduling a consultation.'),
});

export type RequestPrescriptionOutput = z.infer<typeof RequestPrescriptionOutputSchema>;

export async function requestPrescription(input: RequestPrescriptionInput): Promise<RequestPrescriptionOutput> {
  return requestPrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'requestPrescriptionPrompt',
  input: {
    schema: z.object({
      patientDetails: z.string().describe('Details of the patient, including medical history and current symptoms.'),
      disease: z.string().describe('The disease or condition for which the prescription is needed.'),
      preferredDoctor: z.string().optional().describe('The name of the preferred doctor, if any.'),
    }),
  },
  output: {
    schema: z.object({
      requestSummary: z.string().describe('A summary of the prescription request, including patient details and disease.'),
      nextSteps: z.string().describe('Next steps for the patient, such as waiting for doctor approval or scheduling a consultation.'),
    }),
  },
  prompt: `You are an AI assistant helping patients request prescriptions from doctors.

A patient is requesting a prescription for a specific disease or condition. Summarize the request and provide the next steps for the patient.

Patient Details: {{{patientDetails}}}
Disease: {{{disease}}}
Preferred Doctor (if any): {{{preferredDoctor}}}

Please provide a summary of the prescription request and the next steps for the patient.`,
});

const requestPrescriptionFlow = ai.defineFlow<
  typeof RequestPrescriptionInputSchema,
  typeof RequestPrescriptionOutputSchema
>(
  {
    name: 'requestPrescriptionFlow',
    inputSchema: RequestPrescriptionInputSchema,
    outputSchema: RequestPrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
