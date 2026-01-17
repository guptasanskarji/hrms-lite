import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import api from "../api/axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const empRes = await api.get("/employees");
        const attRes = await api.get("/attendance"); // make sure this endpoint exists

        const totalEmployees = empRes.data.length;
        const presentToday = attRes.data.filter(a => a.status === "Present").length;
        const absentToday = attRes.data.filter(a => a.status === "Absent").length;

        setStats({
          employees: totalEmployees,
          totalAttendance: attRes.data.length,
          presentToday,
          absentToday
        });
      } catch (err) {
        console.error(err);
        setStats({ employees: 0, totalAttendance: 0, presentToday: 0, absentToday: 0 });
      }
    }
    fetchStats();
  }, []);

  if (!stats) return <Loader />;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [{
      label: "Today Attendance",
      data: [stats.presentToday, stats.absentToday],
      backgroundColor: ["#28a745", "#dc3545"]
    }]
  };

  const barData = {
    labels: ["Employees", "Attendance Records"],
    datasets: [{
      label: "HRMS Stats",
      data: [stats.employees, stats.totalAttendance],
      backgroundColor: ["#007bff", "#ffc107"]
    }]
  };

  return (
    <MainLayout>
      <div className="row">
        <StatCard title="Employees" value={stats.employees} icon="👥" bg="bg-primary"/>
        <StatCard title="Total Attendance" value={stats.totalAttendance} icon="🗓️" bg="bg-warning"/>
        <StatCard title="Present Today" value={stats.presentToday} icon="✅" bg="bg-success"/>
        <StatCard title="Absent Today" value={stats.absentToday} icon="❌" bg="bg-danger"/>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="text-center">Today Attendance</h5>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="text-center">Overall Stats</h5>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
