# Hackathon2024CUBoulder

This project won first place at the CU Boulder 2024 Data Science Hackathon.  It is a localized job finder for the nation of Jordan.  It supports AI-powered natural language search in both English and Arabic as well as conventional advanced search capabilities.  It is a full-stack application.  Design and development took place over a mere 12 hours.

## Running this project

### Frontend

The project frontend is a web-based application.  Open "frontend/page.html" to get the frontend working.

### Backend

The backend is a little trickier.  It is a portable Flask application, so run ```python -m backend.backend``` from the root directory of the project.  There are a few dependencies that will need to be pip installed, which it may complain about first.  Once the project is working correctly, it'll appear as a typical flask application.  Refresh the frontend page, and it should populate with all jobs it can load.

### AI Search

AI search is powered with Open AI's GPT 4o Mini under the hood.  This means users will need an OpenAI API key in order for the application to work correctly.  This API key should live in backend/api_sk.txt and contain only the API key.

## Important Notes

This is a hackathon project afterall.  The code is messy and there are bugs.  Don't take this and try to use it as an end-user product.  In typical hackathon fashion, it should serve more as a blueprint or proof of concept for future projects.

### What *Works*
- AI search
- Coordinate selection
- Distance based search
- *Some* advanced search metrics
- The map controls themselves
- Population of data from the backend
- General backend functionality
- Opening up data for a given job

### Future Development
Attached are some suggestions for how to improve upon this project
- Use a scaleable data storage method.  For simplicity, we were merely loading the dataset into a pandas dataframe.  That was great for this project, but it will not hold under the stress of massive datasets.
- AI
  - This project is powered by OpenAI's GPT 4o Mini.  This model was chosen for it's affordable nature and speed.  That said, there may be other more efficient models that can be employed.
  - Specific models for Arabic, English, and any other languages.  Currently it is all translated by GPT 4o Mini
  - The AI prompt can be improved to mention all options for fields such as sector/subsector
  - The AI queries can interface with the distance backend for queries like "All jobs within 10 kilometers of some town that are retail"
  - AI could support more characteristics in its prompting
- Bug fixes to CRUD operations between the front and backends, which are sometimes finnicky
- Mobile compatibility
- Display of information for the job postings can be dressed up
- Profile tab/saving preferences and alerts
- Lazy loading/efficient loading of jobs
- General UI polish like number of search results, loading indication, better animations/effects
- Vector DB for search and information retrieval

### Known Bugs
- The create a job functionality may throw CORS errors and may not work because of this.  It was working at some points and is likely not far off
- Advanced search job results do not always populate correctly
- Some advanced search queries may not function correctly
