import { Github, Twitter, Chrome } from "lucide-react";

export const ROLES = {
  STUDENT: 'student',
  PROFESSOR: 'professor'
};

export const AUTH_MODES = {
  SIGN_IN: 'signin',
  SIGN_UP: 'signup'
};

export const SOCIAL_BUTTONS = [
  { icon: Github, label: 'GitHub', color: 'text-gray-700 dark:text-gray-300' },
  { icon: Twitter, label: 'Twitter', color: 'text-blue-400' },
  { icon: Chrome, label: 'Google', color: 'text-red-500' }
];

export const STUDENT_STATS = [
  { label: "Video Courses", value: "500+" },
  { label: "Coding Languages", value: "50+" },
  { label: "AI Support", value: "24/7" }
];

export const PROFESSOR_STATS = [
  { label: "Active Teachers", value: "500+" },
  { label: "Courses Created", value: "1.2K" },
  { label: "Satisfaction", value: "95%" }
];

export const EXPERTISE_OPTIONS = [
  { value: "", label: "Select your expertise" },
  { value: "computer-science", label: "Computer Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "engineering", label: "Engineering" },
  { value: "business", label: "Business" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "languages", label: "Languages" }
];