# Phase 1 — Define the Project Scope

## Objective

Clearly define what the tool should and should not do.

## Tasks

Define search limitations:

- Select geographical area:
    - City
    - Province/state
    - Country

- Set maximum number of leads to collect

- Define target industries:
    - Restaurants
    - Local shops
    - Freelancers
    - Service businesses
    - Other small businesses

- Define what information should be collected

- Ensure all collected data is:
    - Stored locally
    - Easily exportable
    - Human-readable
    - Limited to necessary information only

## Possible Information

### Business Information
- Business name
- Business category
- Location
- Website URL (if available)

### Contact Information
- Public business email
- Public business phone number
- Contact page URL

### Online Presence
- Social media links (if available)
- Website quality indicators
- Online presence score

### Analysis Information
- Website problems
- Improvement opportunities
- Potential client score

## Success Criteria

- [ ] Clear definition of target businesses
- [ ] Clear definition of collected information
- [ ] Clear privacy and data limitations
- [ ] Defined project boundaries

---

# Phase 2 — Research Data Sources

## Objective

Determine where business information can legally and reliably be collected.

## Tasks

Research legal considerations:

- Understand what information can legally be collected
- Identify restrictions on automated data collection
- Avoid collecting unnecessary personal information
- Avoid collecting private or restricted data
- Understand website terms of service limitations

Research possible data sources:

- Search engines
- Public business directories
- Industry-specific directories
- Public business websites
- Other publicly available sources

Evaluate each source:

- Reliability
- Data quality
- Amount of available information
- Legal limitations
- Stability

## Success Criteria

- [ ] Legal considerations researched
- [ ] Reliable sources identified
- [ ] Data limitations documented

---

# Phase 3 — Design the Lead Information Structure

## Objective

Create a consistent format for storing collected business leads.

## Tasks

Define lead structure:

# Business Information

- Business name
- Industry/category
- Location
    - City
    - Region
    - Country

- Website URL
- Website available:
    - Yes
    - No

# Contact Information

- Public business email
- Public business phone number
- Contact page available:
    - Yes
    - No

# Website Information

(if website exists)

- Website quality score
- Website problems
- Improvement opportunities
- Technical observations

Examples:

- Not mobile friendly
- Slow loading
- Outdated design
- Missing features
- Poor accessibility

# Lead Evaluation

- Potential score
- Priority level
- Notes
- Contact status

Possible statuses:

- Not contacted
- Contacted
- Interested
- Follow-up needed
- Client acquired
- Rejected

## Success Criteria

- [ ] Storage structure designed
- [ ] Storage method chosen
- [ ] Local storage system created

---

# Phase 4 — Build the Lead Collection System

## Objective

Create a system that can automatically find potential businesses.

## Tasks

The system should:

- Search businesses based on selected criteria
- Collect relevant business information
- Avoid unnecessary data collection
- Respect source limitations
- Avoid aggressive scraping behavior

The system should support:

- Location filtering
- Industry filtering
- Maximum lead limits
- Duplicate detection

## Success Criteria

- [ ] Basic data collection system
- [ ] Filtering system
- [ ] Duplicate prevention
- [ ] Basic user interface

---

# Phase 5 — Build the Website Analysis System

## Objective

Determine whether a business website represents a potential opportunity.

## Tasks

Analyze websites for:

### Technical Quality

- Website availability
- HTTPS/security
- Loading speed
- Mobile compatibility
- Broken links

### Design Quality

- Modern design indicators
- User experience
- Navigation quality
- Visual consistency

### Business Features

- Contact form
- Online booking
- Menu/service pages
- Social media integration
- Important missing features

## Success Criteria

- [ ] Website analyzer can identify common problems
- [ ] Problems are stored with each lead
- [ ] Analysis results are understandable to humans

---

# Phase 6 — Create Lead Scoring System

## Objective

Automatically prioritize the most valuable opportunities.

## Tasks

Create a scoring system based on:

## Positive Indicators

Increase score:

- No website
- Outdated website
- Poor mobile experience
- Slow website
- Missing contact options
- Poor user experience
- Missing business features

## Negative Indicators

Decrease score:

- Modern professional website
- Strong online presence
- Large company size
- Advanced web systems already available

Example:
```plaintext
Website Score: 0-100

+50 No website  
+20 Outdated design  
+15 Not mobile friendly  
+10 No HTTPS  
+10 Slow loading  
+10 No contact form  
+10 No social links

-10 Professional website  
-20 Strong online presence  
-50 Large company unlikely to need student services
```


## Additional Evaluation

The system should estimate:

- Is this a realistic client for a student?
- Is the business too large?
- Is the potential reward worth the effort?

## Success Criteria

- [ ] Automatic score generation
- [ ] Basic client suitability evaluation
- [ ] Leads ranked by priority

---

# Phase 7 — Export and Organize Leads

## Objective

Make collected information easy to review and manage.

## Tasks

Create export options:

- CSV export
- JSON export
- Local database storage
- Local web dashboard

Dashboard should allow:

- Viewing leads
- Filtering leads
- Editing information
- Adding notes
- Tracking outreach progress

## Success Criteria

- [ ] Local dashboard created
- [ ] Data export works
- [ ] Local database implemented
- [ ] Leads can be managed manually

---

# Phase 8 — Manual Client Outreach Process

## Objective

Convert researched leads into real customers.

## Tasks

For each selected business:

- Review their business personally
- Review website problems
- Identify possible improvements
- Write personalized outreach messages
- Provide value before asking for a sale

Track:

- Contacted
- Interested
- Follow-up required
- Meeting scheduled
- Client acquired

## Dashboard Improvements

Add:

- Client management section
- Outreach history
- Notes
- Follow-up reminders

## Optional AI Assistance

Create an AI assistant that can:

- Generate email drafts
- Personalize messages based on lead data
- Suggest improvements
- Summarize website problems

## Success Criteria

- [ ] Outreach workflow defined
- [ ] Message templates created
- [ ] Lead tracking system completed
- [ ] Optional AI assistance integrated
