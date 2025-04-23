"use client";

import Image from 'next/image';
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Link from 'next/link';
 
const images = [
  'https://picsum.photos/id/10/800/600',
  'https://picsum.photos/id/11/800/600',
  'https://picsum.photos/id/12/800/600',
  'https://picsum.photos/id/13/800/600',
];


export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter()

  useEffect(()=>{
    if(user){
        //here we can check if the user is doctor or patient
        router.push('/patient/dashboard')
        return;
      
    }
  },[user])
  if(user === null){

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to{' '}
          <span className="text-accent">
            MediScript Connect
          </span>
        </h1>

        <p className="mt-3 text-2xl text-muted-foreground">
          Connect with doctors and get your prescriptions easily.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
          {images.map((src, index) => (
            <div key={index} className="p-4">
              <Image src={src} alt="Medical Image" width={350} height={250} className="rounded-md shadow-md" />
            </div>
          ))}
        </div>

        <div className="flex mt-10">
          {!user && (<Link href="/signup">
            <Button variant="secondary" className="mx-2">Sign Up</Button>
          </Link>)}
          {!user && ( <Link href="/login">
            <Button className="mx-2">Login</Button>
          </Link>)}
        </div>
          {
            user && (
              <Button className="mt-10" onClick={()=> logout()}>
                Logout
              </Button>
            )
          }
        

        <p className="mt-8 text-muted-foreground">
          MediScript Connect - Your health, simplified.
        </p>
      </main>
    </div>
  );
}else return null

}
