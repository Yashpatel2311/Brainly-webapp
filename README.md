🧠 Brainly – Your Second Brain for Saving Links
Brainly is a simple and efficient Second Brain App designed to save and organize Twitter and YouTube links for quick access. Perfect for bookmarking important content, learning materials, and research references.

✨ Features
✅ Save Twitter & YouTube Links – Easily store important content for later.
✅ Organized Storage – Categorize links for effortless retrieval.
✅ Fast Search – Instantly find saved links when needed.
✅ Minimal UI – A clean, distraction-free experience for smooth usage.

🔥 Tech Stack
Frontend: React.js, TypeScript, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for object modeling)

🎯 Use Case
Save tweets and videos for learning, research, and inspiration.
Quickly retrieve useful content without losing track.
Keep an organized library of valuable resources.

🚀 Contributions & Feedback
We welcome feedback and contributions! Feel free to open issues, submit PRs, or share ideas to improve this app.

Directory structure:
└── yashpatel2311-brainly-webapp/
    ├── README.md
    ├── package.json
    ├── vercel.json
    ├── Brainly/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── tsconfig.tsbuildinfo
    │   └── src/
    │       ├── config.ts
    │       ├── db.ts
    │       ├── index.ts
    │       ├── middleware.ts
    │       ├── override.d.ts
    │       └── utils.ts
    └── Brainly-Frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        ├── vite.config.ts
        └── src/
            ├── App.tsx
            ├── config.ts
            ├── index.css
            ├── main.tsx
            ├── SplashScreen.tsx
            ├── vite-env.d.ts
            ├── assets/
            │   ├── bulb.json
            │   ├── creativity.json
            │   ├── organize.json
            │   ├── share.json
            │   └── upgrade.json
            ├── components/
            │   ├── Button.tsx
            │   ├── Card.tsx
            │   ├── CreateContentModal.tsx
            │   ├── Input.tsx
            │   ├── Sidebar.tsx
            │   └── SidebarItem.tsx
            ├── contexts/
            │   └── AuthContext.tsx
            ├── hooks/
            │   └── useContent.tsx
            ├── Icons/
            │   ├── BrainIcon.tsx
            │   ├── CrossIcon.tsx
            │   ├── Logo.tsx
            │   ├── PlusIcon.tsx
            │   ├── ShareIcon.tsx
            │   ├── SignOutIcon.tsx
            │   ├── TrashIcon.tsx
            │   ├── TwitterIcon.tsx
            │   └── YoutubeIcon.tsx
            ├── pages/
            │   ├── dashboard.tsx
            │   ├── Home.tsx
            │   ├── Signin.tsx
            │   └── Signup.tsx
            └── services/
                └── api.ts
