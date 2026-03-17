import { 
  GraduationCap,
  School,
  Video,
  Code2,
  Bot,
  Users,
  Target,
  Award,
  BarChart,
  MessageSquare
} from "lucide-react";

export const ROLES = {
  STUDENT: "student",
  PROFESSOR: "professor"
};

export const roleColors = {
  student: {
    primary: "blue",
    gradient: "from-blue-500 to-blue-600",
    light: "bg-blue-50",
    dark: "dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500 dark:border-blue-400"
  },
  professor: {
    primary: "purple",
    gradient: "from-purple-500 to-purple-600",
    light: "bg-purple-50",
    dark: "dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500 dark:border-purple-400"
  }
};

export const studentFeatures = [
  { icon: Video, text: "Access 500+ video courses" },
  { icon: Code2, text: "Practice coding in 50+ languages" },
  { icon: Bot, text: "24/7 AI learning assistant" },
  { icon: Users, text: "Join study groups & community" },
  { icon: Target, text: "Personalized learning paths" },
  { icon: Award, text: "Earn certificates & badges" }
];

export const professorFeatures = [
  { icon: Video, text: "Upload & manage video courses" },
  { icon: Code2, text: "Create coding challenges" },
  { icon: BarChart, text: "Advanced analytics dashboard" },
  { icon: Users, text: "Manage student progress" },
  { icon: MessageSquare, text: "Interactive discussions" },
  { icon: Award, text: "Issue certificates" }
];

export const studentStats = [
  { value: "10K+", label: "Active Students" },
  { value: "85%", label: "Success Rate" },
  { value: "24/7", label: "AI Support" }
];

export const professorStats = [
  { value: "500+", label: "Active Teachers" },
  { value: "1.2K", label: "Courses Created" },
  { value: "95%", label: "Satisfaction" }
];

export const studentLearningPath = [
  { step: 1, title: "Assess your level", desc: "Take a quick assessment to identify your current skills" },
  { step: 2, title: "Get personalized recommendations", desc: "AI suggests the best courses for your goals" },
  { step: 3, title: "Start learning", desc: "Access video courses and coding challenges" },
  { step: 4, title: "Track progress", desc: "Monitor your improvement with detailed analytics" },
  { step: 5, title: "Earn certificates", desc: "Get certified and showcase your achievements" }
];

export const professorGettingStarted = [
  { step: 1, title: "Set up your profile", desc: "Add your expertise and teaching style" },
  { step: 2, title: "Create your first course", desc: "Upload videos and create assessments" },
  { step: 3, title: "Invite students", desc: "Share your course with learners" },
  { step: 4, title: "Track engagement", desc: "Monitor student progress and performance" },
  { step: 5, title: "Get feedback", desc: "Improve your courses with student insights" }
];

export const studentSuccessStories = [
  {
    name: "Sarah Johnson",
    role: "CS Student",
    achievement: "Got internship at Google",
    image: "/api/placeholder/50/50"
  },
  {
    name: "Mike Chen",
    role: "Self-taught Developer",
    achievement: "Launched his first app",
    image: "/api/placeholder/50/50"
  }
];

export const professorSuccessStories = [
  {
    name: "Dr. Emily Roberts",
    role: "Computer Science Professor",
    achievement: "500+ students enrolled",
    image: "/api/placeholder/50/50"
  },
  {
    name: "Prof. James Wilson",
    role: "Mathematics Teacher",
    achievement: "Top-rated courses",
    image: "/api/placeholder/50/50"
  }
];

export const trustedInstitutions = ['Stanford', 'MIT', 'Harvard', 'Oxford', 'Cambridge'];