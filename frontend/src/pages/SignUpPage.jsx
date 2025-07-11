import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Fullname is required");
    }

    // Validate Email
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (!formData.password)
      return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 characters");

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      const response = await signup(formData);
      console.log(response);
      if (response?.success) {
        navigate("/login"); // Redirect user to the login page
      }
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const success = validateForm();

  //   if (success === true) {
  //     signup(formData);
  //   }
  //   // if (success === true) {
  //   //   try {
  //   //     await signup(formData);
  //   //     toast.success("Signup successful! Redirecting to login...");
  //   //     navigate("/login"); // Redirect to login page
  //   //   } catch (error) {
  //   //     toast.error("Signup failed. Please try again.");
  //   //   }
  //   // }
  // };


  return (
    // small ane medium mate only one column hase beacuse specify nathi karyu and large device mate 2 columns hase 
    <div className='min-h-screen grid lg:grid-cols-2 pt-10'>

      {/* Left Side  */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>


          {/* LOGO  */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get Started with free account</p>
            </div>
          </div>


          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* FullName  */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-10'
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email  */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password  */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='input input-bordered w-full pl-10'
                  placeholder='******'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ? (
                      <EyeOff className='size-5 text-base-content/40' />
                    ) : (
                      <Eye className='size-5 text-base-content/40' />
                    )
                  }
                </button>
              </div>
            </div>

            <button className='btn btn-primary w-full' type='submit' disabled={isSigningUp}>
              {
                isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )
              }
            </button>



          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account {" "}
              <Link className="link link-primary" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>


      {/* Right Side  */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
      />


    </div>
  )
}

export default SignUpPage