'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

console.log('Login page module loaded');

export default function LoginPage() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const { signIn, user, loading } = useAuth();
  const router = useRouter();

  console.log('LoginPage rendering, loading:', loading, 'user:', user ? 'exists' : 'null');

  // Navigation after login
  useEffect(() => {
    console.log('LoginPage useEffect (navigation), loading:', loading, 'user:', user ? 'exists' : 'null');
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Auto-login for development
  useEffect(() => {
    console.log('LoginPage useEffect (auto-login), loading:', loading, 'user:', user ? 'exists' : 'null');
    if (!loading && !user) {
      console.log('Auto-login for development');
      signIn('user@example.com', 'password').then(() => {
        console.log('Auto-login successful');
      });
    }
  }, [loading, user, signIn, router]);

  // Early return after all hooks
  if (loading || user) {
    console.log('LoginPage early return due to loading or user');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with email:', email);
    try {
      await signIn(email, password);
      console.log('Login successful');
      router.push('/'); // Redirect to dashboard after successful login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  console.log('LoginPage rendering form');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <p className="text-center text-gray-500">Auto-login enabled for development</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
