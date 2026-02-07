import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../models/User";

const SEED_USERS = [
  {
    name: "Emma Watson",
    email: "emma@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "James Wilson",
    email: "james@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Sophia Chen",
    email: "sophia@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "William Taylor",
    email: "william@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Ava Johnson",
    email: "ava@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Benjamin Lee",
    email: "benjamin@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Isabella Garcia",
    email: "isabella@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    name: "Ethan Davis",
    email: "ethan@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
];

async function seed() {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/chat-app";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Hash passwords and prepare users
    const hashedUsers = await Promise.all(
      SEED_USERS.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert seed users
    const users = await User.insertMany(hashedUsers);
    console.log(`🌱 Seeded ${users.length} users:`);
    users.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    await mongoose.disconnect();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
