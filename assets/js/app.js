// Main Resume Generator Component
const ResumeGenerator = {
  template: `
    <div class="resume-generator">
      <div class="header">
        <h1>Resume Generator</h1>
        <p>Create your professional resume in minutes</p>
      </div>
      
      <div class="main-container">
        <!-- Left panel: Settings -->
        <div class="settings-panel">
          <div class="theme-selector">
            <h2>Choose Theme</h2>
            <div class="theme-options">
              <button 
                v-for="theme in availableThemes" 
                :key="theme.id"
                :class="{ active: selectedTheme === theme.id }"
                @click="selectedTheme = theme.id"
              >
                {{ theme.name }}
              </button>
            </div>
          </div>
          
          <div class="photo-upload">
            <h2>Upload Photo</h2>
            <input 
              type="file" 
              accept="image/*" 
              @change="handlePhotoUpload"
            >
          </div>
          
          <div class="section-editor">
            <h2>Edit Sections</h2>
            <div class="section-tabs">
              <button 
                v-for="section in sections" 
                :key="section.id"
                :class="{ active: activeSection === section.id }"
                @click="activeSection = section.id"
              >
                {{ section.label }}
              </button>
            </div>
            
            <div class="editor-container">
              <!-- Personal details editor -->
              <div v-if="activeSection === 'personalDetail'" class="personal-editor">
                <div class="form-group" v-for="(value, key) in editableData.personalDetail" :key="key">
                  <label>{{ formatLabel(key) }}</label>
                  <input type="text" v-model="editableData.personalDetail[key]">
                </div>
              </div>
              
              <!-- Education editor -->
              <div v-if="activeSection === 'education'" class="education-editor">
                <div v-for="(item, index) in editableData.education" :key="index" class="item-editor">
                  <div class="item-header">
                    <h3>Education #{{ index + 1 }}</h3>
                    <button @click="removeItem('education', index)" class="remove-btn">Remove</button>
                  </div>
                  <div class="form-group">
                    <label>Institution</label>
                    <input type="text" v-model="item.institution">
                  </div>
                  <div class="form-group">
                    <label>Degree</label>
                    <input type="text" v-model="item.degree">
                  </div>
                  <div class="form-group">
                    <label>Date</label>
                    <input type="text" v-model="item.date">
                  </div>
                </div>
                <button @click="addItem('education')" class="add-btn">Add Education</button>
              </div>
              
              <!-- Certificates editor -->
              <div v-if="activeSection === 'certificates'" class="certificates-editor">
                <div v-for="(item, index) in editableData.certificates" :key="index" class="item-editor">
                  <div class="item-header">
                    <h3>Certificate #{{ index + 1 }}</h3>
                    <button @click="removeItem('certificates', index)" class="remove-btn">Remove</button>
                  </div>
                  <div class="form-group">
                    <label>Institution</label>
                    <input type="text" v-model="item.institution">
                  </div>
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" v-model="item.name">
                  </div>
                  <div class="form-group">
                    <label>Date</label>
                    <input type="text" v-model="item.date">
                  </div>
                </div>
                <button @click="addItem('certificates')" class="add-btn">Add Certificate</button>
              </div>
              
              <!-- Skills editor -->
              <div v-if="activeSection === 'skills'" class="skills-editor">
                <div v-for="(item, index) in editableData.skills" :key="index" class="item-editor">
                  <div class="item-header">
                    <h3>Skill Group #{{ index + 1 }}</h3>
                    <button @click="removeItem('skills', index)" class="remove-btn">Remove</button>
                  </div>
                  <div class="form-group">
                    <label>Category</label>
                    <input type="text" v-model="item.category">
                  </div>
                  <div class="form-group">
                    <label>Skills (one per line)</label>
                    <textarea 
                      v-model="skillsTextareas[index]" 
                      @input="updateSkillItems(index)"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <button @click="addSkillGroup" class="add-btn">Add Skill Group</button>
              </div>
              
              <!-- Experience editor -->
              <div v-if="activeSection === 'experience'" class="experience-editor">
                <div v-for="(item, index) in editableData.experience" :key="index" class="item-editor">
                  <div class="item-header">
                    <h3>Experience #{{ index + 1 }}</h3>
                    <button @click="removeItem('experience', index)" class="remove-btn">Remove</button>
                  </div>
                  <div class="form-group">
                    <label>Company</label>
                    <input type="text" v-model="item.company">
                  </div>
                  <div class="form-group">
                    <label>Duration</label>
                    <input type="text" v-model="item.duration">
                  </div>
                  <div class="form-group">
                    <label>Position</label>
                    <input type="text" v-model="item.position">
                  </div>
                  <div class="form-group">
                    <label>Location</label>
                    <input type="text" v-model="item.location">
                  </div>
                  <div class="form-group">
                    <label>Industry</label>
                    <input type="text" v-model="item.industry">
                  </div>
                  
                  <!-- Projects subeditor -->
                  <div class="projects-section">
                    <h4>Projects</h4>
                    <div v-for="(project, pIndex) in item.projects" :key="pIndex" class="project-editor">
                      <div class="item-header">
                        <h5>Project #{{ pIndex + 1 }}</h5>
                        <button @click="removeProject(index, pIndex)" class="remove-btn small">Remove</button>
                      </div>
                      <div class="form-group">
                        <label>Name</label>
                        <input type="text" v-model="project.name">
                      </div>
                      <div class="form-group">
                        <label>Period</label>
                        <input type="text" v-model="project.period">
                      </div>
                      <div class="form-group">
                        <label>Tasks (one per line)</label>
                        <textarea 
                          v-model="projectTextareas[index] && projectTextareas[index][pIndex]" 
                          @input="updateProjectTasks(index, pIndex)"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <button @click="addProject(index)" class="add-btn small">Add Project</button>
                  </div>
                </div>
                <button @click="addExperience" class="add-btn">Add Experience</button>
              </div>
              
              <!-- Achievements editor -->
              <div v-if="activeSection === 'achievements'" class="achievements-editor">
                <div v-for="(item, index) in editableData.achievements" :key="index" class="item-editor">
                  <div class="item-header">
                    <h3>Achievement #{{ index + 1 }}</h3>
                    <button @click="removeItem('achievements', index)" class="remove-btn">Remove</button>
                  </div>
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" v-model="item.title">
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="item.description" rows="3"></textarea>
                  </div>
                </div>
                <button @click="addItem('achievements')" class="add-btn">Add Achievement</button>
              </div>
            </div>
          </div>
          
          <div class="download-section">
            <button @click="downloadResume" class="download-btn">Download Resume</button>
          </div>
        </div>
        
        <!-- Right panel: Preview -->
        <div class="preview-panel">
          <div class="preview-header">
            <h2>Preview</h2>
          </div>
          <div class="preview-container">
            <component 
              :is="'theme-' + selectedTheme" 
              :resume-data="editableData"
              :photo-url="photoUrl"
            ></component>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      selectedTheme: 'default',
      activeSection: 'personalDetail',
      photoUrl: '',
      skillsTextareas: [],
      projectTextareas: [],
      availableThemes: [
        { id: 'default', name: 'Default' },
        { id: 'modern', name: 'Modern' },
        { id: 'minimal', name: 'Minimal' }
      ],
      sections: [
        { id: 'personalDetail', label: 'Personal' },
        { id: 'education', label: 'Education' },
        { id: 'certificates', label: 'Certificates' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'achievements', label: 'Achievements' }
      ],
      editableData: {
        personalDetail: {
          name: 'Afif Maahi Bin Abu Bakar',
          location: 'Bachok, Kelantan, Malaysia',
          phone: '0145106293',
          email: 'afifmaahi92@gmail.com',
          noticePeriod: '-'
        },
        education: [
          {
            institution: 'KOLEJ POLY TECH MARA IPOH',
            degree: 'Bsc (Hons) in Multimedia Computing Collaboration With Coventry University',
            date: 'December 2017'
          },
          {
            institution: 'KOLEJ PROFESIONAL MARA BERANANG',
            degree: 'Higher National Diploma in Software Development',
            date: 'December 2014'
          }
        ],
        certificates: [
          {
            institution: 'COURSERA',
            name: 'Introduction to Java',
            date: 'January 2023'
          },
          {
            institution: 'COURSERA',
            name: 'Foundation Of User Experience (UX) Design collaboration with Google',
            date: 'January 2023'
          }
        ],
        skills: [
          {
            category: 'JAVA Skill Set',
            items: [
              'Basic Java',
              'Basic MVC',
              'Basic Spring framework',
              'Mysql'
            ]
          },
          {
            category: 'Game Development Skillset',
            items: [
              'Unity Editor 2022.3.7f1',
              'C# Scripting',
              'Event Driven Programming (C#)',
              'Coroutines (C#)',
              'Physics (C#)',
              'Animation (C#)',
              'UI Development (C#)',
              'Solo Development',
              'Agile Methodology',
              'Audacity 3.42(Sound)',
              'Adobe After Effect (2D Video)',
              'Adobe Photoshop 2023 (2D Graphic)',
              'Adobe Illustrator 2023 (2D Graphic)'
            ]
          },
          {
            category: 'Web Design Skillset',
            items: [
              'HTML',
              'CSS',
              'Laravel Framework',
              'Javascript',
              'Mysql'
            ]
          }
        ],
        experience: [
          {
            company: 'Iwafs Sdn Bhd',
            duration: 'December 2023 – Present',
            position: 'Software Developer',
            location: 'Remote (Seri Kembangan, Selangor)',
            industry: 'Software Development',
            projects: [
              {
                name: 'Food Safety Information System of Malaysia (Fosim)',
                period: 'December 2023 – April 2024',
                tasks: [
                  'Debugging',
                  'Data Patching',
                  'Coding and Development'
                ]
              },
              {
                name: 'Promotional Video for Xugoe KickStarter Campaign',
                period: 'May 2024 – August 2024',
                tasks: [
                  'Video Interlacing',
                  'Video Effect',
                  'Video Compositing'
                ]
              }
            ]
          },
          {
            company: 'Kiyo Software Tech lab Enterprise',
            duration: 'May 2023 - Present',
            position: 'Software Developer',
            location: 'Remote (Ipoh, Perak)',
            industry: 'Software Development, Game Development, Video Editing',
            projects: [
              {
                name: 'Micro Credential Universiti Poly-Tech Malaysia',
                period: 'May 2023 – August 2023',
                tasks: [
                  'Website Development',
                  'Website Design',
                  'Graphic Design',
                  'Client Communication and Collaboration',
                  'Requirement Evaluation',
                  'Project lead'
                ]
              },
              {
                name: 'E-Buku Dislek',
                period: 'August 2023 – November 2023',
                tasks: [
                  'Project Lead',
                  'Requirement Evaluation',
                  'Game 2D Interface',
                  'Game Development',
                  'Simple Game Mechanic',
                  'Game Animation',
                  'Sound Design'
                ]
              }
            ]
          }
        ],
        achievements: [
          {
            title: 'Arcana The Lost World',
            description: 'Achieved a Gold Medal at the ICompex 2017 National Invention and Competition. This project showcased a 3D game developed using C++ visual programming in Unreal Engine.'
          },
          {
            title: 'PanRoom',
            description: 'Secured a Bronze Medal at the International Eureka Innovation Exhibition 2017. The project involved creating a 3D game utilizing C++ visual programming in Unreal Engine.'
          }
        ]
      }
    };
  },
  created() {
    // Initialize text areas for skills
    this.initializeSkillsTextareas();
    this.initializeProjectTextareas();
  },
  methods: {
    // Format labels by capitalizing and adding spaces
    formatLabel(key) {
      return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
    },
    
    // Photo upload handler
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.photoUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    // Initialize textareas for skills
    initializeSkillsTextareas() {
      this.skillsTextareas = this.editableData.skills.map(skill => 
        skill.items.join('\n')
      );
    },
    
    // Initialize textareas for project tasks
    initializeProjectTextareas() {
      this.projectTextareas = this.editableData.experience.map(exp => 
        exp.projects.map(project => project.tasks.join('\n'))
      );
    },
    
    // Update skill items from textarea
    updateSkillItems(index) {
      const lines = this.skillsTextareas[index].split('\n').filter(line => line.trim() !== '');
      this.editableData.skills[index].items = lines;
    },
    
    // Update project tasks from textarea
    updateProjectTasks(expIndex, projectIndex) {
      if (!this.projectTextareas[expIndex]) {
        this.projectTextareas[expIndex] = [];
      }
      
      const lines = this.projectTextareas[expIndex][projectIndex].split('\n').filter(line => line.trim() !== '');
      this.editableData.experience[expIndex].projects[projectIndex].tasks = lines;
    },
    
    // Add new item to a section
    addItem(section) {
      if (section === 'education') {
        this.editableData.education.push({ institution: '', degree: '', date: '' });
      } else if (section === 'certificates') {
        this.editableData.certificates.push({ institution: '', name: '', date: '' });
      } else if (section === 'achievements') {
        this.editableData.achievements.push({ title: '', description: '' });
      }
    },
    
    // Add a new skill group
    addSkillGroup() {
      this.editableData.skills.push({ category: '', items: [] });
      this.skillsTextareas.push('');
    },
    
    // Add a new experience
    addExperience() {
      this.editableData.experience.push({
        company: '',
        duration: '',
        position: '',
        location: '',
        industry: '',
        projects: []
      });
      this.projectTextareas.push([]);
    },
    
    // Add a new project to an experience
    addProject(expIndex) {
      if (!this.editableData.experience[expIndex].projects) {
        this.editableData.experience[expIndex].projects = [];
      }
      
      this.editableData.experience[expIndex].projects.push({
        name: '',
        period: '',
        tasks: []
      });
      
      if (!this.projectTextareas[expIndex]) {
        this.projectTextareas[expIndex] = [];
      }
      
      this.projectTextareas[expIndex].push('');
    },
    
    // Remove item from a section
    removeItem(section, index) {
      this.editableData[section].splice(index, 1);
      
      if (section === 'skills') {
        this.skillsTextareas.splice(index, 1);
      } else if (section === 'experience') {
        this.projectTextareas.splice(index, 1);
      }
    },
    
    // Remove a project from an experience
    removeProject(expIndex, projectIndex) {
      this.editableData.experience[expIndex].projects.splice(projectIndex, 1);
      this.projectTextareas[expIndex].splice(projectIndex, 1);
    },
    
    // Download resume
    downloadResume() {
      alert('In a complete implementation, this would generate and download a PDF of your resume.');
    }
  }
};