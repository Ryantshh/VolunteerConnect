# **Volunteer Connect**

**Volunteer Connect** is a web application designed to bridge the gap between individuals seeking volunteer opportunities and organizations in need of support. By using a personalized recommendation system based on user interests and location, Volunteer Connect empowers users to discover meaningful volunteer activities and enables organizations to increase awareness for their causes.

## **Table of Contents**

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Deployment](#deployment)
4. [Usage](#usage)



## **Features**

- **User Sign-Up**: Create an account and go through onboarding to set up a personalized experience.
- **Onboarding & Questionnaire**: During sign-up, users fill out a questionnaire to indicate interests, skills, preferred locations, and availability.
- **Explore Page**: Get personalized volunteer recommendations based on interests, location, and availability.
- **Integrated Calendar**: Track and manage volunteer schedules; sync events with your availability.
- **Donation Page**: Support partner organizations by contributing directly to their causes and learning about ongoing projects.
- **Profile Management**: Update your interests, skills, availability, and view your volunteer history.
  
## **Project Structure**

```plaintext
volunteer-connect/
├── public/                   # Public assets
│   ├── admin/                # Admin-related components and functionality
│   ├── calendar/             # Components and assets for the calendar feature
│   ├── donation/             # Donation page components and resources
│   ├── explore/              # Components for the Explore page with volunteer opportunities
│   ├── loginBranch/          # Login functionality and related components
│   ├── Posting/              # Components related to posting new opportunities
│   ├── questionnaire/        # Questionnaire for gathering user interests and preferences
│   ├── build-config.js       # Build configuration for deployment and environment settings
│   └── index.html            # Landing HTML file
├── package.json              # Project metadata and dependencies
├── .gitignore                # Files and directories to ignore in Git
└── README.md                 # Project documentation.
```

## **Deployment**

The **Volunteer Connect** web app was deployed on **Netlify** to ensure a seamless and efficient hosting experience. Here’s how we deployed the project:

1. **Setting Up the Git Repository**
   - The project was first pushed to a Git repository on GitHub (you can also use GitLab or Bitbucket). This allowed us to integrate the repository with Netlify for automatic deployments.

2. **Logging into Netlify**
   - We logged into [Netlify](https://www.netlify.com/) and, from the dashboard, selected **"Add New Site"**, choosing the **"Import an existing project"** option.

3. **Connecting the Repository**
   - In Netlify, we linked our GitHub repository where **Volunteer Connect** is hosted.
   - Netlify then prompted us to select the specific repository for deployment.

4. **Configuring Build Settings**
   - For the deployment configuration:
     - **Build Command** was set to `npm run build` to create an optimized production build.
     - **Publish Directory** was set to `public`, as this is where our built files are located and ready for deployment.
   - These settings ensured that Netlify would correctly build and deploy the application from the specified directory.

5. **Adding Environment Variables**
   - Since **Volunteer Connect** uses Firebase, we added necessary Firebase environment variables in Netlify.
   - This was done by navigating to **Site Settings > Build & Deploy > Environment**, where we inputted our environment variables securely.

6. **Starting the Deployment**
   - We clicked **"Deploy Site"** to initiate the deployment. Netlify then built the project based on the configurations we provided and deployed the site.
   - The deployment process took a few minutes, during which Netlify automatically built and optimized our project.

7. **Accessing the Deployed Site**
   - After deployment, Netlify provided us with a live URL (e.g., `your-app-name.netlify.app`), which we used to access the app online.

8. **Continuous Deployment Setup**
   - Netlify set up **Continuous Deployment** automatically. Now, every time we push changes to our GitHub repository, Netlify detects the updates, rebuilds the project, and redeploys the site with the latest changes.

Netlify handled the DNS setup and provided an SSL certificate, ensuring our app is secure.

This deployment process on Netlify allows us to easily manage updates, environment variables, and custom domains, making it an ideal solution for hosting **Volunteer Connect**.

## **Usage**

This guide explains how to use each feature in **Volunteer Connect**.

### **User Sign-Up**
   - Go to the app's main page and click on the **Sign Up** button.
   - Enter your name, email, and create a password. You may also sign up using your Google account if available.
   - Once signed up, you will be directed to the onboarding process.

### **Onboarding & Questionnaire**
   - During onboarding, you’ll be guided through a questionnaire designed to understand your interests and skills.
   - **Indicate your interests**: Choose from various categories such as environmental conservation, education, healthcare, etc.
   - **Specify your skills**: Mention any skills that might be relevant for volunteering (e.g., teaching, medical assistance).
   - **Select your preferred location**: Enter your location in Postal Code.
   - **Availability**: Indicate days and times when you are generally available to volunteer. This information will help in tailoring opportunities to fit your schedule.

### **Explore Page**
   - Once you complete onboarding, navigate to the **Explore** page.
   - Here, you’ll see personalized volunteer opportunities based on your questionnaire responses under Your Top Matches.
   - Each opportunity card displays basic details such as the Title, location, description, and required skills.
   - **Filtering Options**: Use filters to refine your search by skill requirements, or Category.
   - **View Details**: Click on any opportunity to view additional details, including full descriptions, dates, a useful Map, Weekly Commitment and how to apply.

### **Integrated Calendar**
   - The **Calendar** feature allows you to track all the volunteering events you sign up for.
   - **Add Events**: When viewing an opportunity on the Explore page, you can add it to your calendar to keep track of it.
   - **Manage Availability**: Adjust your availability within the calendar if your schedule changes by removing events that don't fit your schdule.

### **Donation Page**
   - Go to the **Donation** page to view partner organizations looking for support.
   - Each organization has a brief description of its cause and projects, along with options for donating.
   - **Make a Donation**: Select an organization, click on **Donate**, and follow the steps to contribute securely.
  

### **Profile Management**
   - Access your profile by clicking on your user icon or name.
   - **Update Interests and Skills**: Edit your interests, skills, or location if your preferences change over time.
   - **Adjust Availability**: Update your availability to reflect your current schedule, ensuring future recommendations align with your free time.

### **Post Creation**
   - As a user, you have the ability to create posts for new volunteer opportunities.
   - Go to the **Explore** section and click Create a Post, you may include details such as:
     - **Title** of the opportunity.
     - **Description** providing an overview of the volunteer activity.
     - **Event Frequency** This can be set as recurring or one-time.
     - **Skills Required**,**Category** and **Location** to attract suitable volunteers.
     - **Dates and Times** the opportunity is available, if the opportunity is recurring, you must indicate which days of week its held as well as the start and end date. Else, if non recurring the date will be converted to a single day 
     - **Website or Social Link**
     - **Contact Email**
     - **Image** to showcase the opportunity.
     - Submit the post, which will then be reviewed by an admin for approval.

### **Admin Account**
   - The **Admin Account** has special privileges to manage posts submitted by users, access this function thorught the explore page, click on View Posts!.
   - **View Posts!**: Admins can view all submitted posts for volunteer opportunities.
   - **Approve Post or Deny Listings**: After reviewing, admins can click on approve posts to make them visible on the Explore page, or deny listings if they don’t meet the platform’s guidelines.
  

### **View Analytics**
 - Click on the **View Analytics** button to see data insights based on all current listings:
    - **Skills Distribution**: Displays the skills most commonly needed, assisting users in aligning their skills with in-demand areas.
    - **Days of the Week Required**: Shows which days most opportunities are available, helping users plan availability.

---

Each of these features is designed to create a seamless experience that helps you find and engage in volunteer opportunities that align with your skills, interests, and schedule. By using **Volunteer Connect**, you can easily discover and participate in meaningful activities that benefit the community.

