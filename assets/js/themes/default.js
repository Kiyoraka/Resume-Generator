/**
 * Default Resume Theme
 * Based on Afif Maahi's Resume
 */

const ThemeDefault = {
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
    <div class="resume-default">
      <div class="resume-container">
        <!-- Two-column layout -->
        <div class="resume-layout">
          <!-- Left column -->
          <div class="left-column">
            <!-- Photo section -->
            <div v-if="photoUrl" class="photo-container">
              <img :src="photoUrl" alt="Profile Photo" class="profile-photo">
            </div>
            
            <!-- Personal details section -->
            <div class="section personal-section">
              <h2 class="section-title">PERSONAL DETAIL</h2>
              <div class="personal-details">
                <div class="detail-item">
                  <span class="detail-label">NAME:</span>
                  <span class="detail-value">{{ resumeData.personalDetail.name }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">LOCATION:</span>
                  <span class="detail-value">{{ resumeData.personalDetail.location }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">HP NO:</span>
                  <span class="detail-value">{{ resumeData.personalDetail.phone }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">EMAIL:</span>
                  <span class="detail-value">{{ resumeData.personalDetail.email }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">NOTICE PERIOD:</span>
                  <span class="detail-value">{{ resumeData.personalDetail.noticePeriod }}</span>
                </div>
              </div>
            </div>
            
            <!-- Skills section -->
            <div class="section skills-section">
              <h2 class="section-title">SKILL AND SOFTWARE</h2>
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
          
          <!-- Right column -->
          <div class="right-column">
            <!-- Education section -->
            <div class="section education-section">
              <h2 class="section-title">EDUCATION</h2>
              <div v-for="(edu, index) in resumeData.education" :key="index" class="education-item">
                <h3 class="institution">{{ edu.institution }}</h3>
                <p class="degree">{{ edu.degree }}</p>
                <p class="date">{{ edu.date }}</p>
              </div>
            </div>
            
            <!-- Certificates section -->
            <div class="section certificate-section">
              <h2 class="section-title">CERTIFICATE</h2>
              <div v-for="(cert, index) in resumeData.certificates" :key="index" class="certificate-item">
                <h3 class="cert-institution">{{ cert.institution }}</h3>
                <p class="cert-name">{{ cert.name }}</p>
                <p class="cert-date">{{ cert.date }}</p>
              </div>
            </div>
            
            <!-- Experience section -->
            <div class="section experience-section">
              <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
              <div v-for="(exp, index) in resumeData.experience" :key="index" class="experience-item">
                <div class="exp-header">
                  <h3 class="company">{{ exp.company }}</h3>
                  <p class="duration">{{ exp.duration }}</p>
                </div>
                <p class="position"><strong>Position:</strong> {{ exp.position }}</p>
                <p class="location"><strong>Location:</strong> {{ exp.location }}</p>
                <p class="industry"><strong>Industry:</strong> {{ exp.industry }}</p>
                
                <!-- Projects subsection -->
                <div v-if="exp.projects && exp.projects.length > 0" class="projects-container">
                  <h4 class="projects-title">Projects:</h4>
                  <div v-for="(project, pIndex) in exp.projects" :key="pIndex" class="project-item">
                    <p class="project-name">
                      <strong>{{ project.name }}</strong> ({{ project.period }})
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
              <h2 class="section-title">ACHIEVEMENT</h2>
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
Vue.component('theme-default', ThemeDefault);