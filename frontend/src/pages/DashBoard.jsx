import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import GenderChart from "../components/charts/GenderChart";
import {
  Users,
  UserRound,
  CalendarDays,
  IndianRupee,
  TrendingUp,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  getDashboardStats,
  getRevenueAnalytics,
  getGenderAnalytics,
} from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const statsData = await getDashboardStats();
      const revenue = await getRevenueAnalytics();
      const gender = await getGenderAnalytics();

      setStats(statsData);
      setRevenueData(revenue);
      setGenderData(gender);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 p-8 shadow-xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-8 h-8 text-white" strokeWidth={2} />
                  <h1 className="text-4xl font-bold text-white">
                    Dashboard Overview
                  </h1>
                </div>
                <p className="text-white text-lg leading-relaxed max-w-2xl">
                  Real-time insights into hospital operations, patient care, and financial performance. Monitor key metrics at a glance.
                </p>
              </div>
              <div className="hidden lg:flex flex-col items-end gap-2 text-white/90">
                <p className="text-sm font-medium text-white/80">Last Updated</p>
                <p className="text-2xl font-bold text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Key Metrics
            </h2>
            <p className="text-gray-600 mt-1">Summary of hospital performance metrics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Patients"
              value={stats.totalPatients || 0}
              icon={<Users />}
            />
            <StatCard
              title="Active Doctors"
              value={stats.totalDoctors || 0}
              icon={<UserRound />}
            />
            <StatCard
              title="Appointments"
              value={stats.totalAppointments || 0}
              icon={<CalendarDays />}
            />
            <StatCard
              title="Revenue"
              value={`₹${stats.totalRevenue?.toLocaleString() || "0"}`}
              icon={<IndianRupee />}
            />
          </div>
        </section>

        {/* Alert Banner */}
        <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-xl">
          <AlertCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">System Status</h3>
            <p className="text-gray-700">All systems operational. Data updates every 5 minutes.</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue Analytics</h3>
              <p className="text-gray-600 text-sm">Monthly revenue trends and performance</p>
            </div>
            <div className="relative">
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full" />
                </div>
              ) : (
                <RevenueChart data={revenueData} />
              )}
            </div>
          </section>

          {/* Gender Distribution Chart */}
          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient Demographics</h3>
              <p className="text-gray-600 text-sm">Gender distribution of patients</p>
            </div>
            <div className="relative">
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full" />
                </div>
              ) : (
                <GenderChart data={genderData} />
              )}
            </div>
          </section>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Avg. Rating</h4>
              <span className="text-2xl font-bold text-emerald-600">4.8</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "96%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-3">Based on patient feedback</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Occupancy Rate</h4>
              <span className="text-2xl font-bold text-emerald-600">85%</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "85%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-3">Hospital bed capacity</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Completion Rate</h4>
              <span className="text-2xl font-bold text-emerald-600">92%</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "92%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-3">Treatment completion</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
