/**
 * Modern Resume Theme
 * A clean, contemporary design with accent colors
 */

const ThemeModern = {
  props: {
    resumeData: {
      type: Object,
      required: true
    },
    photoUrl: {
      type: String,
      default: ''
    }
  },
  template: `
    <div class="resume-modern">
      <div class="resume-container">
        <!-- Two-column layout with modern styling -->
        <div class="resume-layout">
          <!-- Left sidebar -->
          <div class="sidebar">
            <!-- Profile photo and name -->
            <div class="profile-header">
              <div v-if="photoUrl" class="photo-container">
                <img :src="photoUrl" alt="Profile Photo" class="profile-photo">
              </div>
              <h1 class="profile-name">{{ resumeData.personalDetail.name }}</h1>
              <p class="profile-location">{{ resumeData.personalDetail.location }}</p>
            </div>
            
            <!-- Contact details -->
            <div class="contact-section">
              <h2 class="sidebar-heading">CONTACT</h2>
              <div class="contact-details">
                <p class="contact-item">{{ resumeData.personalDetail.phone }}</p>
                <p class="contact-item">{{ resumeData.personalDetail.email }}</p>
                <p v-if="resumeData.personalDetail.noticePeriod && resumeData.personalDetail.noticePeriod !== '-'" class="contact-item">
                  Notice: {{ resumeData.personalDetail.noticePeriod }}
                </p>
              </div>
            </div>
            
            <!-- Skills section -->
            <div class="skills-section">
              <h2 class="sidebar-heading">SKILLS</h2>
              <div v-for="(skillGroup, index) in resumeData.skills" :key="index" class="skill-group">
                <h3 class="skill-category">{{ skillGroup.category }}</h3>
                <ul class="skill-list">
                  <li v-for="(skill, i) in skillGroup.items" :key="i" class="skill-item">
                    {{ skill }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Main content -->
          <div class="main-content">
            <!-- Education section -->
            <div class="section education-section">
              <h2 class="content-heading">EDUCATION</h2>
              <div v-for="(edu, index) in resumeData.education" :key="index" class="education-item">
                <h3 class="edu-institution">{{ edu.institution }}</h3>
                <p class="edu-degree">{{ edu.degree }}</p>
                <p class="edu-date">{{ edu.date }}</p>
              </div>
            </div>
            
            <!-- Certificates section -->
            <div class="section certificate-section">
              <h2 class="content-heading">CERTIFICATIONS</h2>
              <div v-for="(cert, index) in resumeData.certificates" :key="index" class="certificate-item">
                <h3 class="cert-name">{{ cert.name }}</h3>
                <p class="cert-institution">{{ cert.institution }}</p>
                <p class="cert-date">{{ cert.date }}</p>
              </div>
            </div>
            
            <!-- Experience section -->
            <div class="section experience-section">
              <h2 class="content-heading">PROFESSIONAL EXPERIENCE</h2>
              <div v-for="(exp, index) in resumeData.experience" :key="index" class="experience-item">
                <div class="exp-header">
                  <h3 class="company-name">{{ exp.company }}</h3>
                  <p class="exp-duration">{{ exp.duration }}</p>
                </div>
                <p class="exp-position">{{ exp.position }}</p>
                <p class="exp-location">{{ exp.location }} | {{ exp.industry }}</p>
                
                <!-- Projects subsection -->
                <div v-if="exp.projects && exp.projects.length > 0" class="projects-container">
                  <div v-for="(project, pIndex) in exp.projects" :key="pIndex" class="project-item">
                    <p class="project-header">
                      {{ project.name }} <span class="project-period">{{ project.period }}</span>
                    </p>
                    <ul class="project-tasks">
                      <li v-for="(task, tIndex) in project.tasks" :key="tIndex" class="task-item">
                        {{ task }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Achievements section -->
            <div v-if="resumeData.achievements && resumeData.achievements.length > 0" class="section achievements-section">
              <h2 class="content-heading">ACHIEVEMENTS</h2>
              <div v-for="(achievement, index) in resumeData.achievements" :key="index" class="achievement-item">
                <h3 class="achievement-title">{{ achievement.title }}</h3>
                <p class="achievement-description">{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Register the component globally
Vue.component('theme-modern', ThemeModern);