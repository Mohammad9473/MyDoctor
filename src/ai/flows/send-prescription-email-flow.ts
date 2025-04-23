'use server';
/**
 * @fileOverview An email sending AI agent.
 *
 * - sendPrescriptionEmail - A function that sends an email.
 * - SendPrescriptionEmailInput - The input type for the sendPrescriptionEmail function.
 * - SendPrescriptionEmailOutput - The return type for the sendPrescriptionEmail function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {sendEmail} from '@/services/email';

const SendPrescriptionEmailInputSchema = z.object({
  patientEmail: z.string().describe('The email address of the patient.'),
  prescriptionDetails: z.string().describe('The details of the prescription to send.'),
});

export type SendPrescriptionEmailInput = z.infer<typeof SendPrescriptionEmailInputSchema>;

const SendPrescriptionEmailOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the email was sent successfully.'),
});

export type SendPrescriptionEmailOutput = z.infer<typeof SendPrescriptionEmailOutputSchema>;

export async function sendPrescriptionEmail(input: SendPrescriptionEmailInput): Promise<SendPrescriptionEmailOutput> {
  return sendPrescriptionEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendPrescriptionEmailPrompt',
  input: {
    schema: z.object({
      patientEmail: z.string().describe('The email address of the patient.'),
      prescriptionDetails: z.string().describe('The details of the prescription to send.'),
    }),
  },
  output: {
    schema: z.object({
      success: z.boolean().describe('Indicates whether the email was sent successfully.'),
    }),
  },
  prompt: `You are an AI assistant helping doctors send prescriptions to patients via email.

A doctor has prepared a prescription for a patient and needs to send it to them.

Patient Email: {{{patientEmail}}}
Prescription Details: {{{prescriptionDetails}}}

Please send the prescription details to the patient's email address and indicate whether the email was sent successfully.`,
});

const sendPrescriptionEmailFlow = ai.defineFlow<
  typeof SendPrescriptionEmailInputSchema,
  typeof SendPrescriptionEmailOutputSchema
>(
  {
    name: 'sendPrescriptionEmailFlow',
    inputSchema: SendPrescriptionEmailInputSchema,
    outputSchema: SendPrescriptionEmailOutputSchema,
  },
  async input => {
    try {
      const emailSent = await sendEmail({
        to: input.patientEmail,
        subject: 'Your Prescription from MediScript Connect',
        body: `Dear Patient,<br/><br/>Please find your prescription details below:<br/><br/>${input.prescriptionDetails}<br/><br/>Sincerely,<br/>MediScript Connect`,
      });
      return {success: emailSent};
    } catch (error: any) {
      console.error('Failed to send email:', error);
      return {success: false};
    }
  }
);
