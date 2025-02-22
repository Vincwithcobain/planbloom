
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for testing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@admin.com',
    name: 'Admin User',
    isAdmin: true,
    createdAt: new Date().toISOString(),
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setIsLoading(false);
  }, []);

  // Temporary mock login function
  const login = async (credentials: LoginCredentials) => {
    try {
      // For testing, accept any email/password combination
      const mockUser: User = {
        id: '2',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        isAdmin: credentials.email === 'admin@admin.com',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
      throw error;
    }
  };

  // Temporary mock register function
  const register = async (credentials: RegisterCredentials) => {
    try {
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        isAdmin: credentials.email === 'admin@admin.com',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      toast({
        title: "Success",
        description: "Registered successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
