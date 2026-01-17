import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import api from "../api/axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    totalAttendance: 0,
    presentToday: 0,
    absentToday: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const empRes = await api.get("/employees");
        const attRes = await api.get("/attendance");

        const attendance = attRes.data || [];

        setStats({
          employees: empRes.data.length,
          totalAttendance: attendance.length,
          presentToday: attendance.filter((a) => a.status === "Present").length,
          absentToday: attendance.filter((a) => a.status === "Absent").length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Today Attendance",
        data: [stats.presentToday, stats.absentToday],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  const barData = {
    labels: ["Employees", "Attendance Records"],
    datasets: [
      {
        label: "HRMS Stats",
        data: [stats.employees, stats.totalAttendance],
        backgroundColor: ["#007bff", "#ffc107"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <MainLayout>
      {/* ===== Stat Cards ===== */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <StatCard title="Employees" value={stats.employees} icon="👥" bg="bg-primary" />
        </div>
        <div className="col-md-3 col-sm-6">
          <StatCard title="Total Attendance" value={stats.totalAttendance} icon="🗓️" bg="bg-warning" />
        </div>
        <div className="col-md-3 col-sm-6">
          <StatCard title="Present Today" value={stats.presentToday} icon="✅" bg="bg-success" />
        </div>
        <div className="col-md-3 col-sm-6">
          <StatCard title="Absent Today" value={stats.absentToday} icon="❌" bg="bg-danger" />
        </div>
      </div>

      {/* ===== Charts Section ===== */}
      <div className="row g-4">
        <div className="col-lg-6 col-md-12">
          <div className="card shadow-sm h-100 p-3 rounded-3">
            <h5 className="text-center mb-3">Today Attendance</h5>
            <div style={{ height: "300px" }}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="card shadow-sm h-100 p-3 rounded-3">
            <h5 className="text-center mb-3">Overall Stats</h5>
            <div style={{ height: "300px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
