// Data Store
const DataStore = {
  users: JSON.parse(localStorage.getItem("pathfinder_users") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("pathfinder_currentUser") || "null"),
  roadmaps: JSON.parse(localStorage.getItem("pathfinder_roadmaps") || "[]"),
  careers: JSON.parse(localStorage.getItem("pathfinder_careers") || "[]"),
  internships: JSON.parse(localStorage.getItem("pathfinder_internships") || "[]"),
  webinars: JSON.parse(localStorage.getItem("pathfinder_webinars") || "[]"),
  welcomeVideos: JSON.parse(localStorage.getItem("pathfinder_welcomeVideos") || "{}"),

  save() {
    localStorage.setItem("pathfinder_users", JSON.stringify(this.users))
    localStorage.setItem("pathfinder_currentUser", JSON.stringify(this.currentUser))
    localStorage.setItem("pathfinder_roadmaps", JSON.stringify(this.roadmaps))
    localStorage.setItem("pathfinder_careers", JSON.stringify(this.careers))
    localStorage.setItem("pathfinder_internships", JSON.stringify(this.internships))
    localStorage.setItem("pathfinder_webinars", JSON.stringify(this.webinars))
    localStorage.setItem("pathfinder_welcomeVideos", JSON.stringify(this.welcomeVideos))
  },
}

// Admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@pathfinder.com",
  password: "admin123",
}

// Career paths data
const careerPaths = [
  {
    category: "Science Stream",
    paths: [
      { name: "Engineering", icon: "⚙️", students: "15K+ students" },
      { name: "Medical", icon: "🏥", students: "12K+ students" },
      { name: "Research", icon: "🔬", students: "3K+ students" },
      { name: "Architecture", icon: "🏛️", students: "2K+ students" },
    ],
  },
  {
    category: "Commerce Stream",
    paths: [
      { name: "CA/CPA", icon: "📊", students: "8K+ students" },
      { name: "Business", icon: "💼", students: "6K+ students" },
      { name: "Banking", icon: "🏦", students: "4K+ students" },
      { name: "Economics", icon: "📈", students: "3K+ students" },
    ],
  },
  {
    category: "Arts & Humanities",
    paths: [
      { name: "Law", icon: "⚖️", students: "5K+ students" },
      { name: "Journalism", icon: "📰", students: "3K+ students" },
      { name: "Design", icon: "🎨", students: "4K+ students" },
      { name: "Psychology", icon: "🧠", students: "2K+ students" },
    ],
  },
  {
    category: "Emerging Fields",
    paths: [
      { name: "AI/ML", icon: "🤖", students: "6K+ students" },
      { name: "Data Science", icon: "📱", students: "5K+ students" },
      { name: "Cybersecurity", icon: "🔒", students: "3K+ students" },
      { name: "Digital Marketing", icon: "📣", students: "4K+ students" },
    ],
  },
]

// Target audience options
const TARGET_AUDIENCES = [
  "All Students",
  "Engineering",
  "Medical",
  "Commerce",
  "Arts",
  "Law",
  "Design",
  "Technology",
  "Science",
]

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu()
  initCareerPaths()
})

// Mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }
}

// Career paths tabs
function initCareerPaths() {
  const categoryTabs = document.getElementById("categoryTabs")
  const careerCards = document.getElementById("careerCards")

  if (!categoryTabs || !careerCards) return

  let activeCategory = 0

  function renderCards() {
    const paths = careerPaths[activeCategory].paths
    careerCards.innerHTML = paths
      .map(
        (path) => `
      <div class="career-card">
        <div class="icon">${path.icon}</div>
        <h3>${path.name}</h3>
        <p class="students">${path.students}</p>
        <div class="link">
          View Roadmap
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    `,
      )
      .join("")
  }

  categoryTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn")) {
      const category = Number.parseInt(e.target.dataset.category)
      activeCategory = category

      document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
      e.target.classList.add("active")

      renderCards()
    }
  })

  renderCards()
}

// Utility functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}
