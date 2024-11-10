// Sample job data
// const jobs = [
//   { id: 1, title: 'Frontend Developer', location: 'Amman', coords: [31.9539, 35.9106], description: 'Responsible for building web applications using modern JavaScript frameworks.' },
//   { id: 2, title: 'Data Scientist', location: 'Irbid', coords: [32.5556, 35.8506], description: 'Analyze data to help drive strategic business decisions.' },
//   { id: 3, title: 'Backend Developer', location: 'Zarqa', coords: [32.0728, 36.0870], description: 'Develop and maintain server-side logic, databases, and integrations.' },
//   { id: 4, title: 'Product Manager', location: 'Aqaba', coords: [29.5320, 35.0063], description: 'Lead product development from ideation to execution and collaborate with cross-functional teams.' },
//   { id: 5, title: 'UX/UI Designer', location: 'Amman', coords: [31.9539, 35.9106], description: 'Design intuitive and aesthetically pleasing user interfaces for web and mobile applications.' },
//   { id: 6, title: 'Mobile App Developer', location: 'Salt', coords: [32.0392, 35.7272], description: 'Develop and maintain mobile applications for iOS and Android platforms.' },
//   { id: 7, title: 'Network Engineer', location: 'Mafraq', coords: [32.3435, 36.2080], description: 'Design, implement, and maintain network infrastructure for company operations.' },
//   { id: 8, title: 'Systems Administrator', location: 'Jerash', coords: [32.2800, 35.8993], description: 'Manage and maintain the company’s server and IT infrastructure.' },
//   { id: 9, title: 'Cybersecurity Analyst', location: 'Amman', coords: [31.9539, 35.9106], description: 'Monitor and protect the organization’s networks and systems from cyber threats.' },
//   { id: 10, title: 'Database Administrator', location: 'Zarqa', coords: [32.0728, 36.0870], description: 'Oversee database performance, ensure data security, and handle backups.' },
//   { id: 11, title: 'Marketing Specialist', location: 'Aqaba', coords: [29.5320, 35.0063], description: 'Plan and execute marketing strategies to increase brand awareness and engagement.' },
//   { id: 12, title: 'Content Writer', location: 'Madaba', coords: [31.7169, 35.7939], description: 'Create and edit content for digital and print media channels.' },
//   { id: 13, title: 'SEO Specialist', location: 'Amman', coords: [31.9539, 35.9106], description: 'Optimize website content to improve search engine ranking and visibility.' },
//   { id: 14, title: 'HR Coordinator', location: 'Karak', coords: [31.1850, 35.7044], description: 'Assist with HR functions including recruitment, employee relations, and onboarding.' },
//   { id: 15, title: 'Financial Analyst', location: 'Tafilah', coords: [30.8375, 35.6042], description: 'Analyze financial data to assist with strategic business decisions and budgeting.' },
//   { id: 16, title: 'Project Manager', location: 'Ajloun', coords: [32.3333, 35.7500], description: 'Manage project timelines, budgets, and teams to ensure project success.' },
//   { id: 17, title: 'Data Engineer', location: 'Irbid', coords: [32.5556, 35.8506], description: 'Design and develop data pipelines and manage data storage solutions.' },
//   { id: 18, title: 'Sales Executive', location: 'Mafraq', coords: [32.3435, 36.2080], description: 'Drive sales and build relationships with potential clients to grow business.' },
//   { id: 19, title: 'IT Support Specialist', location: 'Jerash', coords: [32.2800, 35.8993], description: 'Provide technical support and troubleshooting for internal and external users.' },
//   { id: 20, title: 'Operations Manager', location: 'Salt', coords: [32.0392, 35.7272], description: 'Oversee daily operations and implement efficient processes across departments.' }
// ];

const jobs = [
  { id: 1, title: 'Auto Mechanic/Oil Change Worker', location: 'Amman', latitude: 31.9539, longitude: 35.9106, description: 'Performs vehicle mechanical work including oil changes.', currentTechnicalStaff: 0, currentOthers: 1, currentSpecify: 'Auto Mechanic/Oil Change Worker', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 2, currentInterns: 0, currentSeasonalEmployees: 1, currentEntryLevel: 0, currentMidSeniorLevel: 1, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 1, currentOtherArea: 0, futureTechnicalStaff: 1, futureOthers: 1, futureSpecify: 'Auto Mechanic/Oil Change Worker' },
  { id: 2, title: 'Blacksmith', location: 'Unknown Location', latitude: 30.5184715, longitude: 35.5703857, description: 'Performs metalwork, forging, and shaping of iron or steel.', currentTechnicalStaff: 0, currentOthers: 0, currentSpecify: '', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 1, currentInterns: 0, currentSeasonalEmployees: 1, currentEntryLevel: 0, currentMidSeniorLevel: 0, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 1, currentOtherArea: 0, futureTechnicalStaff: 0, futureOthers: 1, futureSpecify: 'Blacksmith' },
  { id: 3, title: 'Welder', location: 'Salt', latitude: 30.5189218, longitude: 35.5736048, description: 'Performs welding and fabrication of metal structures.', currentTechnicalStaff: 0, currentOthers: 0, currentSpecify: '', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 1, currentInterns: 0, currentSeasonalEmployees: 0, currentEntryLevel: 1, currentMidSeniorLevel: 0, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 0, currentOtherArea: 0, futureTechnicalStaff: 0, futureOthers: 1, futureSpecify: 'Welder' }
];

// Initialize the map
const map = L.map('map').setView([31.9539, 35.9106], 7);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Render markers for jobs with opacity variance
function renderMarkers(filteredJobs) {
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) layer.remove();
  });

  filteredJobs.forEach((job) => {
    // Ensure latitude and longitude are valid before adding the marker
    if (job.latitude && job.longitude) {
      // Calculate opacity based on job attribute (e.g., priority or distance)
      const opacity = calculateOpacity(job);

      // Add marker with custom opacity
      const marker = L.marker([job.latitude, job.longitude], { opacity }).addTo(map);
      marker.on('click', () => openModal(job.id));
    }
  });  
}

function calculateOpacity(job) {
  // TODO
  return 0.9
}

// Render job listings in the sidebar with click events
function renderJobListings(filteredJobs) {
  const jobListContainer = document.getElementById('job-listings');
  jobListContainer.innerHTML = '';

  filteredJobs.forEach((job) => {
    const jobElement = document.createElement('div');
    jobElement.className = 'job-listing';
    jobElement.setAttribute('data-id', job.id); // Set the job ID
    jobElement.innerHTML = `<h3>${job.title}</h3><p>${job.location}</p>`;
    jobElement.addEventListener('click', () => openModal(job.id));
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

// Open modal with job details
function openModal(jobId) {
  const job = jobs.find((job) => job.id === jobId);
  if (job) {
    modalBody.innerHTML = `
      <h1>${job.title}</h1>
      <p><strong>Job ID:</strong> ${job.id}</p>
      <p>${job.description}</p>

      <h3>Recruitment Information</h3>
      <p><strong>Consider Youth (18-29):</strong> ${job.considerYouth}</p>
      <p><strong>Expect Employee Need Next Year:</strong> ${job.expectEmployeeNeedNextYear}</p>
      <p><strong>Expected Job Vacancies:</strong> ${job.expectedJobVacancies}</p>

      <h3>Current Recruitment</h3>
      <p><strong>Technical Staff:</strong> ${job.currentTechnicalStaff}</p>
      <p><strong>Other Positions:</strong> ${job.currentOthers}</p>
      <p><strong>Specify Other:</strong> ${job.currentSpecify}</p>
      <p><strong>Interns:</strong> ${job.currentInterns}</p>
      <p><strong>Seasonal Employees:</strong> ${job.currentSeasonalEmployees}</p>
      <p><strong>Entry Level:</strong> ${job.currentEntryLevel}</p>
      <p><strong>Mid-Senior Level:</strong> ${job.currentMidSeniorLevel}</p>
      <p><strong>Senior Management Level:</strong> ${job.currentSeniorManagementLevel}</p>

      <h3>Future Recruitment</h3>
      <p><strong>Future Technical Staff:</strong> ${job.futureTechnicalStaff}</p>
      <p><strong>Future Other Positions:</strong> ${job.futureOthers}</p>
      <p><strong>Specify Future Other:</strong> ${job.futureSpecify}</p>
    `;

    modal.style.display = 'block';
  }
}

async function contactServer(data) {
  try {
      const response = await fetch("http://127.0.0.1:5002/query", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          mode: "no-cors",
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}

async function contactServer(data) {
  try {
      const response = await fetch("http://127.0.0.1:5002/query", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          mode: "no-cors",
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}

async function getAll() {
  try {
      const response = await fetch("http://127.0.0.1:5002/all", {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Data received:", responseData);
      return responseData;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}

// Close modal event
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if clicking outside of the content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Initial render
renderMarkers(jobs);
renderJobListings(jobs);

// TEST
const myData = {
  district: ["Ash-Shobek", "Koorah"],
  otherKey: "some value"
};

getAll().then(responseData => {
  console.log("Server response:", responseData);
});

// contactServer(myData).then(responseData => {
//   console.log("Server response:", responseData);
// });
