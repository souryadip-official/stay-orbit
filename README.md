# StayOrbit 🏡  
A full-stack home listing and hosting platform built with Node.js, Express.js, MongoDB, and Tailwind CSS, allowing authenticated hosts to list, edit, and manage rental homes securely.

## 🌐 Live Demo
[https://stay-orbit.onrender.com](https://stay-orbit.onrender.com)

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Role-based access using `express-session`
  - Only hosts can create/edit/delete listings
  - Route protection between users and hosts

- 🏠 **Home Management**
  - Hosts can add, edit, and delete homes with descriptions and images
  - Images uploaded locally or to Cloudinary
  - Edit/Delete only visible to the owner of the listing

- ❤️ **Favorites System**
  - Logged-in users can add/remove homes to/from their personal favorites list
  - Each user's favorites are kept private and exclusive

- 📸 **Image Uploads**
  - `Multer` handles file uploads
  - Images stored on [Cloudinary](https://cloudinary.com/) for production

- 🎨 **UI/UX**
  - Built with **EJS** templating engine and **Tailwind CSS**
  - Custom gradients, responsive layouts, interactive modals
  - Animated loaders for better user experience

- 🔐 **Validation**
  - Hosts can't access user routes and vice versa
  - One host can't manage other hosts' listings

---

## 🛠️ Tech Stack

| Category         | Technologies                                     |
|------------------|--------------------------------------------------|
| Backend          | Node.js, Express.js                              |
| Frontend         | EJS, Tailwind CSS                                |
| Database         | MongoDB                                          |
| Authentication   | express-session                                  |
| Image Handling   | Multer, Cloudinary                               |
| Deployment       | Render                                           |

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/souryadip-official/stay-orbit.git
cd stay-orbit
