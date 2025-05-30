import React, { useState, useEffect } from 'react';
import {useMutation } from '@apollo/client';
import { LOGIN_DATA } from '../constants/constant';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [postLoginFormData, { data, loading, error: mutationError }] = useMutation(LOGIN_DATA);

  useEffect(() => {
    if (data && data.login === "success") {
      setSuccess('Login successful! Please wait...');
      setError('');
      setTimeout(() => window.location.reload(), 1000);
    }
  }, [data]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
      setSuccess('');
    }
  }, [mutationError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const { email, password } = formData;
    if (!email || !password) {
      setError('Please enter both email and password.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    postLoginFormData({ variables: { email, password } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}
        {loading && <p className="text-blue-500 text-lg mb-4 text-center">Logging in...</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData?.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData?.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
