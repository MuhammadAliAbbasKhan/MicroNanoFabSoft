import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, DollarSign, Database, Activity, RefreshCw, Edit } from 'lucide-react';
import { getAdminAnalytics, getMongoDBStatus, listAdminUsers, updateAdminUserPlan } from '../services/api';
import { useToast } from '../context/ToastContext';

const AdminDashboardPageComponent = ({ currentUser }) => {
  const [analytics, setAnalytics] = useState(null);
  const [mongoStatus, setMongoStatus] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState(localStorage.getItem('adminPasscode') || '');

  const { addToast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, [passcode]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsData, mongoData, usersData] = await Promise.all([
        getAdminAnalytics(),
        getMongoDBStatus(),
        listAdminUsers()
      ]);

      if (analyticsData.status === 'success') {
        setAnalytics(analyticsData.metrics);
      }
      if (mongoData.mongodb) {
        setMongoStatus(mongoData.mongodb);
      }
      if (usersData.status === 'success') {
        setUsersList(usersData.users || []);
      }
    } catch (err) {
      console.warn("Admin authorization check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (userId, newTier) => {
    try {
      const res = await updateAdminUserPlan({ user_id: userId, plan_tier: newTier });
      if (res.status === 'success') {
        addToast(res.message, 'success');
        fetchDashboardData();
      }
    } catch (err) {
      addToast('Failed to update user license tier.', 'error');
    }
  };

  if (!currentUser?.is_admin && !analytics) {
    return (
      <div className="w-full font-sans py-16 max-w-md mx-auto px-4 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 space-y-4">
          <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Admin Authorization Required</h2>
          <input 
            type="password" 
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              localStorage.setItem('adminPasscode', e.target.value);
            }}
            placeholder="Enter Admin Passcode..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
          <button 
            onClick={fetchDashboardData}
            className="w-full bg-[#0066b2] text-white font-bold py-2 rounded-lg text-xs"
          >
            Authenticate Admin Console
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#2d3136] text-white p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <div>
            <h1 className="text-2xl font-black">MicroNanoFabSoft Telemetry &amp; Admin Console</h1>
            <p className="text-xs text-slate-400">Live DB Telemetry &bull; Stripe Recurring Revenue &bull; User Subscriptions</p>
          </div>
        </div>

        <button 
          onClick={fetchDashboardData}
          className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="genisys-card p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Registered Users</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-slate-900">{analytics.total_users}</span>
              <Users className="w-6 h-6 text-[#0066b2]" />
            </div>
            <span className="text-[11px] text-slate-500 block">{analytics.subscribed_users} Paid Subscriptions</span>
          </div>

          <div className="genisys-card p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Monthly Recurring (MRR)</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#23b14d]">${analytics.monthly_recurring_revenue}</span>
              <DollarSign className="w-6 h-6 text-[#23b14d]" />
            </div>
            <span className="text-[11px] text-slate-500 block">ARR: ${analytics.annual_projected_revenue}</span>
          </div>

          <div className="genisys-card p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Process Service Requests</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#f37021]">{analytics.total_service_requests}</span>
              <Activity className="w-6 h-6 text-[#f37021]" />
            </div>
            <span className="text-[11px] text-slate-500 block">{analytics.total_trials} Evaluation Requests</span>
          </div>

          <div className="genisys-card p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">MongoDB Atlas Cloud</span>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${mongoStatus?.connected ? 'text-[#23b14d]' : 'text-amber-500'}`}>
                {mongoStatus?.connected ? 'CONNECTED' : 'OFFLINE'}
              </span>
              <Database className="w-6 h-6 text-[#0066b2]" />
            </div>
            <span className="text-[11px] text-slate-500 block">Database: {mongoStatus?.database || 'micronanofabsoft_db'}</span>
          </div>
        </div>
      )}

      {/* User Management Table */}
      <div className="genisys-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">User Accounts &amp; License Tier Management</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">License Tier</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Admin</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{usr.username}</td>
                  <td className="py-3 text-slate-600">{usr.email}</td>
                  <td className="py-3">
                    <span className="uppercase font-bold text-[#0066b2] bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                      {usr.plan_tier}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${usr.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {usr.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 font-semibold">{usr.is_admin ? '🛡️ Yes' : 'No'}</td>
                  <td className="py-3 text-right">
                    <select
                      value={usr.plan_tier}
                      onChange={(e) => handleUpdatePlan(usr.id, e.target.value)}
                      className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] font-medium"
                    >
                      <option value="basic">Academic ($149)</option>
                      <option value="standard">Commercial ($499)</option>
                      <option value="premium">Enterprise ($999)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export const AdminDashboardPage = AdminDashboardPageComponent;
export default AdminDashboardPageComponent;
