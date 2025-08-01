import React from "react";
import Link from "next/link";
import { FileText, Mail, BookOpen, Check, Video } from "lucide-react";

const Dashboard = () => {
  return (
    // <div className="p-10">
    //   <h2 className="font-bold text-2xl text-center text-primary">Dashboard</h2>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Dashboard
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI Mock Interviews */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <Link href={"/dashboard/mocks"}>
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Mock Interviews
              </h3>
              <p className="text-gray-600 mb-4">
                Practice with our AI interviewer using your webcam. Get
                real-time feedback and ratings on your answers.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Webcam-enabled sessions
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Real-time feedback
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Industry-specific questions
                </li>
              </ul>
            </Link>
          </div>

          {/* AI Resume Builder */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <Link href={"/dashboard/resume"}>
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Resume Builder
              </h3>
              <p className="text-gray-600 mb-4">
                Create professional resumes tailored to specific job
                descriptions. Our AI analyzes job requirements and optimizes
                your content.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  ATS-optimized formats
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Job-specific tailoring
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Professional template
                </li>
              </ul>
            </Link>
          </div>
          {/* AI Cover Letter Generator */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <Link href={"/dashboard/cover"}>
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Cover Letter Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Generate compelling cover letters that highlight your strengths
                and align with company requirements.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Personalized content
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Company research integration
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Industry-specific
                </li>
              </ul>
            </Link>
          </div>
          {/* AI Quiz Generator */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <Link href={"/dashboard/cover"}>
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Quiz Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Practice with unlimited multiple-choice questions tailored to
                your field and experience level.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Domain-specific questions
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Detailed explanations
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Progress tracking
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </section>
    // </div>
  );
};

export default Dashboard;
