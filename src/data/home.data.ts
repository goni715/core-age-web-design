import { Building2, Calculator, FlaskConical, HeartHandshake, Hospital, Phone, Pill, Plane, Search, Stethoscope, UserSearch, Video } from "lucide-react";

export const concerns = [
    {
        id: 1,
        title: "Fever, Cold & Flu",
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Pediatric Illness",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Diabetes",
        image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Pregnancy Concerns",
        image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Hair Fall & Dandruff",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Sexual Health Issues",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300&auto=format&fit=crop",
    },
];
export const departments = [
  { id: 1, name: "General Practitioner", icon: "🏥" },
  { id: 2, name: "Medicine", icon: "💊" },
  { id: 3, name: "General Physician", icon: "👨‍⚕️" },
  { id: 4, name: "Pediatrics", icon: "👶" },
  { id: 5, name: "Gynecology", icon: "⚕️" },
  { id: 6, name: "Orthopedics", icon: "🦴" },
  { id: 7, name: "Diabetes & Hormone", icon: "🩺" },
  { id: 8, name: "Surgery", icon: "🔬" },
  { id: 9, name: "Skin, VD & Sexual Health", icon: "🛡️" },
  { id: 10, name: "Dermatology", icon: "🌿" },
  { id: 11, name: "Ophthalmology", icon: "👁️" },
  { id: 12, name: "Dentistry", icon: "🦷" },
];

export const destinations = [
  {
    id: 1,
    name: "Turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400&auto=format&fit=crop",
  },
];

export const hospitals = [
  {
    id: 1,
    name: "Bumrungrad International Hospital",
    location: "Bangkok, Thailand",
    tags: ["Cardiology", "Oncology", "Orthopedics"],
    rating: "4.9",
    language: "Bengali",
    priceLevel: "$ $$",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    location: "Chennai, India",
    tags: ["Neurology", "Transplant", "Cardiac"],
    rating: "4.8",
    language: "Bengali",
    priceLevel: "$ $",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Mount Elizabeth Hospital",
    location: "Singapore",
    tags: ["Cancer Care", "Surgery", "Pediatrics"],
    rating: "4.9",
    language: "Bengali",
    priceLevel: "$ $$$",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Bumrungrad International Hospital",
    location: "Bangkok, Thailand",
    tags: ["Cardiology", "Oncology", "Orthopedics"],
    rating: "4.9",
    language: "Bengali",
    priceLevel: "$ $$",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Apollo Hospitals",
    location: "Chennai, India",
    tags: ["Neurology", "Transplant", "Cardiac"],
    rating: "4.8",
    language: "Bengali",
    priceLevel: "$ $",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Mount Elizabeth Hospital",
    location: "Singapore",
    tags: ["Cancer Care", "Surgery", "Pediatrics"],
    rating: "4.9",
    language: "Bengali",
    priceLevel: "$ $$$",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop"
  }
];

export const packages = [
  {
    id: 1,
    title: "Complete Cardiac Care Package",
    discount: "20% OFF",
    location: "Thailand",
    hospital: "Bumrungrad International",
    services: ["Consultation", "ECG", "Echo Test", "2 Days Stay"],
    duration: "3 Days",
    support: "Bengali Support",
    oldPrice: "$2,500",
    newPrice: "$1,999",
  },
  {
    id: 2,
    title: "Advanced Cancer Screening",
    discount: "15% OFF",
    location: "Singapore",
    hospital: "Mount Elizabeth Hospital",
    services: ["Full Body Scan", "Lab Tests", "Specialist Consult", "Report"],
    duration: "2 Days",
    support: "Bengali Support",
    oldPrice: "$3,200",
    newPrice: "$2,699",
  },
  {
    id: 3,
    title: "Orthopedic Treatment Package",
    discount: "22% OFF",
    location: "India",
    hospital: "Apollo Hospitals Chennai",
    services: ["X-Ray", "MRI", "Physiotherapy", "5 Days Stay"],
    duration: "7 Days",
    support: "Bengali Support",
    oldPrice: "$1,800",
    newPrice: "$1,399",
  },
  {
    id: 4,
    title: "Premium Health Checkup",
    discount: "18% OFF",
    location: "China",
    hospital: "Shanghai General Hospital",
    services: ["Blood Tests", "Imaging", "Specialist Review", "Health Plan"],
    duration: "1 Day",
    support: "",
    oldPrice: "$850",
    newPrice: "$699",
  },
];

export const internationalDoctors = [
  {
    id: 1,
    name: "Dr. Raihan Ahmed",
    specialty: "Cardiologist",
    hospital: "Bumrungrad Hospital",
    location: "Thailand",
    rating: "4.9",
    language: "Bengali",
    fee: "$80",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Oncologist",
    hospital: "Apollo Hospital",
    location: "India",
    rating: "4.8",
    language: "Bengali",
    fee: "$65",
    image: "https://images.unsplash.com/photo-1594824432258-202a0a256950?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Dr. Wei Zhang",
    specialty: "Neurologist",
    hospital: "Shanghai General",
    location: "China",
    rating: "4.9",
    language: "English",
    fee: "$90",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Dr. Lisa Wong",
    specialty: "Pediatrician",
    hospital: "Mount Elizabeth",
    location: "Singapore",
    rating: "4.7",
    language: "Bengali",
    fee: "$100",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop"
  }
];

export const localDoctors = [
  {
    id: 1,
    name: "Dr. Nasren Nipa",
    degrees: "MBBS, MCPS(MEDICINE), MRCP(ACES), FCPS(MEDICINE &...",
    specialty: "General Practitioner",
    bmdc: "854186",
    experience: "10+ years experience",
    fee: "৳600",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Maisum Sobhan",
    degrees: "MBBS, BCS (HEALTH), MD (ENDOCRINOLOGY), FCPS...",
    specialty: "Diabetes & Hormone",
    bmdc: "73578",
    experience: "11+ years experience",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Asst. Prof. Dr. ABU ZAFAR MD SALEH",
    degrees: "MBBS, FCPS",
    specialty: "Medicine",
    bmdc: "A63656",
    experience: "12+ years experience",
    fee: "৳900",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Dr. Nazmul Huda Bappi",
    degrees: "MBBS, BCS,MD",
    specialty: "Psychiatry",
    bmdc: "A77153",
    experience: "11+ years experience",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Dr. Nasren Nipa",
    degrees: "MBBS, MCPS(MEDICINE), MRCP(ACES), FCPS(MEDICINE &...",
    specialty: "General Practitioner",
    bmdc: "854186",
    experience: "10+ years experience",
    fee: "৳600",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Dr. Maisum Sobhan",
    degrees: "MBBS, BCS (HEALTH), MD (ENDOCRINOLOGY), FCPS...",
    specialty: "Diabetes & Hormone",
    bmdc: "73578",
    experience: "11+ years experience",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Asst. Prof. Dr. ABU ZAFAR MD SALEH",
    degrees: "MBBS, FCPS",
    specialty: "Medicine",
    bmdc: "A63656",
    experience: "12+ years experience",
    fee: "৳900",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Dr. Nazmul Huda Bappi",
    degrees: "MBBS, BCS,MD",
    specialty: "Psychiatry",
    bmdc: "A77153",
    experience: "11+ years experience",
    fee: "৳800",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop"
  }
];

export const services = [
  {
    icon: Phone,
    title: "Telemedicine",
    description: "Doctor booking + video consultation",
    color: "bg-blue-500",
  },
  {
    icon: Hospital,
    title: "Top Hospital Directory",
    description: "Verified hospital listings, local + international",
    color: "bg-blue-500",
  },
  {
    icon: Stethoscope,
    title: "Disease-Wise Assistance",
    description: "Find treatment/specialist by condition",
    color: "bg-teal-500",
  },
  {
    icon: Pill,
    title: "Medical Store",
    description: "Prescription upload, medicine ordering, delivery",
    color: "bg-emerald-500",
  },
  {
    icon: Calculator,
    title: "Treatment Budget Planning",
    description: "Cost mapping + test price comparison",
    color: "bg-blue-500",
  },
  {
    icon: Plane,
    title: "Medical Travel",
    description: "A-to-Z international treatment facilitation",
    color: "bg-teal-600",
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Connect with doctors remotely through secure video calls",
    color: "bg-teal-500",
  },
  {
    icon: FlaskConical,
    title: "Test Price Comparison",
    description: "Compare diagnostic test prices across different facilities",
    color: "bg-teal-500",
  },
  {
    icon: UserSearch,
    title: "Find Doctors",
    description: "Search and connect with expert doctors across multiple specialties",
    color: "bg-blue-500",
  },
  {
    icon: Building2,
    title: "Hospital Directory",
    description: "Browse verified hospitals with complete facility information",
    color: "bg-blue-500",
  },
  {
    icon: Search,
    title: "Disease Search",
    description: "Find treatments and specialists for specific health conditions",
    color: "bg-teal-500",
  },
  {
    icon: HeartHandshake,
    title: "Caregiver Service",
    description: "On-demand nurse, physiotherapist, attendant, elderly/post-op care — local & international",
    color: "bg-emerald-500",
  },
];

export const labs = [
  { name: "BIRDEM General Hospital", tests: "481 tests", initial: "B", color: "bg-blue-100 text-blue-600" },
  { name: "Thyrocare", tests: "452 tests", initial: "T", color: "bg-red-50 text-red-500" },
  { name: "Popular Diagnostics", tests: "133 tests", initial: "P", color: "bg-emerald-100 text-emerald-600" },
  { name: "IbnSina Hospital", tests: "321 tests", initial: "I", color: "bg-purple-100 text-purple-600" },
  { name: "Square Hospital", tests: "298 tests", initial: "S", color: "bg-amber-100 text-amber-500" },
  { name: "Delta Hospital", tests: "215 tests", initial: "D", color: "bg-sky-100 text-sky-500" },
];

