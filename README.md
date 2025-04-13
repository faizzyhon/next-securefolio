
# 🐱‍💻 Kali Linux Web GUI Clone – Built with Next.js

🚀 [Live Demo](https://faizzyhons.vercel.app)

A full-featured **Kali Linux-inspired desktop environment** built entirely in **Next.js**, simulating real tools like a terminal and browser with a dark, hacker-themed UI. Designed to be responsive, fast, and mobile-friendly.



![3 140829](https://github.com/user-attachments/assets/048eeafc-979d-4abe-afc4-6b622b872e51)



---

## 🎯 Features

🖥️ **Desktop Environment**
- Draggable windows (Browser, Terminal, File Explorer, etc.)
- Taskbar with active window icons
- Start menu and desktop icons
- Boot splash screen and login simulation

🧑‍💻 **Terminal**
- Fully interactive fake terminal (`xterm.js`)
- Simulated commands: `nmap`, `ping`, `whoami`, and more
- Typed output animation for realism

🌐 **Real Web Browser**
- Enter a URL and view the page using the **Browserless API**
- Fully functional Chrome-powered browsing (via screenshots)
- No iframe errors or network blocks

🛠️ **Utilities & Tools**
- File Explorer with folder view
- Notes app
- PDF Viewer
- Code Editor (`monaco-editor`)
- Calculator

🕵️‍♂️ **Cybersecurity-Themed Tools**
- Fake Wireshark interface (packet viewer)
- Simulated Nmap scanner
- Fake VPN UI + IP info
- Hash cracker + wordlist generator (visual UI)

⚙️ **Settings**
- View developer portfolio (name, bio, GitHub, LinkedIn, Instagram, Upwork, and project links)

📱 **Mobile-Friendly**
- Fully responsive and touch-compatible
- Clean UI with TailwindCSS & Framer Motion animations

---

![image](https://github.com/user-attachments/assets/62c84077-b1a7-441b-bf86-53f80dffa017)


## 🧪 Tech Stack

- **Next.js** (Frontend + API routes)
- **Tailwind CSS** (UI design)
- **Framer Motion** (Smooth animations)
- **xterm.js** (Terminal emulator)
- **Monaco Editor** (VS Code-like code editor)
- **Browserless API** (Headless Chrome for web browsing)
- **React-RND** / `react-draggable` (Movable windows)
- **Vercel** (Deployment)

---

## 🧠 How It Works

> 🖥️ You’re basically running a simulated Linux desktop in the browser!

- The **Terminal** uses `xterm.js` with fake command outputs.
- The **Browser** uses a Next.js API route that sends URLs to **Browserless**, returning screenshot previews of websites (so they load even if they block iframes).
- All tools are isolated components styled in a unified theme to mimic Kali Linux.

---

## 🧑‍🎓 Developer Portfolio (from Settings Panel)

**Muhammad Faizen**  
AI Engineer & Full Stack Developer  
🌐 [faizzyhons.vercel.app](https://faizzyhons.vercel.app)  
🐱 [GitHub](https://github.com/faizzyhon)  
💼 [LinkedIn](https://linkedin.com/in/mfaizanai)  
📸 [Instagram](https://instagram.com/faizzyhon)  
🧑‍💼 [Upwork Profile](https://www.upwork.com/freelancers/~0193d3d868ae44047a)

---

## 🛒 Buy My Kali Linux Portfolio UI

[![Buy Now](https://img.shields.io/badge/Buy%20Now-%2450-orange?style=for-the-badge)](https://faizzyhon.pocketsflow.com/kali-portfolio)


## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/kali-linux-web-gui.git
cd kali-linux-web-gui
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your Browserless API key
Create a `.env.local` file:

```
BROWSERLESS_API_KEY=S7fJaYl2KzueLn445f8cf618918b77a6316fe2916e
```

### 4. Run the dev server
```bash
npm run dev
```

Visit `http://localhost:3000` to start exploring the Linux world in your browser!

---

## 📸 Screenshots

> Add some screenshots of the terminal, browser, and GUI windows here.

---

## 📄 License

This project is open-source and free to use under the **MIT License**.

---

## 💬 Want Something Similar?

Feel free to fork, star ⭐️, or reach out!  
For custom projects or freelance collaborations, let's connect via [LinkedIn](https://linkedin.com/in/mfaizanai) or [faizzyhons.vercel.app](https://faizzyhons.vercel.app).
