"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Brain } from "lucide-react";

const Header = () => {
  const path = usePathname();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {});
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                PrepAI
              </span>
            </div></Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href={"/dashboard/mocks"}
                className={`text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  path == "/dashboard/mocks" && "text-primary font-bold"
                }`}
              >
                Mock Interview
              </Link>
              <Link
                href={"/dashboard/quiz"}
                className={`text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  path == "/dashboard/quiz" && "text-primary font-bold"
                }`}
              >
                Quiz
              </Link>
              <Link
                href={"/dashboard/resume"}
                className={`text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  path == "/dashboard/resume" && "text-primary font-bold"
                }`}
              >
                Resume Builder
              </Link>
              <Link
                href={"/dashboard/cover"}
                className={`text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  path == "/dashboard/cover" && "text-primary font-bold"
                }`}
              >
                Cover Letter Generator
              </Link>
              <Link
                href={"/dashboard/upgrade"}
                className={`text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  path == "/dashboard/upgrade" && "text-primary font-bold"
                }`}
              >
                Upgrade
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            {user ? <UserButton/>:
            <Link href={"/dashboard"}>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href={"/dashboard/mocks"}
                className={`text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                  path == "/dashboard/mocks" && "text-primary font-bold"
                }`}
              >
                Mock-Interview
              </Link>
              <Link
                href={"/dashboard/quiz"}
                className={`text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                  path == "/dashboard/quiz" && "text-primary font-bold"
                }`}
              >
                Quiz
              </Link>
              <Link
                href={"/dashboard/resume"}
                className={`text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                  path == "/dashboard/resume" && "text-primary font-bold"
                }`}
              >
                Resume Builder
              </Link>
              <Link
                href={"/dashboard/cover"}
                className={`text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                  path == "/dashboard/cover" && "text-primary font-bold"
                }`}
              >
                Cover Letter Generator
              </Link>
              <Link
                href={"/dashboard/upgrade"}
                className={`text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                  path == "/dashboard/upgrade" && "text-primary font-bold"
                }`}
              >
                Upgrade
              </Link>
              
              {user ? <UserButton/> : <Link href={"/dashboard"}>
                <button className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </Link>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
