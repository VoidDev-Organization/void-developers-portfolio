// ── HARDCODED MEMBERS (no localStorage needed — works on Vercel) ──────────────
const MEMBERS = [
    {
        id: 1001,
        name: 'Fadi Mohammed-Sami',
        role: 'Software Engineering Student & Full-Stack Developer',
        education: 'Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)',
        languages: ['JavaScript', 'Python', 'Java', 'C', 'HTML & CSS', 'SQL'],
        frameworks: ['Node.js', 'Express.js', 'Flask', 'Jasmine (JS)', 'Cloudinary'],
        databases: ['MongoDB', 'SQL'],
        skills: ['Full-Stack Web Development', 'REST API Design', 'Database Design', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Version Control (Git & GitHub)', 'WebSocket'],
        bio: 'Software engineering student passionate about building maintainable and creative software applications. Experienced in full-stack web development using Node.js, Express.js, and MongoDB, with strong foundations in object-oriented programming, data structures, algorithms, and database systems.',
        email: 'fadi.kaizen777@gmail.com',
        projects: [
            { name: 'Void-Media (Social Messaging Platform)', url: 'https://void-media-lynj.onrender.com' },
            { name: 'Amazon Clone', url: null } ,
            { name: 'Credit card validator', url: null } ,
            { name: 'Encryption & ecryption program', url: null } 

        
        ],
        icons: ['github'],
        socialLinks: { github: 'https://github.com/Fadi-eclipse' },
        profile: null
    },
    {
        id: 1002,
        name: 'Saeed Hassan',
        role: 'Software Engineering Student & Frontend Developer',
        education: 'Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)',
        languages: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java'],
        frameworks: ['React', 'Tailwind CSS', 'Django'],
        databases: [],
        skills: ['Responsive UI Design', 'Component-Based Architecture', 'Cross-Browser Compatibility', 'Interactive Web Experiences', 'UI/UX Design Principles', 'Version Control (Git & GitHub)'],
        bio: 'Software Engineering student passionate about frontend development and building modern web applications. Skilled in creating responsive user interfaces and interactive web experiences. Interested in software engineering, UI design, and full-stack web development.',
        email: 'Saeedahmd2003@gmail.com',
        projects: [
            { name: 'Void Media – Social Messaging Platform', url: 'https://void-media-lynj.onrender.com' }
        ],
        icons: ['github'],
        socialLinks: { github: 'https://github.com/Saeedhassa' },
        profile: null
    },
    {
        id: 1003,
        name: 'Monzir Ahmed',
        role: 'Software Engineering Student & Backend Developer',
        education: 'Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)',
        languages: ['Python', 'C', 'Java', 'JavaScript', 'HTML & CSS', 'SQL'],
        frameworks: ['Django', 'Flask', 'Firebase', 'WebSocket'],
        databases: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'SQL Server'],
        skills: ['Backend Architecture', 'Real-Time Systems (WebSocket)', 'Database Design & Administration', 'REST API Development', 'Notifications Systems', 'Mobile-Ready Web Apps', 'Version Control (Git & GitHub)'],
        bio: 'Software Engineering student with a strong interest in backend development and real-time web applications. Experienced in building systems using Python and Django, working with databases, and creating projects that solve practical problems. Focused on improving backend architecture skills, WebSocket integration, and notifications systems.',
        email: 'montherrt@gmail.com',
        projects: [
            { name: 'Void Media — Social Media Platform', url: 'https://void-media-lynj.onrender.com' },
            { name: 'Mini Discord Clone', url: null },
            { name: 'Snake Game & Ping Pong Game', url: null },
            { name: 'Smart Selling Machine Simulation', url: null }
        ],
        icons: ['github'],
        socialLinks: { github: 'https://github.com/RedFox199' },
        profile: null
    },
    {
        id: 1004,
        name: 'Mohamed Abdelmonem Hassan',
        role: 'UI/UX Designer & Framer Developer',
        education: 'Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)',
        languages: ['HTML', 'CSS'],
        frameworks: ['Figma (Advanced)', 'Framer', 'Web Animations & Interactions'],
        databases: [],
        skills: ['UI Design', 'UX Research', 'Wireframing & Prototyping', 'Design Systems & Typography', 'No-Code Web Development', 'Responsive & Mobile Design', 'Visual Hierarchy', 'End-to-End Project Management', 'Attention to Detail', 'Rapid Learning & Adaptability'],
        bio: 'Creative and detail-oriented UI/UX Designer and Framer Developer currently pursuing university studies in Rwanda. Highly skilled in transforming abstract ideas into beautiful, user-centric visual designs and converting them seamlessly into high-performance, interactive websites. Proficient in crafting design systems in Figma and launching production-ready web experiences using Framer.',
        email: 'mhadamu2001@gmail.com',
        projects: [
            { name: 'High-Fidelity UI & Responsive Layouts (Freelance)', url: null },
            { name: 'Animated Websites via Framer (Freelance)', url: null }
        ],
        icons: ['linkedin'],
        socialLinks: { linkedin: '#' },
        profile: null
    }
];

// ── Render helpers ────────────────────────────────────────────────────────────
function makeTags(items, colorStyle) {
    if (!items || items.length === 0) return '';
    return items.map(item => `<span class="skill-tag" style="${colorStyle}">${item}</span>`).join('');
}

function sectionBlock(emoji, label, color, tagsHTML) {
    if (!tagsHTML) return '';
    return `
        <div style="margin: 12px 0;">
            <strong style="color:${color};font-size:11px;text-transform:uppercase;letter-spacing:0.7px;">
                ${emoji} ${label}
            </strong>
            <div class="member-skills" style="margin-top:6px;">${tagsHTML}</div>
        </div>`;
}

// ── Display members ───────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function () {
    displayMembers();
});

function displayMembers() {
    const membersGrid = document.getElementById('membersGrid');
    membersGrid.innerHTML = '';

    const iconMap = {
        instagram: 'bxl-instagram',
        github: 'bxl-github',
        linkedin: 'bxl-linkedin',
        twitter: 'bxl-twitter',
        facebook: 'bxl-facebook'
    };

    MEMBERS.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        const langSection = sectionBlock('🗣️', 'Languages', '#a78bfa',
            makeTags(member.languages, 'background:rgba(167,139,250,0.08);color:#c4b5fd;border-color:rgba(167,139,250,0.25);'));

        const fwSection = sectionBlock('🧩', 'Frameworks & Libraries', '#7fffd4',
            makeTags(member.frameworks, 'background:rgba(0,255,180,0.07);color:#7fffd4;border-color:rgba(0,255,180,0.25);'));

        const dbSection = sectionBlock('🗄️', 'Databases', '#ffd580',
            makeTags(member.databases, 'background:rgba(255,190,60,0.08);color:#ffd580;border-color:rgba(255,190,60,0.25);'));

        const skillSection = sectionBlock('💡', 'Skills', '#a855f7',
            makeTags(member.skills, 'background:rgba(168,85,247,0.08);color:#c084fc;border-color:rgba(168,85,247,0.25);'));

        let projectsHTML = '';
        if (member.projects && member.projects.length > 0) {
            projectsHTML = member.projects.map(p => {
                const name = typeof p === 'string' ? p : p.name;
                const url  = typeof p === 'object' ? p.url : null;
                if (url) return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                    <span class="skill-tag" style="background:rgba(168,85,247,0.08);color:#c084fc;border-color:rgba(168,85,247,0.25);cursor:pointer;">📁 ${name}</span></a>`;
                return `<span class="skill-tag" style="background:rgba(168,85,247,0.08);color:#c084fc;border-color:rgba(168,85,247,0.25);">📁 ${name}</span>`;
            }).join('');
        }
        const projectSection = sectionBlock('📁', 'Projects', '#a855f7', projectsHTML);

        let socialHTML = '';
        if (member.icons && member.icons.length > 0) {
            socialHTML = '<div class="member-social-icons">' +
                member.icons.map(icon => {
                    const url = member.socialLinks?.[icon] || '#';
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${icon}"><i class='bx ${iconMap[icon]}'></i></a>`;
                }).join('') + '</div>';
        }

        const profileHTML = member.profile
            ? `<div class="member-profile"><img src="${member.profile}" alt="${member.name}"></div>`
            : `<div class="member-profile"><span class="member-profile-placeholder">👤</span></div>`;

        card.innerHTML = `
            ${profileHTML}
            <div class="member-header">
                <div>
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
            </div>
            ${member.education ? `<div style="font-size:12px;color:#a78bfa;margin:8px 0;line-height:1.5;">🎓 ${member.education}</div>` : ''}
            <div class="member-bio">${member.bio}</div>
            ${langSection}
            ${fwSection}
            ${dbSection}
            ${skillSection}
            ${projectSection}
            ${socialHTML}
            <div class="member-email">📧 ${member.email}</div>
        `;

        membersGrid.appendChild(card);
    });
}
