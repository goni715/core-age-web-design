export const packagesList = [
  {
    id: 1,
    type: "MRI",
    title: "Full Body MRI Scan",
    savings: "$10,000",
    prices: [
      { country: "Bangladesh", price: "$15,000" },
      { country: "Thailand", price: "$12,000" },
      { country: "India", price: "$8,000", isCheapest: true },
      { country: "Singapore", price: "$18,000" }
    ],
    // Detailed data for Package Details Page
    duration: "45-60 minutes",
    description: "A comprehensive magnetic resonance imaging scan that provides detailed images of all major body systems. This non-invasive procedure uses powerful magnets and radio waves to create detailed cross-sectional images of your organs and tissues.",
    hospitals: [
      { id: 1, name: "Apollo Hospitals Chennai", country: "India", rating: 4.9, price: "$8,000", isBestPrice: true },
      { id: 2, name: "Bangkok International Hospital", country: "Thailand", rating: 4.8, price: "$12,000" },
      { id: 3, name: "United Hospital Dhaka", country: "Bangladesh", rating: 4.5, price: "$15,000" },
      { id: 4, name: "Mount Elizabeth Hospital", country: "Singapore", rating: 4.8, price: "$18,000" }
    ],
    preparation: [
      "Remove all metal objects including jewelry, watches, and piercings",
      "Wear comfortable, loose-fitting clothing without metal fasteners",
      "Inform the technician if you have any metal implants or pacemakers",
      "Fast for 4-6 hours before the scan if contrast dye will be used",
      "Arrive 30 minutes before your scheduled appointment"
    ],
    goodToKnow: [
      "The MRI machine makes loud noises - earplugs will be provided",
      "You will need to lie still for the duration of the scan",
      "The procedure is completely painless and non-invasive",
      "Results are typically available within 2-3 business days",
      "You can resume normal activities immediately after the scan"
    ],
    qualityAssurance: [
      "All recommended hospitals are internationally accredited",
      "Radiologists are board-certified with 10+ years of experience",
      "Latest generation MRI machines (3 Tesla or higher)",
      "Comprehensive reporting with second opinion options available"
    ],
    travelConsiderations: [
      "Plan to stay 1-2 days for the test and initial results",
      "Airport transfer services available at most hospitals",
      "Medical visa assistance provided if needed",
      "Accommodation recommendations near the hospital"
    ]
  },
  {
    id: 2,
    type: "CT Scan",
    title: "CT Scan - Chest",
    savings: "$5,000",
    prices: [
      { country: "Bangladesh", price: "$8,000" },
      { country: "Thailand", price: "$6,500" },
      { country: "India", price: "$4,500", isCheapest: true },
      { country: "Singapore", price: "$9,500" }
    ]
  },
  {
    id: 3,
    type: "Blood Test",
    title: "Complete Blood Count (CBC)",
    savings: "$350",
    prices: [
      { country: "Bangladesh", price: "$500" },
      { country: "Thailand", price: "$450" },
      { country: "India", price: "$300", isCheapest: true },
      { country: "Singapore", price: "$650" }
    ]
  },
  {
    id: 4,
    type: "Ultrasound",
    title: "Abdominal Ultrasound",
    savings: "$1,500",
    prices: [
      { country: "Bangladesh", price: "$2,500" },
      { country: "Thailand", price: "$2,000" },
      { country: "India", price: "$1,500", isCheapest: true },
      { country: "Singapore", price: "$3,000" }
    ]
  },
  {
    id: 5,
    type: "X-Ray",
    title: "Chest X-Ray",
    savings: "$550",
    prices: [
      { country: "Bangladesh", price: "$800" },
      { country: "Thailand", price: "$650" },
      { country: "India", price: "$400", isCheapest: true },
      { country: "Singapore", price: "$950" }
    ]
  },
  {
    id: 6,
    type: "MRI",
    title: "Cardiac MRI",
    savings: "$12,000",
    prices: [
      { country: "Bangladesh", price: "$18,000" },
      { country: "Thailand", price: "$15,000" },
      { country: "India", price: "$10,000", isCheapest: true },
      { country: "Singapore", price: "$22,000" }
    ]
  }
];
