/**
 * Minimal Resume Theme
 * A clean, minimalist design with ample whitespace
 */

const ThemeMinimal = {
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
    <div class="resume-minimal">
      <div class="resume-container">
        <!-- Header with name and contact info -->
        <div class="resume-header">
          <h1 class="resume-name">{{ resumeData.personalDetail.name }}</h1>
          <div class="contact-info">
            <span>{{ resumeData.personalDetail.location }}</span>
            <span class="separator">•</span>
            <span>{{ resumeData.personalDetail.phone }}</span>
            <span class="separator">•</span>
            <span>{{ resumeData.personalDetail.email }}</span>
          </div>
          
          <!-- Profile photo (centered) -->
          <div v-if="photoUrl" class="photo-container">
            <img :src="photoUrl" alt="Profile Photo" class="profile-photo">
          </div>
        </div>
        
        <!-- Two-column layout for content -->
        <div class="resume-content">
          <!-- Left column -->
          <div class="column">
            <!-- Education section -->
            <div class="section">
              <h2 class="section-heading">EDUCATION</h2>
              <div v-for="(edu, index) in resumeData.education" :key="index" class="content-item">
                <h3 class="item-title">{{ edu.institution }}</h3>
                <p class="item-detail">{{ edu.degree }}</p>
                <p class="item-meta">{{ edu.date }}</p>
              </div>
            </div>
            
            <!-- Certificates section -->
            <div class="section">
              <h2 class="section-heading">CERTIFICATIONS</h2>
              <div v-for="(cert, index) in resumeData.certificates" :key="index" class="content-item">
                <p class="cert-line">
                  <strong>{{ cert.name }}</strong> - {{ cert.institution }} ({{ cert.date }})
                </p>
              </div>
            </div>
            
            <!-- Skills section -->
            <div class="section">
              <h2 class="section-heading">SKILLS</h2>
              <div v-for="(skillGroup, index) in resumeData.skills" :key="index" class="content-item">
                <h3 class="item-title">{{ skillGroup.category }}</h3>
                <p class="skills-list">{{ skillGroup.items.join(', ') }}</p>
              </div>
            </div>
          </div>
          
          <!-- Right column -->
          <div class="column">
            <!-- Experience section -->
            <div class="section">
              <h2 class="section-heading">PROFESSIONAL EXPERIENCE</h2>
              <div v-for="(exp, index) in resumeData.experience" :key="index" class="content-item">
                <div class="exp-header">
                  <h3 class="item-title">{{ exp.company }}</h3>
                  <span class="item-meta">{{ exp.duration }}</span>
                </div>
                <p class="exp-position">{{ exp.position }}</p>
                <p class="exp-meta">{{ exp.location }} | {{ exp.industry }}</p>
                
                <!-- Projects summary -->
                <div v-if="exp.projects && exp.projects.length > 0" class="projects-summary">
                  <ul class="project-list">
                    <li v-for="(project, pIndex) in exp.projects" :key="pIndex" class="project-item">
                      <strong>{{ project.name }}</strong> ({{ project.period }})
                      <span v-if="project.tasks && project.tasks.length > 0" class="project-brief">
                        : {{ project.tasks.slice(0, 2).join('; ') }}{{ project.tasks.length > 2 ? '...' : '' }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Achievements section -->
            <div v-if="resumeData.achievements && resumeData.achievements.length > 0" class="section">
              <h2 class="section-heading">ACHIEVEMENTS</h2>
              <div v-for="(achievement, index) in resumeData.achievements" :key="index" class="content-item">
                <p class="achievement-title"><strong>{{ achievement.title }}</strong></p>
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
Vue.component('theme-minimal', ThemeMinimal);