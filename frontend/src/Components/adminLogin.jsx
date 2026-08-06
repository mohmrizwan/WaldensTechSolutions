import React from 'react'
import { Link } from 'react-router-dom'

const LofiAdminLogin = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1F] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#131B2E]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white font-space">Admin Login</h1>
          <p className="mt-3 text-sm text-gray-400">
            This is a placeholder admin login page for the frontend.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-3xl border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#F4C95D]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-3xl border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#F4C95D]"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-3xl bg-[#F4C95D] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e0bb4d]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Back to{' '}
          <Link to="/" className="text-[#F4C95D] hover:text-[#e0bb4d]">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LofiAdminLogin
