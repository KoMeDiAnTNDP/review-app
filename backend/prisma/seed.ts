// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reviews = [
  {
    title: "Amazing Phone Experience",
    content:
      "The new smartphone exceeds all expectations. Battery life is exceptional.",
    rating: 5,
    author: "John Smith",
  },
  {
    title: "Decent Restaurant",
    content: "Food was good but service was a bit slow. Worth trying though.",
    rating: 3,
    author: "Maria Garcia",
  },
  {
    title: "Disappointing Movie",
    content:
      "The plot was predictable and acting was subpar. Would not recommend.",
    rating: 2,
    author: "David Chen",
  },
  {
    title: "Great Coffee Shop",
    content: "Best coffee in town! Lovely atmosphere and friendly staff.",
    rating: 5,
    author: "Sarah Johnson",
  },
  {
    title: "Average Hotel Stay",
    content: "Clean rooms but nothing spectacular. Breakfast was basic.",
    rating: 3,
    author: "Michael Brown",
  },
  {
    title: "Fantastic Book",
    content: "Couldn't put it down! Engaging story from start to finish.",
    rating: 5,
    author: "Emma Wilson",
  },
  {
    title: "Poor Customer Service",
    content: "Had to wait for hours. Staff was unhelpful and rude.",
    rating: 1,
    author: "James Anderson",
  },
  {
    title: "Excellent Gym",
    content: "Modern equipment and clean facilities. Great trainers.",
    rating: 4,
    author: "Lisa Martinez",
  },
  {
    title: "Mediocre Pizza",
    content: "Toppings were fresh but crust was undercooked.",
    rating: 2,
    author: "Robert Taylor",
  },
  {
    title: "Perfect Wedding Venue",
    content: "Beautiful location and professional staff. Made our day special.",
    rating: 5,
    author: "Jennifer Lee",
  },
  {
    title: "Basic Laptop",
    content: "Gets the job done but nothing special. Average performance.",
    rating: 3,
    author: "Kevin Wilson",
  },
  {
    title: "Outstanding Concert",
    content: "Amazing performance and great acoustics. Unforgettable night.",
    rating: 5,
    author: "Amanda White",
  },
  {
    title: "Terrible Flight Experience",
    content: "Multiple delays and lost luggage. Awful customer service.",
    rating: 1,
    author: "Thomas Brown",
  },
  {
    title: "Good Value Hotel",
    content: "Reasonable prices and decent amenities. Would stay again.",
    rating: 4,
    author: "Rachel Green",
  },
  {
    title: "Overpriced Restaurant",
    content: "Food was good but not worth the high prices.",
    rating: 2,
    author: "Daniel Kim",
  },
  {
    title: "Excellent Doctor",
    content: "Very knowledgeable and caring. Takes time with patients.",
    rating: 5,
    author: "Patricia Moore",
  },
  {
    title: "Okay Gaming Console",
    content: "Some good games but interface needs improvement.",
    rating: 3,
    author: "Chris Evans",
  },
  {
    title: "Great Hair Salon",
    content: "Skilled stylists and relaxing atmosphere. Love my new look.",
    rating: 4,
    author: "Michelle Zhang",
  },
  {
    title: "Poor Quality Shoes",
    content: "Fell apart after a month. Not worth the money.",
    rating: 1,
    author: "Brian Wilson",
  },
  {
    title: "Perfect Beach Resort",
    content: "Beautiful location, excellent service, and amazing food.",
    rating: 5,
    author: "Jessica Thompson",
  },
];

async function main() {
  console.log("Start seeding...");

  for (const review of reviews) {
    const result = await prisma.review.create({
      data: review,
    });
    console.log(`Created review with id: ${result.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
