"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement Firebase authentication here
    // Example:
    // try {
    //   await firebase.auth().signInWithEmailAndPassword(email, password);
    //   router.push('/patient/dashboard'); // or /doctor/dashboard based on role
    // } catch (err: any) {
    //   setError(err.message);
    // }
    // REMEMBER TO ADD FIREBASE CONFIGURATION AND INITIALIZATION

    // Placeholder success:
    console.log('Login successful (placeholder)');
    router.push('/patient/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold">
          Login to <span className="text-accent">MediScript Connect</span>
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

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Login</Button>
        </form>

        <p className="mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-accent">Sign up</Link>
        </p>
      </main>
    </div>
  );
}
