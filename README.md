<div align="center">

# 🎓 CandiMeter — University & Internship Platform

**Graduation project: a web platform that connects students with universities, faculties, activities and internship opportunities.**

![Angular](https://img.shields.io/badge/Angular_14-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

</div>

---

## ✨ Features

- 🏛️ Browse **universities** and their **faculties**
- 🎯 Explore student **activities** and **internship** opportunities
- 📝 **Registration & login** with form validation (including password confirmation)
- 🧭 Feature modules with lazy-loaded routing, guards and shared components
- 🎨 Responsive UI with Angular Material, Bootstrap and SweetAlert2 dialogs
- 🧪 Mock backend with json-server for local development

## 📁 Structure

```
src/app/
  auth/      Authentication (login, register, guards)
  core/      Singleton services and interceptors
  domine/    Domain models & services: university, faculty, activity, user, login
  pages/     Home, about, contact, university, faculty, activity, register
  shared/    Reusable components and pipes
```

## 🚀 Getting Started

```bash
git clone https://github.com/mos1239487394823939839223/Graduation-Project.git
cd Graduation-Project
npm install
npm start              # http://localhost:4200
```

| Command | Description |
|---|---|
| `npm start` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm test` | Unit tests (Karma + Jasmine) |

---

<div align="center">

Built by **[Mustafa Anwer Hamed](https://github.com/mos1239487394823939839223)**

</div>
