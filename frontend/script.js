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

const pickCoordinatesBtn = document.getElementById('pick-coordinates-btn');

// Render markers for jobs with opacity variance
function renderMarkers(filteredJobs) {
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) layer.remove();
  });

  filteredJobs.forEach((job) => {
    // Ensure latitude and longitude are valid before adding the marker
    if (job["_Exact Location_latitude"] && job["_Exact Location_longitude"]) {
      // Calculate opacity based on job attribute (e.g., priority or distance)
      const opacity = calculateOpacity(job);

      // Add marker with custom opacity
      const marker = L.marker([job["_Exact Location_latitude"], job["_Exact Location_longitude"]], { opacity }).addTo(map);
      marker.on('click', () => openModal(job["_id"], filteredJobs));
    }
  });  
}

function calculateOpacity(job) {
  // Adjust this function based on properties you wish to use for opacity calculation
  return 0.9;
}

// Render job listings in the sidebar with click events
function renderJobListings(filteredJobs) {
  const jobListContainer = document.getElementById('job-listings');
  jobListContainer.innerHTML = '';

  filteredJobs.forEach((job) => {
    const jobElement = document.createElement('div');
    jobElement.className = 'job-listing';
    jobElement.setAttribute('data-id', job["_id"]); // Set the job ID
    jobElement.innerHTML = `<h3>${job["Business name:"]}</h3><p>${job["District"]}, ${job["Governorat"]}</p>`;
    jobElement.addEventListener('click', () => openModal(job["_id"], filteredJobs));
    jobListContainer.appendChild(jobElement);
  });
}

// Open modal with job details
function openModal(jobId, jobs) {
  const job = jobs.find((job) => job["_id"] === jobId);
  if (job) {
    modalBody.innerHTML = `
      <!-- Main Title -->
      <h1 class="animate__animated animate__fadeInDown" style="animation-delay: 100ms;">${job["Business name:"]}</h1>
      
      <!-- Job ID and Description -->
      <div>
        <h3 class="animate__animated animate__fadeInUp" style="animation-delay: 200ms;">Job Details</h3>
        <div class="animate__animated animate__fadeInRight" style="animation-delay: 300ms;">
          <p><strong>Job ID:</strong> ${job["_id"]}</p>
          <p>${job["Please specify the business products and services"]}</p>
        </div>
      </div>

      <hr class="divider animate__animated animate__fadeInDown" />

      <!-- Recruitment Information Section -->
      <div>
        <h3 class="animate__animated animate__fadeInUp" style="animation-delay: 400ms;">Recruitment Information</h3>
        <div class="animate__animated animate__fadeInRight" style="animation-delay: 500ms;">
          <p><strong>Consider Youth (18-29):</strong> ${job["Do you consider youth (18-29 years) from the local community for employment?"]}</p>
          <p><strong>Expect Employee Need Next Year:</strong> ${job["Do you expect the need for employees in the next year?"]}</p>
          <p><strong>Expected Job Vacancies:</strong> ${job["Number of expected job vacancies:"]}</p>
        </div>
      </div>

      <hr class="divider animate__animated animate__fadeInDown" />

      <!-- Current Recruitment Section -->
      <div>
        <h3 class="animate__animated animate__fadeInUp" style="animation-delay: 600ms;">Current Recruitment</h3>
        <div class="animate__animated animate__fadeInRight" style="animation-delay: 700ms;">
          <p><strong>Technical Staff:</strong> ${job["Current//Priority areas of recruitment:/Technical Staff"]}</p>
          <p><strong>Other Positions:</strong> ${job["Current//Priority areas of recruitment:/Others"]}</p>
          <p><strong>Specify Other:</strong> ${job["Current//Please specify"]}</p>
          <p><strong>Interns:</strong> ${job["Current//Types of positions available:/Interns"]}</p>
          <p><strong>Seasonal Employees:</strong> ${job["Current//Types of positions available:/Seasonal employees"]}</p>
          <p><strong>Entry Level:</strong> ${job["Current//Types of positions available:/Entry level"]}</p>
          <p><strong>Mid-Senior Level:</strong> ${job["Current//Types of positions available:/Mid-senior level"]}</p>
          <p><strong>Senior Management Level:</strong> ${job["Current//Types of positions available:/Senior management level"]}</p>
        </div>
      </div>

      <hr class="divider animate__animated animate__fadeInDown" />

      <!-- Future Recruitment Section -->
      <div>
        <h3 class="animate__animated animate__fadeInUp" style="animation-delay: 800ms;">Future Recruitment</h3>
        <div class="animate__animated animate__fadeInRight" style="animation-delay: 900ms;">
          <p><strong>Future Technical Staff:</strong> ${job["Future//Priority areas of recruitment:/Technical Staff"]}</p>
          <p><strong>Future Other Positions:</strong> ${job["Future//Priority areas of recruitment:/Others"]}</p>
          <p><strong>Specify Future Other:</strong> ${job["Future//Please specify"]}</p>
        </div>
      </div>
    `;

    // Display the modal
    modal.style.display = 'block';

    modal.scrollTop = 0;
    modalBody.scrollTop = 0;
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

function clearMapMarkers() {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
}

function clearJobPostings() {
  const jobListContainer = document.getElementById('job-listings');
  if (jobListContainer) {
    jobListContainer.innerHTML = '';
  }
}

function clear() {
  clearMapMarkers();
  clearJobPostings();
}

// TEST
// const myData = {
//   district: ["Ash-Shobek", "Koorah"],
//   otherKey: "some value"
// };

async function main() {
  try {
    const jobs = await getAll(); // waits for getAll() to complete
    console.log("Server response:", jobs);
    
    renderMarkers(jobs);
    renderJobListings(jobs);

    // Button to toggle coordinate-picking mode
    pickCoordinatesBtn.addEventListener('click', () => {
      // Toggle the mode on button click
      isPickingCoordinates = !isPickingCoordinates;

      // Update button text based on mode
      pickCoordinatesBtn.textContent = isPickingCoordinates ? 'Cancel Picking' : 'Pick Coordinates';
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

// const jobs = [
//   { id: 1, title: 'Auto Mechanic/Oil Change Worker', location: 'Amman', latitude: 31.9539, longitude: 35.9106, description: 'Performs vehicle mechanical work including oil changes.', currentTechnicalStaff: 0, currentOthers: 1, currentSpecify: 'Auto Mechanic/Oil Change Worker', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 2, currentInterns: 0, currentSeasonalEmployees: 1, currentEntryLevel: 0, currentMidSeniorLevel: 1, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 1, currentOtherArea: 0, futureTechnicalStaff: 1, futureOthers: 1, futureSpecify: 'Auto Mechanic/Oil Change Worker' },
//   { id: 2, title: 'Blacksmith', location: 'Unknown Location', latitude: 30.5184715, longitude: 35.5703857, description: 'Performs metalwork, forging, and shaping of iron or steel.', currentTechnicalStaff: 0, currentOthers: 0, currentSpecify: '', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 1, currentInterns: 0, currentSeasonalEmployees: 1, currentEntryLevel: 0, currentMidSeniorLevel: 0, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 1, currentOtherArea: 0, futureTechnicalStaff: 0, futureOthers: 1, futureSpecify: 'Blacksmith' },
//   { id: 3, title: 'Welder', location: 'Salt', latitude: 30.5189218, longitude: 35.5736048, description: 'Performs welding and fabrication of metal structures.', currentTechnicalStaff: 0, currentOthers: 0, currentSpecify: '', considerYouth: 'Yes', expectEmployeeNeedNextYear: 'Yes', expectedJobVacancies: 1, currentInterns: 0, currentSeasonalEmployees: 0, currentEntryLevel: 1, currentMidSeniorLevel: 0, currentSeniorManagementLevel: 0, currentCustomerService: 0, currentSales: 0, currentIT: 0, currentMarketing: 0, currentAdministrativeStaff: 0, currentFinance: 0, currentOperationalStaff: 0, currentTechnicalStaffArea: 0, currentOtherArea: 0, futureTechnicalStaff: 0, futureOthers: 1, futureSpecify: 'Welder' }
// ];

// Initialize the map
const map = L.map('map').setView([31.9539, 35.9106], 7);

let isPickingCoordinates = false; // Track if we're in "Pick Coordinates" mode

// Add click event on the map to capture coordinates only if in "Pick Coordinates" mode
map.on('click', function (event) {
  if (isPickingCoordinates) {
    const { lat, lng } = event.latlng;

    // Display the coordinates in the text box
    const coordinatesBox = document.getElementById('coordinates');
    if (coordinatesBox) {
      coordinatesBox.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }

    // Exit "Pick Coordinates" mode after picking
    isPickingCoordinates = false;
    pickCoordinatesBtn.textContent = 'Pick Coordinates';
  }
});


// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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

async function makeAiQuery(inputString) {
  try {
      const response = await fetch("http://127.0.0.1:5002/ai_query", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: inputString })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response received:", responseData);
      return responseData;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}

function performAiSearch() {
  // Get the value from the input element with id "search"
  const searchInput = document.getElementById("search").value;

  // Call makeAiQuery with the input value
  makeAiQuery(searchInput).then(responseData => {
      // Process the response data as needed
      if (responseData) {
          console.log("AI Query Response:", responseData);
          // TODO: display results
      }
  });
}

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

document.getElementById("toggle-advanced-search").addEventListener("click", function () {
  const advancedSearchForm = document.getElementById("advanced-search-form");
  if (advancedSearchForm.style.display === "none" || advancedSearchForm.style.display === "") {
    advancedSearchForm.style.display = "block";
    this.textContent = "Hide Advanced Search";
  } else {
    advancedSearchForm.style.display = "none";
    this.textContent = "Show Advanced Search";
  }
});

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
main()

