"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { user, login, googleSignUp, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password){
      return;
    }
    await login(email, password);

  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) return null;
  const handleGoogleSignUp = async () => {
    await googleSignUp();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-lg shadow-lg border-none">
          {isLoading && (<div className="absolute w-full h-full bg-gray-200/50 z-10 flex justify-center items-center">
              Loading ...
          </div>)}
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
              <div className="w-full">
                {error && <p className="text-red-500 text-start">{error}</p>}

              </div>

              <Button type="submit" className="w-full" disabled={isLoading} >Login</Button>

              <Button type="button" className="w-full mt-4 bg-white text-gray-800 border" onClick={handleGoogleSignUp}>Login with Google</Button>

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
