"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const router = useRouter();
  const {user , signUp , googleSignUp , error, isLoading} = useAuth()

  if (user) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password){
      return;
    }
    await signUp(email, password);
   
  };
  const handleGoogleSignUp = async () => {
    await googleSignUp();
  };

  useEffect(() => {
    if (user) {
      router.push(isDoctor ? '/doctor/dashboard' : '/patient/dashboard');
    }
  }, [user, isDoctor, router]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-lg shadow-lg border-none">
          {isLoading && (<div className="absolute w-full h-full bg-gray-200/50 z-10 flex justify-center items-center">
              Loading ...
          </div>)}
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
                    onCheckedChange={(e) => setIsDoctor(!isDoctor ? true : false)}
                    className="mr-2"
                  />
                  Sign up as a Doctor
                </label>
              </div>

              <div className="w-full">
                {error && <p className="text-red-500 text-start">{error}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>Sign Up</Button>

              <Button type="button" className="w-full mt-4 bg-white text-gray-800 border" onClick={handleGoogleSignUp}>Sign Up with Google</Button>

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
