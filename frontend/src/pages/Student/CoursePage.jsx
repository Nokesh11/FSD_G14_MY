import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calculator, Calendar, Book, GraduationCap, Award } from "lucide-react";

const courseData = {
  1: {
    title: "Math 101",
    description: "Basic Mathematics Course",
    content: "This course covers algebra, calculus, and trigonometry.",
    instructor: "Dr. Sarah Johnson",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    credits: 3,
    quizMarks: [8, 7, 9],
    assignmentMarks: [7, 8, 9, 10],
    examMarks: [85, 90, 78],
    prerequisites: ["None"],
    learningOutcomes: [
      "Understanding of basic algebraic concepts",
      "Ability to solve calculus problems",
      "Knowledge of trigonometric functions",
    ],
  },
  2: {
    title: "Physics 101",
    description: "Introduction to Physics",
    content: "Learn the basics of mechanics, electromagnetism, and optics.",
    instructor: "Dr. Evelyn Cartwright", 
    schedule: "Mon, Wed, Fri - 10:00 AM",
    credits: 3,
    quizMarks: [6, 9, 8],
    assignmentMarks: [9, 10, 8, 7],
    examMarks: [88, 92, 80], 
    prerequisites: ["None"],
    learningOutcomes: [
      "Understanding of basic algebraic concepts",
      "Ability to solve calculus problems",
      "Knowledge of trigonometric functions"
    ]
  },
  3: {
    title: "Chemistry 101",
    description: "Basic Chemistry Concepts",
    content: "Understand atomic structure, bonding, and chemical reactions.",
    instructor: "Dr. Evelyn Cartwright", 
    schedule: "Mon, Wed, Fri - 10:00 AM",
    credits: 3,
    quizMarks: [10, 8, 7],
    assignmentMarks: [8, 9, 7, 8],
    examMarks: [89, 85, 84], 
    prerequisites: ["None"],
    learningOutcomes: [
      "Understanding of basic algebraic concepts",
      "Ability to solve calculus problems",
      "Knowledge of trigonometric functions"
    ]
  }, 
  4: {
    title: "Computer Science 101",
    description: "Intro to CS Concepts",
    content: "An introduction to programming, algorithms, and data structures.",
    instructor: "Dr. Evelyn Cartwright", 
    schedule: "Mon, Wed, Fri - 10:00 AM",
    credits: 3,
    quizMarks: [7, 6, 9],
    assignmentMarks: [10, 9, 8, 7],
    examMarks: [90, 94, 88], 
    prerequisites: ["None"],
    learningOutcomes: [
      "Understanding of basic algebraic concepts",
      "Ability to solve calculus problems",
      "Knowledge of trigonometric functions"
    ]
  }
};

const CoursePage = () => {
  const {courseid} =  useParams();
  const [course, setCourse] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const fetchCourseData = () => {
      const data = courseData[courseid];
      setCourse(data);
      if (data) {
        const quizAvg = average(data.quizMarks) * 10;
        const assignmentAvg = average(data.assignmentMarks) * 10;
        const examAvg = average(data.examMarks);
        const overall = quizAvg * 0.2 + assignmentAvg * 0.3 + examAvg * 0.5;
        setOverallProgress(Math.round(overall));
      }
    };
    fetchCourseData();
  }, [courseid]);

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const performanceData = course.quizMarks.map((_, index) => ({
    name: `Week ${index + 1}`,
    Quiz: course.quizMarks[index] * 10,
    Assignment: course.assignmentMarks[index] * 10,
    Exam: course.examMarks[index],
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md border-t-4 border-t-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>{course.credits} Credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Course Details */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Book className="w-5 h-5" />
              Course Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Instructor</h3>
                <p>{course.instructor}</p>
              </div>
              <div>
                <h3 className="font-medium">Schedule</h3>
                <p>{course.schedule}</p>
              </div>
              <div>
                <h3 className="font-medium">Prerequisites</h3>
                <ul className="list-disc list-inside">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Performance Scores */}
        <div className="bg-white rounded-lg shadow-md col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <Award className="w-5 h-5" />
              Detailed Performance Scores
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Quizzes Section */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Quizzes
                </h3>
                <div className="space-y-3">
                  {course.quizMarks.map((mark, index) => (
                    <div
                      key={`quiz-${index}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">Quiz {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${mark * 10}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{mark}/10</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Average</span>
                      <span className="font-semibold text-blue-700">
                        {average(course.quizMarks).toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignments Section */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-700 mb-4">
                  Assignments
                </h3>
                <div className="space-y-3">
                  {course.assignmentMarks.map((mark, index) => (
                    <div
                      key={`assignment-${index}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">
                        Assignment {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-green-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${mark * 10}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{mark}/10</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Average</span>
                      <span className="font-semibold text-green-700">
                        {average(course.assignmentMarks).toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exams Section */}
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-700 mb-4">
                  Exams
                </h3>
                <div className="space-y-3">
                  {course.examMarks.map((mark, index) => (
                    <div
                      key={`exam-${index}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">Exam {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-red-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${mark}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{mark}%</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Average</span>
                      <span className="font-semibold text-red-700">
                        {average(course.examMarks).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Grade Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Final Grade</h3>
                  <p className="text-sm text-gray-600">
                    (Quizzes: 20%, Assignments: 30%, Exams: 50%)
                  </p>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {overallProgress}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5" />
            Performance Trends
          </h2>

          {/* Tabs for different chart types */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-4 border-b-2 font-medium">
                  Line Chart
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-4 border-b-2 font-medium">
                  Bar Chart
                </button>
              </nav>
            </div>
          </div>

          {/* Line Chart */}
          <div className="mb-8">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Quiz"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Assignment"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ fill: "#16a34a", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Exam"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={{ fill: "#dc2626", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                  }}
                />
                <Legend />
                <Bar dataKey="Quiz" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="Assignment"
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="Exam" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Quiz Average
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  {(average(course.quizMarks) * 10).toFixed(1)}%
                </span>
                <span className="text-sm text-blue-600 mb-1">of total</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Assignment Average
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-green-600">
                  {(average(course.assignmentMarks) * 10).toFixed(1)}%
                </span>
                <span className="text-sm text-green-600 mb-1">of total</span>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Exam Average
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-red-600">
                  {average(course.examMarks).toFixed(1)}%
                </span>
                <span className="text-sm text-red-600 mb-1">of total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
