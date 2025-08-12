import {
  Home,
  Car,
  Utensils,
  ShoppingCart,
  Dumbbell,
  Gamepad2,
  Plane,
  GraduationCap,
  Heart,
  Briefcase,
  Gift,
  Baby,
  PawPrint,
  Wrench,
  Zap,
  Droplets,
  Wifi,
  Smartphone,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Shield,
  Fuel,
  Coffee,
  Shirt,
  Scissors,
  Book,
  Music,
  Camera,
  Palette,
  Building,
  Stethoscope,
  Pill,
  Globe,
  Users,
  MapPin,
  Package,
  Truck,
  HandHeart,
  Calculator,
  Banknote,
  Receipt,
  ShoppingBag,
  Flower,
  TreePine,
  Fish,
  Waves,
  Mountain,
  Sun,
  Umbrella,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  chartColor: string;
  description?: string;
}

export const categories: Category[] = [
  // Housing & Utilities
  {
    id: "housing",
    name: "Housing",
    icon: Home,
    color: "text-blue-500",
    chartColor: "oklch(0.742 0.186 248.32)",
    description: "Rent, mortgage, property taxes",
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: Zap,
    color: "text-amber-500",
    chartColor: "oklch(0.683 0.154 78.65)",
    description: "Electricity, gas, water",
  },
  {
    id: "internet",
    name: "Internet & Phone",
    icon: Wifi,
    color: "text-violet-500",
    chartColor: "oklch(0.627 0.193 294.17)",
    description: "Internet, mobile, landline",
  },
  {
    id: "water",
    name: "Water & Sewage",
    icon: Droplets,
    color: "text-cyan-500",
    chartColor: "oklch(0.758 0.122 186.42)",
    description: "Water bills, sewage fees",
  },
  {
    id: "maintenance",
    name: "Home Maintenance",
    icon: Wrench,
    color: "text-lime-500",
    chartColor: "oklch(0.696 0.17 162.48)",
    description: "Repairs, maintenance, tools",
  },

  // Transportation
  {
    id: "car",
    name: "Car Payment",
    icon: Car,
    color: "text-red-500",
    chartColor: "oklch(0.628 0.217 15.34)",
    description: "Car loan, lease payments",
  },
  {
    id: "fuel",
    name: "Fuel & Gas",
    icon: Fuel,
    color: "text-orange-500",
    chartColor: "oklch(0.724 0.189 48.76)",
    description: "Gasoline, diesel, charging",
  },
  {
    id: "parking",
    name: "Parking & Tolls",
    icon: MapPin,
    color: "text-indigo-500",
    chartColor: "oklch(0.682 0.156 272.91)",
    description: "Parking fees, tolls, permits",
  },
  {
    id: "public-transport",
    name: "Public Transport",
    icon: Truck,
    color: "text-emerald-500",
    chartColor: "oklch(0.751 0.143 158.72)",
    description: "Bus, train, subway fares",
  },
  {
    id: "car-insurance",
    name: "Car Insurance",
    icon: Shield,
    color: "text-red-600",
    chartColor: "oklch(0.594 0.238 22.15)",
    description: "Auto insurance premiums",
  },

  // Food & Dining
  {
    id: "groceries",
    name: "Groceries",
    icon: ShoppingCart,
    color: "text-emerald-600",
    chartColor: "oklch(0.718 0.165 151.93)",
    description: "Food shopping, household items",
  },
  {
    id: "dining",
    name: "Dining Out",
    icon: Utensils,
    color: "text-orange-900",
    chartColor: "oklch(0.542 0.198 36.84)",
    description: "Restaurants, takeout, delivery",
  },
  {
    id: "coffee",
    name: "Coffee & Drinks",
    icon: Coffee,
    color: "text-amber-800",
    chartColor: "oklch(0.598 0.174 65.29)",
    description: "Coffee shops, beverages",
  },

  // Health & Fitness
  {
    id: "gym",
    name: "Gym & Fitness",
    icon: Dumbbell,
    color: "text-red-600",
    chartColor: "oklch(0.592 0.241 18.75)",
    description: "Gym membership, fitness classes",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Heart,
    color: "text-pink-700",
    chartColor: "oklch(0.628 0.206 344.58)",
    description: "Doctor visits, medical bills",
  },
  {
    id: "medicine",
    name: "Medicine",
    icon: Pill,
    color: "text-violet-600",
    chartColor: "oklch(0.672 0.189 285.94)",
    description: "Prescriptions, vitamins, supplements",
  },
  {
    id: "dental",
    name: "Dental Care",
    icon: Stethoscope,
    color: "text-cyan-600",
    chartColor: "oklch(0.714 0.134 195.67)",
    description: "Dental visits, orthodontics",
  },

  // Entertainment & Lifestyle
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Gamepad2,
    color: "text-purple-600",
    chartColor: "oklch(0.651 0.201 314.89)",
    description: "Movies, games, streaming",
  },
  {
    id: "music",
    name: "Music & Audio",
    icon: Music,
    color: "text-pink-600",
    chartColor: "oklch(0.695 0.184 349.12)",
    description: "Spotify, concerts, instruments",
  },
  {
    id: "hobbies",
    name: "Hobbies",
    icon: Palette,
    color: "text-teal-600",
    chartColor: "oklch(0.689 0.145 197.43)",
    description: "Art supplies, hobby equipment",
  },
  {
    id: "books",
    name: "Books & Reading",
    icon: Book,
    color: "text-orange-900",
    chartColor: "oklch(0.524 0.211 42.67)",
    description: "Books, magazines, e-books",
  },
  {
    id: "photography",
    name: "Photography",
    icon: Camera,
    color: "text-gray-700",
    chartColor: "oklch(0.617 0.112 267.85)",
    description: "Camera gear, photo services",
  },

  // Shopping & Personal
  {
    id: "clothing",
    name: "Clothing",
    icon: Shirt,
    color: "text-pink-500",
    chartColor: "oklch(0.738 0.195 356.24)",
    description: "Clothes, shoes, accessories",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: Scissors,
    color: "text-violet-500",
    chartColor: "oklch(0.698 0.168 289.76)",
    description: "Haircuts, spa, grooming",
  },
  {
    id: "shopping",
    name: "General Shopping",
    icon: ShoppingBag,
    color: "text-emerald-500",
    chartColor: "oklch(0.774 0.139 164.82)",
    description: "Miscellaneous purchases",
  },

  // Travel & Transportation
  {
    id: "travel",
    name: "Travel",
    icon: Plane,
    color: "text-sky-500",
    chartColor: "oklch(0.785 0.116 218.93)",
    description: "Flights, hotels, vacation",
  },
  {
    id: "vacation",
    name: "Vacation",
    icon: Sun,
    color: "text-amber-500",
    chartColor: "oklch(0.712 0.178 89.34)",
    description: "Holiday expenses, leisure travel",
  },

  // Financial & Investments
  {
    id: "savings",
    name: "Savings",
    icon: PiggyBank,
    color: "text-emerald-600",
    chartColor: "oklch(0.735 0.152 147.56)",
    description: "Emergency fund, general savings",
  },
  {
    id: "investments",
    name: "Investments",
    icon: TrendingUp,
    color: "text-teal-700",
    chartColor: "oklch(0.658 0.167 201.78)",
    description: "Stocks, bonds, retirement",
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: Shield,
    color: "text-blue-800",
    chartColor: "oklch(0.596 0.224 251.43)",
    description: "Life, health, property insurance",
  },
  {
    id: "bank-fees",
    name: "Bank Fees",
    icon: CreditCard,
    color: "text-red-900",
    chartColor: "oklch(0.513 0.245 12.89)",
    description: "ATM fees, bank charges",
  },
  {
    id: "taxes",
    name: "Taxes",
    icon: Calculator,
    color: "text-gray-700",
    chartColor: "oklch(0.634 0.098 278.45)",
    description: "Income tax, property tax",
  },

  // Education & Development
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "text-blue-700",
    chartColor: "oklch(0.612 0.197 243.67)",
    description: "Tuition, courses, training",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: Smartphone,
    color: "text-violet-600",
    chartColor: "oklch(0.661 0.183 301.25)",
    description: "Software, streaming, memberships",
  },

  // Family & Relationships
  {
    id: "childcare",
    name: "Childcare",
    icon: Baby,
    color: "text-pink-400",
    chartColor: "oklch(0.794 0.157 359.78)",
    description: "Daycare, babysitting, kids",
  },
  {
    id: "gifts",
    name: "Gifts",
    icon: Gift,
    color: "text-red-600",
    chartColor: "oklch(0.604 0.233 28.91)",
    description: "Presents, donations, charity",
  },
  {
    id: "pets",
    name: "Pets",
    icon: PawPrint,
    color: "text-emerald-600",
    chartColor: "oklch(0.728 0.148 155.34)",
    description: "Pet food, vet, grooming",
  },
  {
    id: "family",
    name: "Family Support",
    icon: Users,
    color: "text-orange-900",
    chartColor: "oklch(0.548 0.205 39.23)",
    description: "Family assistance, support",
  },

  // Business & Work
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    color: "text-gray-800",
    chartColor: "oklch(0.578 0.087 312.45)",
    description: "Business expenses, equipment",
  },
  {
    id: "office",
    name: "Office Supplies",
    icon: Building,
    color: "text-gray-600",
    chartColor: "oklch(0.675 0.103 265.78)",
    description: "Office equipment, supplies",
  },

  // Miscellaneous
  {
    id: "charity",
    name: "Charity",
    icon: HandHeart,
    color: "text-pink-700",
    chartColor: "oklch(0.639 0.192 341.67)",
    description: "Donations, charitable giving",
  },
  {
    id: "fees",
    name: "Fees & Charges",
    icon: Receipt,
    color: "text-red-900",
    chartColor: "oklch(0.498 0.251 16.78)",
    description: "Service fees, late charges",
  },
  {
    id: "cash",
    name: "Cash Withdrawal",
    icon: Banknote,
    color: "text-emerald-600",
    chartColor: "oklch(0.742 0.161 149.89)",
    description: "ATM withdrawals, cash",
  },
  {
    id: "delivery",
    name: "Delivery & Shipping",
    icon: Package,
    color: "text-sky-700",
    chartColor: "oklch(0.657 0.142 214.56)",
    description: "Shipping, delivery fees",
  },

  // Outdoor & Nature
  {
    id: "gardening",
    name: "Gardening",
    icon: Flower,
    color: "text-green-600",
    chartColor: "oklch(0.698 0.179 138.45)",
    description: "Plants, garden supplies",
  },
  {
    id: "outdoor",
    name: "Outdoor Activities",
    icon: TreePine,
    color: "text-green-700",
    chartColor: "oklch(0.664 0.186 132.67)",
    description: "Camping, hiking, outdoor gear",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Mountain,
    color: "text-teal-700",
    chartColor: "oklch(0.645 0.174 203.89)",
    description: "Sports equipment, activities",
  },
  {
    id: "fishing",
    name: "Fishing",
    icon: Fish,
    color: "text-sky-700",
    chartColor: "oklch(0.668 0.135 221.34)",
    description: "Fishing gear, licenses",
  },
  {
    id: "swimming",
    name: "Swimming",
    icon: Waves,
    color: "text-sky-600",
    chartColor: "oklch(0.712 0.128 217.56)",
    description: "Pool, swimming lessons",
  },

  // Weather & Seasonal
  {
    id: "weather",
    name: "Weather Protection",
    icon: Umbrella,
    color: "text-gray-700",
    chartColor: "oklch(0.621 0.095 275.23)",
    description: "Umbrella, weather gear",
  },

  // International & Travel
  {
    id: "international",
    name: "International",
    icon: Globe,
    color: "text-teal-600",
    chartColor: "oklch(0.681 0.149 198.78)",
    description: "Foreign exchange, international fees",
  },
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

export const getCategoriesByColor = (color: string): Category[] => {
  return categories.filter((category) => category.color === color);
};

export const getCategoryNames = (): string[] => {
  return categories.map((category) => category.name);
};

export const getCategoryColors = (): string[] => {
  return [...new Set(categories.map((category) => category.color))];
};

// Export default for easier imports
export default categories;
