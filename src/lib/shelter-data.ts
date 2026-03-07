export const ANIMALS = [
  { id: 1, name: "Mango", species: "Cat", breed: "Orange Tabby", age: 2, gender: "Male", location: "Shelter A", status: "Available", weight: "9 lbs", color: "Orange", desc: "Mango is a playful and affectionate tabby who loves sunny spots and chin scratches. Great with kids.", image: "🐱", intakeDate: "2025-01-10", applications: 3 },
  { id: 2, name: "Luna", species: "Cat", breed: "Siamese Mix", age: 4, gender: "Female", location: "Shelter B", status: "Pending", weight: "7 lbs", color: "Cream/Brown", desc: "Luna is a graceful and intelligent cat who bonds deeply with her person. Prefers a quiet home.", image: "🐈", intakeDate: "2024-12-03", applications: 5 },
  { id: 3, name: "Biscuit", species: "Cat", breed: "Domestic Shorthair", age: 1, gender: "Male", location: "Foster Home", status: "Available", weight: "6 lbs", color: "White/Brown", desc: "Biscuit is a kitten full of energy and mischief. He loves toys and chasing shadows.", image: "🐱", intakeDate: "2025-02-14", applications: 7 },
  { id: 4, name: "Shadow", species: "Cat", breed: "Black Domestic", age: 6, gender: "Male", location: "Shelter A", status: "Available", weight: "11 lbs", color: "Black", desc: "Shadow is a calm, wise cat who prefers lounging over playing. Ideal for apartment life.", image: "🐈‍⬛", intakeDate: "2024-11-20", applications: 1 },
  { id: 5, name: "Peaches", species: "Cat", breed: "Persian Mix", age: 3, gender: "Female", location: "Foster Home", status: "Adopted", weight: "8 lbs", color: "Peach/White", desc: "Peaches found her forever home! She loves long naps and gentle pets.", image: "🐱", intakeDate: "2024-09-01", applications: 9 },
  { id: 6, name: "Ozzy", species: "Cat", breed: "Maine Coon Mix", age: 5, gender: "Male", location: "Shelter B", status: "Available", weight: "14 lbs", color: "Gray Tabby", desc: "Ozzy is a big gentle giant who loves being brushed and watching birds from the window.", image: "🐈", intakeDate: "2025-01-28", applications: 2 },
  { id: 7, name: "Cleo", species: "Cat", breed: "Tortoiseshell", age: 7, gender: "Female", location: "Shelter A", status: "Pending", weight: "9 lbs", color: "Tortoiseshell", desc: "Cleo has seen it all and she's still charming. A wise senior cat looking for her last loving home.", image: "🐱", intakeDate: "2024-10-15", applications: 4 },
  { id: 8, name: "Noodle", species: "Cat", breed: "Sphynx Mix", age: 2, gender: "Female", location: "Foster Home", status: "Available", weight: "6 lbs", color: "Pink/Gray", desc: "Noodle is hairless, warm, and absolutely loves cuddles. Velcro cat — she never leaves your side.", image: "🐈", intakeDate: "2025-03-02", applications: 6 },
];

export const APPLICATIONS = [
  { id: 1, animalId: 1, applicant: "Sarah Chen", date: "2025-03-01", status: "Under Review", email: "sarah@email.com" },
  { id: 2, animalId: 2, applicant: "Marcus Webb", date: "2025-02-28", status: "Approved", email: "marcus@email.com" },
  { id: 3, animalId: 3, applicant: "Priya Nair", date: "2025-03-03", status: "Pending", email: "priya@email.com" },
  { id: 4, animalId: 1, applicant: "Tom Bakker", date: "2025-03-04", status: "Pending", email: "tom@email.com" },
  { id: 5, animalId: 6, applicant: "Yuki Tanaka", date: "2025-03-05", status: "Under Review", email: "yuki@email.com" },
];

export const CONTENT_HISTORY = [
  { id: 1, animalId: 1, type: "Social Post", date: "2025-02-20", preview: "🍊 Meet Mango! This sunshine-colored tabby is looking for his forever human..." },
  { id: 2, animalId: 2, type: "Adoption Bio", date: "2025-02-18", preview: "Luna is a refined Siamese mix who will bring elegance and quiet companionship..." },
  { id: 3, animalId: 3, type: "Social Post", date: "2025-03-01", preview: "🍪 Biscuit is breaking hearts at the shelter! This fluffy little troublemaker..." },
];

export const STATUS_COLORS = {
  Available: { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  Pending:   { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  Adopted:   { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
};

export type Animal = typeof ANIMALS[0];
export type Application = typeof APPLICATIONS[0];
export type ContentHistoryItem = typeof CONTENT_HISTORY[0];
