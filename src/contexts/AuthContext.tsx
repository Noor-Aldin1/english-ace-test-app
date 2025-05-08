
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage on initial load
    const storedUser = localStorage.getItem('englishAceUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    try {
      // In a real app, this would be an API call
      const storedUsers = localStorage.getItem('englishAceUsers') || '[]';
      const users = JSON.parse(storedUsers);
      
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('englishAceUser', JSON.stringify(userWithoutPassword));
        toast.success("Login successful!");
        setIsLoading(false);
        return true;
      } else {
        toast.error("Invalid email or password");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error', error);
      toast.error("An error occurred during login");
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call for registration
      const storedUsers = localStorage.getItem('englishAceUsers') || '[]';
      const users = JSON.parse(storedUsers);
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        toast.error("Email already registered");
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password
      };
      
      // Save to "database"
      users.push(newUser);
      localStorage.setItem('englishAceUsers', JSON.stringify(users));
      
      // Log in the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('englishAceUser', JSON.stringify(userWithoutPassword));
      
      toast.success("Account created successfully!");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error', error);
      toast.error("An error occurred during signup");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('englishAceUser');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
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
