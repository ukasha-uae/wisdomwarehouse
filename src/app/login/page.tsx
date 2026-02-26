"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRole = searchParams.get('role') || 'teacher';
  const [role, setRole] = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      router.push(role === 'teacher' ? '/teacher' : '/parent');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="text-primary-foreground h-6 w-6" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access DailyGlimpse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex bg-muted p-1 rounded-lg mb-8">
            <button 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${role === 'teacher' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => setRole('teacher')}
            >
              Teacher
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${role === 'parent' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => setRole('parent')}
            >
              Parent
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@school.com" required defaultValue={role === 'teacher' ? 'sarah@dailyglimpse.com' : 'john@gmail.com'} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 font-bold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <span className="text-primary font-semibold cursor-pointer">Contact Administration</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}