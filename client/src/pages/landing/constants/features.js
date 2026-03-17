import { Youtube, Terminal, Bot, Users, CheckCircle } from 'lucide-react';

export const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "500+", label: "Video Courses" },
  { value: "50+", label: "Coding Languages" },
  { value: "24/7", label: "AI Support" }
];

export const features = [
  {
    icon: Youtube,
    iconColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    title: "Video Learning",
    description: "Watch high-quality courses with interactive features. Download, comment, and bookmark videos.",
    features: ["4K Video Streaming", "Download for Offline", "Interactive Comments"]
  },
  {
    icon: Terminal,
    iconColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    title: "Coding Platform",
    description: "Practice coding in 50+ languages with our powerful online IDE and compiler.",
    features: ["50+ Languages", "Real-time Execution", "Code Collaboration"]
  },
  {
    icon: Bot,
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    title: "AI Learning Assistant",
    description: "Get instant help from our AI tutor. Ask questions, get code explanations, and more.",
    features: ["24/7 Availability", "Code Debugging", "Concept Explanations"]
  },
  {
    icon: Users,
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    title: "Learning Community",
    description: "Share your progress, connect with peers, and showcase achievements.",
    features: ["Progress Sharing", "Study Groups", "Achievement Badges"]
  }
];

export const teacherFeatures = [
  {
    title: "Video Course Creation",
    description: "Upload and manage courses with Cloudinary integration"
  },
  {
    title: "Test & Assessment Builder",
    description: "Create MCQ tests and coding challenges with auto-grading"
  },
  {
    title: "Analytics Dashboard",
    description: "Track student performance and engagement metrics"
  }
];

export const studentFeatures = [
  {
    title: "Personalized Learning Path",
    description: "AI-recommended courses based on your goals"
  },
  {
    title: "Progress Tracking",
    description: "Visual insights into your learning journey"
  },
  {
    title: "Peer Collaboration",
    description: "Connect with fellow learners and form study groups"
  }
];

export const teacherAnalytics = [
  { label: "Video Completion Rate", value: 78, color: "bg-blue-500" },
  { label: "Test Pass Rate", value: 92, color: "bg-green-500" },
  { label: "Active Students", value: 65, color: "bg-purple-500" }
];