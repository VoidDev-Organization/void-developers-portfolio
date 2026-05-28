// ── Typed.js ──────────────────────────────────────────────────
var typed = new Typed(".text", {
  strings: ["Creative Development Team", "Web Solution Experts"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// ── Mobile nav ────────────────────────────────────────────────
function toggleNav() {
  document.getElementById("navbar").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("open");
}
function closeNav() {
  document.getElementById("navbar").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
}
// Close nav when clicking outside
window.addEventListener("click", function (e) {
  const nav = document.getElementById("navbar");
  const ham = document.getElementById("hamburger");
  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    !ham.contains(e.target)
  ) {
    closeNav();
  }
});

window.addEventListener("DOMContentLoaded", function () {
  updateAdminStatus();
  displayProjects();
});

function updateAdminStatus() {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  const indicator = document.getElementById("adminIndicator");
  const addProjectCard = document.getElementById("addProjectCard");
  if (isAdmin) {
    if (indicator) {
      indicator.innerHTML =
        '✓ Admin Mode Active <span style="font-size:12px;">(Click to Logout)</span>';
      indicator.style.background = "rgba(76,175,80,0.15)";
      indicator.style.borderColor = "rgba(76,175,80,0.5)";
      indicator.style.color = "#4caf50";
      indicator.onclick = adminLogout;
    }
    if (addProjectCard) addProjectCard.style.display = "flex";
  } else {
    if (indicator) {
      indicator.innerHTML =
        '🔒 Not Admin <span style="font-size:12px;">(Click to Login)</span>';
      indicator.style.background = "";
      indicator.style.borderColor = "";
      indicator.style.color = "";
      indicator.onclick = openAdminLogin;
    }
    if (addProjectCard) addProjectCard.style.display = "none";
  }
}

function openAdminLogin() {
  document.getElementById("adminLoginModal").classList.add("active");
}
function closeAdminLogin() {
  document.getElementById("adminLoginModal").classList.remove("active");
  document.getElementById("adminPassword").value = "";
}
function adminLogin() {
  const pw = document.getElementById("adminPassword").value;
  if (pw === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    closeAdminLogin();
    updateAdminStatus();
    alert("✓ Admin login successful!");
  } else {
    alert("❌ Incorrect password!");
    document.getElementById("adminPassword").value = "";
  }
}
function adminLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminLoggedIn");
    updateAdminStatus();
    alert("✓ Logged out successfully!");
  }
}
function toggleProjectForm() {
  if (localStorage.getItem("adminLoggedIn") === "true") {
    document.getElementById("projectFormModal").classList.toggle("active");
  } else {
    alert("⚠️ Admin login required to add projects!");
    openAdminLogin();
  }
}

// ── PROJECTS ──────────────────────────────────────────────────

// Built-in pinned projects (always shown first, cannot be deleted by users)
const PINNED_PROJECTS = [
  {
    id: "pinned-void-media",
    pinned: true,
    name: "Void Media",
    description:
      "A social messaging platform built entirely by Team VoidDev. Users can publish posts, follow a live feed, manage friends, receive notifications, and upload media — all in a sleek, dark interface. Deployed on Render and production-ready.",
    technologies: [
      "Python",
      "Flask",
      "HTML",
      "CSS",
      "JavaScript",
      "JSON",
      "MongoDB",
      "Cloudinary",
      "Render",
    ],
    link: "https://void-media-lynj.onrender.com",
    image: "void-media-preview.png",
  },
  {
    id: "pinned-void-cast",
    pinned: true,
    name: "Void Cast",
    description:
      "Void Cast is a media-sharing web app where users can upload “casts” into a shared feed. It supports images, videos, PDFs, and other files through Cloudinary, lets users add captions, and displays uploaded casts in a clean main feed.",
    technologies: [
      "Express.js",
      "Node.js",
      "HTML",
      "EJS",
      "CSS",
      "JavaScript",
      "JSON",
      "MongoDB",
      "Cloudinary",
      "Vercel",
    ],
    link: "https://void-cast-one.vercel.app",
    image: "void-cast.png",
  },
];

function addProject() {
  const name = document.getElementById("projectName").value.trim();
  const description = document
    .getElementById("projectDescription")
    .value.trim();
  const technologies = document.getElementById("projectTechnologies").value;
  const link = document.getElementById("projectLink").value.trim();
  const image = document.getElementById("projectImage").value.trim();

  if (!name || !description) {
    alert("Please fill in name and description.");
    return;
  }

  let projects = JSON.parse(localStorage.getItem("voiddevProjects")) || [];
  projects.push({
    id: Date.now(),
    name,
    description,
    technologies: technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t),
    link,
    image,
  });
  localStorage.setItem("voiddevProjects", JSON.stringify(projects));

  // Reset inputs
  [
    "projectName",
    "projectDescription",
    "projectTechnologies",
    "projectLink",
    "projectImage",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });

  document.getElementById("projectFormModal").classList.remove("active");
  displayProjects();
  alert("✓ Project added successfully!");
}

function displayProjects() {
  const grid = document.getElementById("projectsGrid");
  const userProjects =
    JSON.parse(localStorage.getItem("voiddevProjects")) || [];
  const all = [...PINNED_PROJECTS, ...userProjects];

  grid.innerHTML = "";

  if (all.length === 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;color:#7a6a8a;padding:40px;">No projects yet.</p>';
    return;
  }

  all.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const techHTML = (project.technologies || [])
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    const linkHTML = project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">🚀 View Project</a>`
      : "";

    const deleteHTML = !project.pinned
      ? `<div class="project-actions"><button class="btn-delete-project" onclick="deleteProject(${project.id})">Delete</button></div>`
      : "";

    const bannerHTML = project.image
      ? `<div class="project-banner-wrap">
                 <img src="${project.image}" alt="${project.name}" class="project-banner" onerror="this.parentElement.style.display='none'">
                 <div class="project-banner-overlay"></div>
               </div>`
      : "";

    card.innerHTML = `
            ${bannerHTML}
            <div class="project-body">
                <div class="project-name">${project.name}</div>
                <div class="project-description">${project.description}</div>
                <div class="project-technologies">${techHTML}</div>
                ${linkHTML}
                ${deleteHTML}
            </div>
        `;

    // Make whole card clickable if it has a link
    if (project.link) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-delete-project")) return;
        window.open(project.link, "_blank", "noopener,noreferrer");
      });
    }

    grid.appendChild(card);
  });
}

function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    let projects = JSON.parse(localStorage.getItem("voiddevProjects")) || [];
    projects = projects.filter((p) => p.id !== id);
    localStorage.setItem("voiddevProjects", JSON.stringify(projects));
    displayProjects();
  }
}

// ── CLOSE MODAL ON OUTSIDE CLICK ─────────────────────────────
window.addEventListener("click", function (e) {
  ["projectFormModal", "adminLoginModal"].forEach((id) => {
    const modal = document.getElementById(id);
    if (modal && e.target === modal) modal.classList.remove("active");
  });
});

// ── SMOOTH NAV ────────────────────────────────────────────────
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // External page — let browser handle it normally
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".logo").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
});

// ── ACTIVE NAV ON SCROLL ──────────────────────────────────────
window.addEventListener("scroll", function () {
  const scrollY = pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Map section ids to nav hrefs
  const sectionIds = ["home", "about", "projects", "contact"];
  let current = "home";

  // If at very bottom, contact is active
  if (scrollY + windowHeight >= docHeight - 5) {
    current = "contact";
  } else {
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && scrollY >= section.offsetTop - 300) {
        current = id;
      }
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === "#" + current) link.classList.add("active");
  });
});
