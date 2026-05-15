import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Mail, Lock, Heart, Users, BarChart3, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Heart, title: "Patient Care", desc: "Streamlined patient management" },
    { icon: Users, title: "Team Collaboration", desc: "Real-time staff coordination" },
    { icon: BarChart3, title: "Analytics", desc: "Data-driven insights" },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to access your hospital dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm animate-slide-left">
          
          {/* Email Input */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition duration-300 ${
                focusedField === 'email' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-100"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition duration-300 ${
                focusedField === 'password' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-100"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 mt-8 transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-12">
          Secure Hospital Management System
        </p>
      </div>

      {/* Right Side - Features (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-emerald-50 via-emerald-100 to-emerald-200 flex-col justify-center px-12 py-12 relative overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />
        
        <div className="relative z-10">
          <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Modern Healthcare Management
          </h3>
          <p className="text-lg text-gray-600 mb-16 leading-relaxed">
            Streamline your hospital operations with our comprehensive management system
          </p>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group flex gap-4 p-5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:border-emerald-300 hover:shadow-lg transition duration-300 cursor-pointer animate-slide-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
