import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, PieChart } from 'lucide-react';

// Sample attendance data structure
const attendanceData = {
  1: {
    courseId: 1,
    courseName: "Math 101",
    totalClasses: 45,
    attendedClasses: 42,
    lastUpdated: "2024-11-14",
    monthlyAttendance: {
      "October": { present: 15, absent: 1, total: 16 },
      "September": { present: 14, absent: 2, total: 16 },
      "August": { present: 13, absent: 0, total: 13 }
    },
    recentClasses: [
      { date: "2024-11-14", status: "present", topic: "Integration Methods" },
      { date: "2024-11-12", status: "present", topic: "Differential Equations" },
      { date: "2024-11-10", status: "absent", topic: "Complex Numbers" },
      { date: "2024-11-08", status: "present", topic: "Vector Calculus" }
    ]
  },
  // Add similar data for other courses
};

function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState(1);

  const getAttendancePercentage = (present, total) => {
    return ((present / total) * 100).toFixed(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-500';
      case 'absent':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border-t-4 border-blue-500">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Attendance Overview
          </h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Summary Card */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-500" />
              Overall Attendance
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                    strokeDasharray={`${(42/45) * 365} 365`}
                    strokeDashoffset="0"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                  {getAttendancePercentage(42, 45)}%
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-xl font-bold text-blue-600">45</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-xl font-bold text-green-600">42</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-xl font-bold text-red-600">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Monthly Breakdown
            </h2>
            <div className="space-y-4">
              {Object.entries(attendanceData[1].monthlyAttendance).map(([month, data]) => (
                <div key={month} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{month}</span>
                    <span className="text-sm text-gray-600">
                      {getAttendancePercentage(data.present, data.total)}% Attendance
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${(data.present / data.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Classes */}
        <div className="bg-white rounded-lg shadow-md col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Classes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData[1].recentClasses.map((class_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {class_.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(class_.status)}
                          <span className={`text-sm ${getStatusColor(class_.status)}`}>
                            {class_.status.charAt(0).toUpperCase() + class_.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {class_.topic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;