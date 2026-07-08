
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<boolean>;
  signup: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('englishAceUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error('Failed to parse user from localStorage');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const storedUsers = localStorage.getItem('englishAceUsers') || '[]';
      const users = JSON.parse(storedUsers);

      const foundUser = users.find(
        (u: { name: string; password: string }) =>
          u.name.toLowerCase() === name.toLowerCase() && u.password === password
      );

      if (foundUser) {
        const { password: _pw, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('englishAceUser', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid name or password');
        return false;
      }
    } catch (err) {
      console.error('Login error', err);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const storedUsers = localStorage.getItem('englishAceUsers') || '[]';
      const users = JSON.parse(storedUsers);

      if (users.some((u: { name: string }) => u.name.toLowerCase() === name.toLowerCase())) {
        toast.error('This name is already taken. Please choose another.');
        return false;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        password,
      };

      users.push(newUser);
      localStorage.setItem('englishAceUsers', JSON.stringify(users));

      const { password: _pw, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('englishAceUser', JSON.stringify(userWithoutPassword));

      toast.success(`Account created! Welcome, ${name.trim()}!`);
      return true;
    } catch (err) {
      console.error('Signup error', err);
      toast.error('An error occurred during signup');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('englishAceUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
