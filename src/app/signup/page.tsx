"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement Firebase authentication and user role creation
    // Example:
    // try {
    //   const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //   // Create user profile in Firebase Firestore with role (patient or doctor)
    //   await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
    //     email: email,
    //     role: isDoctor ? 'doctor' : 'patient',
    //   });
    //   router.push(isDoctor ? '/doctor/dashboard' : '/patient/dashboard');
    // } catch (err: any) {
    //   setError(err.message);
    // }
    // REMEMBER TO ADD FIREBASE CONFIGURATION AND INITIALIZATION

    // Placeholder success:
    console.log('Signup successful (placeholder)');
    router.push(isDoctor ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-lg shadow-lg border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-foreground">
              Sign Up to <span className="text-accent">MediScript Connect</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create an account to connect with doctors and manage your prescriptions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full shadow-sm"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full shadow-sm"
              />

              <div className="flex items-center mb-4 w-full justify-start">
                <label htmlFor="isDoctor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                  <Checkbox
                    id="isDoctor"
                    checked={isDoctor}
                    onCheckedChange={(e) => setIsDoctor(e)}
                    className="mr-2"
                  />
                  Sign up as a Doctor
                </label>
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <Button type="submit" className="w-full">Sign Up</Button>
            </form>

            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-accent">Login</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
