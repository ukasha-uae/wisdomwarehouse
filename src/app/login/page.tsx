"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Warehouse, Loader2 } from "lucide-react";
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
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Warehouse className="text-primary-foreground h-8 w-8" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl font-bold">Wisdom Warehouse</CardTitle>
          <CardDescription>Secure login for our creative community</CardDescription>
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
              <Input id="email" type="email" placeholder="yourname@wisdomwarehouse.ae" required defaultValue={role === 'teacher' ? 'sarah@wisdomwarehouse.ae' : 'john@gmail.com'} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 font-bold text-lg shadow-md" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Log In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <br />
            <span className="text-primary font-semibold cursor-pointer">Please contact the Warehouse Administration</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}