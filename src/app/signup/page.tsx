"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold">
          Sign Up to <span className="text-accent">MediScript Connect</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-80"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-80"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isDoctor"
              checked={isDoctor}
              onChange={(e) => setIsDoctor(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isDoctor">Sign up as a Doctor</label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Sign Up</Button>
        </form>

        <p className="mt-4">
          Already have an account? <Link href="/login" className="text-accent">Login</Link>
        </p>
      </main>
    </div>
  );
}
