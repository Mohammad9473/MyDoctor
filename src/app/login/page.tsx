"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-lg shadow-lg border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-foreground">
              Login to <span className="text-accent">MediScript Connect</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account.
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

              {error && <p className="text-red-500">{error}</p>}

              <Button type="submit" className="w-full">Login</Button>
            </form>

            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account? <Link href="/signup" className="text-accent">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
