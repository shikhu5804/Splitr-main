import { Bell, CreditCard,BarChart3, PieChart, Receipt, Users } from "lucide-react";

export const statsData = [
    {
      id: "active-users",
      value: "10K+",
      label: "Active Users",
    },
    {
      id: "transactions-tracked",
      value: "₹2M+",
      label: "Transactions Tracked",
    },
    {
      id: "uptime",
      value: "99%",
      label: "Uptime",
    },
    {
      id: "user-rating",
      value: "4.8/5",
      label: "User Rating",
    },
];

export const FEATURES = [
  {
    id: "group-expenses",
    title: "Group Expenses",
    Icon: Users,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Create groups for roommates, trips, or events to keep expenses organized.",
  },
  {
    id: "smart-settlements",
    title: "Smart Settlements",
    Icon: CreditCard,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Our algorithm minimises the number of payments when settling up.",
  },
  {
    id: "expense-analytics",
    title: "Expense Analytics",
    Icon: PieChart,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Track spending patterns and discover insights about your shared costs.",
  },
  {
    id: "payment-reminders",
    title: "Payment Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Automated reminders for pending debts and insights on spending patterns.",
  },
  {
    id: "multiple-split-types",
    title: "Multiple Split Types",
    Icon: Receipt,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Split equally, by percentage, or by exact amounts to fit any scenario.",
  },
  {
    id: "real-time-updates",
    title: "Real‑time Updates",
    Icon: () => (
      /* custom inline icon (no Lucide equivalent) */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "See new expenses and repayments the moment your friends add them.",
  },
];

export const STEPS = [
  {
    id: "create-group",
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    title: "1. Create or Join a Group",
    description:
      "Start a group for your roommates, trip, or event and invite friends.",
  },
  {
    id: "add-expenses",
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "2. Add Expenses",
    description:
      "Record who paid and how the bill should be split amongst members.",
  },
  {
    id: "settle-up",
    icon: <PieChart className="h-6 w-6 text-blue-600" />,
    title: "3. Settle Up",
    description: "View who owes what and log payments when debts are cleared.",
  },
];

export const TESTIMONIALS = [
  {
    id: "aarav-mehta",
    quote:
      "Splitr completely changed how we handle expenses during trips. No more awkward reminders or confusion.",
    name: "Aarav Mehta",
    image: "/testimonials/user1.jpg",
    role: "Product Manager at Razorpay",
  },
  {
    id: "riya-sharma",
    quote:
      "As a student living with flatmates, Splitr makes tracking rent and groceries super easy.",
    name: "Riya Sharma",
    image: "/testimonials/user2.jpg",
    role: "MBA Student, IIM Bangalore",
  },
  {
    id: "karan-malhotra",
    quote:
      "We use Splitr in our startup to manage team expenses. It's simple, fast, and saves us hours every week.",
    name: "Karan Malhotra",
    image: "/testimonials/user3.jpg",
    role: "Founder, FinEdge Technologies",
  },
  {
    id: "neha-verma",
    quote:
      "The UI is super clean and intuitive. I didn’t even need a tutorial to get started.",
    name: "Neha Verma",
    image: "/testimonials/user4.jpg",
    role: "UI/UX Designer at Zomato",
  },
  {
    id: "rahul-kapoor",
    quote:
      "Splitr helped us manage wedding expenses across families without any confusion.",
    name: "Rahul Kapoor",
    image: "/testimonials/user5.jpg",
    role: "Chartered Accountant",
  },
  {
    id: "ananya-sen",
    quote:
      "I love how quickly I can split bills after dinners with friends. It just works flawlessly.",
    name: "Ananya Sen",
    image: "/testimonials/user6.jpg",
    role: "Software Engineer at Google",
  },
];
