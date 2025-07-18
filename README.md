# TOOL.AI 🚀

TOOL.AI is a full-stack AI content generation and image editing platform that enables users to:

- ✍️ Write articles, generate blog titles
- 🖼️ Generate AI images in various styles
- 🔍 Remove background or erase objects from images
- 📄 Review resumes with AI feedback
- 📊 Track all prompts and activities via a personal dashboard
- 🌐 Share and explore public creations through the community hub

---

## 🌟 Features

- ✅ **AI Writing Assistant** using **Gemini API**
- ✅ **AI Image Generation** in multiple styles using **ClipDrop API**
- ✅ **Remove Background / Object** with **ClipDrop API**
- ✅ **Resume Review** with AI feedback & suggestions
- ✅ **Prompt Dashboard** to track past usage
- ✅ **Public Community Gallery** for image sharing
- ✅ **Secure Auth & Payments** with **Clerk**
- ✅ **Image Storage & Delivery** via **Cloudinary**
- ✅ **PostgreSQL Database** hosted on **Neon.tech**

---

## ⚙️ Tech Stack

| Layer        | Tech Used                         |
|--------------|-----------------------------------|
| Frontend     | React.js, Tailwind CSS            |
| Backend      | Node.js, Express.js               |
| Database     | PostgreSQL (via Neon)             |
| Auth & Billing | Clerk.dev                       |
| Image Storage| Cloudinary                        |
| AI Services  | Gemini API (Text),ClipDrop API (Image) |
| Hosting      | [Vercel]             |

---

## 🔐 Authentication & Payments

- Handled using **Clerk.dev**
- Includes:
  - Email/Password, Google OAuth login
  - Subscription plans with Stripe integration via Clerk

---

## 🧠 AI Integrations

- **Gemini Pro API**: Used for writing, summarizing, resume reviews
- **ClipDrop API**:
  - Style transfer and image generation
  - Remove background
  - Remove unwanted objects

---

## 🗃️ Cloudinary Integration

- Store user-generated and uploaded images
- Optimize and serve images efficiently

---

## 🧩 Database Schema (PostgreSQL - Neon)

- Users
- Prompts
- Generated Content (Images, Articles)
- Resume Reviews
- Payments/Subscription Logs

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (Neon recommended)
- Clerk account
- Cloudinary account
- Gemini & ClipDrop API keys

### Installation

```bash
git clone https://github.com/yourusername/tool.ai.git
cd tool.ai
npm install
