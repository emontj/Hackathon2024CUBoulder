// Sample job data
const jobs = [
  { id: 1, title: 'Frontend Developer', location: 'Amman', coords: [31.9539, 35.9106], description: 'Responsible for building web applications using modern JavaScript frameworks.' },
  { id: 2, title: 'Data Scientist', location: 'Irbid', coords: [32.5556, 35.8506], description: 'Analyze data to help drive strategic business decisions.' },
  { id: 3, title: 'Backend Developer', location: 'Zarqa', coords: [32.0728, 36.0870], description: 'Develop and maintain server-side logic, databases, and integrations.' },
  { id: 4, title: 'Product Manager', location: 'Aqaba', coords: [29.5320, 35.0063], description: 'Lead product development from ideation to execution and collaborate with cross-functional teams.' },
  { id: 5, title: 'UX/UI Designer', location: 'Amman', coords: [31.9539, 35.9106], description: 'Design intuitive and aesthetically pleasing user interfaces for web and mobile applications.' },
  { id: 6, title: 'Mobile App Developer', location: 'Salt', coords: [32.0392, 35.7272], description: 'Develop and maintain mobile applications for iOS and Android platforms.' },
  { id: 7, title: 'Network Engineer', location: 'Mafraq', coords: [32.3435, 36.2080], description: 'Design, implement, and maintain network infrastructure for company operations.' },
  { id: 8, title: 'Systems Administrator', location: 'Jerash', coords: [32.2800, 35.8993], description: 'Manage and maintain the company’s server and IT infrastructure.' },
  { id: 9, title: 'Cybersecurity Analyst', location: 'Amman', coords: [31.9539, 35.9106], description: 'Monitor and protect the organization’s networks and systems from cyber threats.' },
  { id: 10, title: 'Database Administrator', location: 'Zarqa', coords: [32.0728, 36.0870], description: 'Oversee database performance, ensure data security, and handle backups.' },
  { id: 11, title: 'Marketing Specialist', location: 'Aqaba', coords: [29.5320, 35.0063], description: 'Plan and execute marketing strategies to increase brand awareness and engagement.' },
  { id: 12, title: 'Content Writer', location: 'Madaba', coords: [31.7169, 35.7939], description: 'Create and edit content for digital and print media channels.' },
  { id: 13, title: 'SEO Specialist', location: 'Amman', coords: [31.9539, 35.9106], description: 'Optimize website content to improve search engine ranking and visibility.' },
  { id: 14, title: 'HR Coordinator', location: 'Karak', coords: [31.1850, 35.7044], description: 'Assist with HR functions including recruitment, employee relations, and onboarding.' },
  { id: 15, title: 'Financial Analyst', location: 'Tafilah', coords: [30.8375, 35.6042], description: 'Analyze financial data to assist with strategic business decisions and budgeting.' },
  { id: 16, title: 'Project Manager', location: 'Ajloun', coords: [32.3333, 35.7500], description: 'Manage project timelines, budgets, and teams to ensure project success.' },
  { id: 17, title: 'Data Engineer', location: 'Irbid', coords: [32.5556, 35.8506], description: 'Design and develop data pipelines and manage data storage solutions.' },
  { id: 18, title: 'Sales Executive', location: 'Mafraq', coords: [32.3435, 36.2080], description: 'Drive sales and build relationships with potential clients to grow business.' },
  { id: 19, title: 'IT Support Specialist', location: 'Jerash', coords: [32.2800, 35.8993], description: 'Provide technical support and troubleshooting for internal and external users.' },
  { id: 20, title: 'Operations Manager', location: 'Salt', coords: [32.0392, 35.7272], description: 'Oversee daily operations and implement efficient processes across departments.' }
];



// Initialize the map
const map = L.map('map').setView([31.9539, 35.9106], 9);

// Load and display OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Render markers for filtered jobs
const renderMarkers = (filteredJobs) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) layer.remove();
  });

  filteredJobs.forEach((job) => {
    const marker = L.marker(job.coords).addTo(map);
    
    marker.on('click', () => openModal(job));
  });
};

// Render initial markers and job listings
renderMarkers(jobs);
renderJobListings(jobs);

// Function to render job listings in sidebar
function renderJobListings(filteredJobs) {
  const jobListContainer = document.getElementById('job-listings');
  jobListContainer.innerHTML = '';

  filteredJobs.forEach((job) => {
    const jobElement = document.createElement('div');
    jobElement.className = 'job-listing';
    jobElement.innerHTML = `<h3>${job.title}</h3><p>${job.location}</p>`;
    jobListContainer.appendChild(jobElement);
  });
}

// Search functionality
document.getElementById('search').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm) ||
    job.location.toLowerCase().includes(searchTerm)
  );

  renderMarkers(filteredJobs);
  renderJobListings(filteredJobs);
});

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openModal(job) {
  modalBody.innerHTML = `
    <h2>${job.title}</h2>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Description:</strong> ${job.description}</p>
  `;
  modal.style.display = 'block';
}

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
