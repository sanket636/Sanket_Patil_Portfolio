export const profile = {
  name: 'Sanket Patil',
  location: 'Pune, Maharashtra, India',
  headline: 'Python Developer · Generative AI Intern · AI/ML · Data & Full-Stack',
  email: 'spatil09921@gmail.com',
  github: 'https://github.com/sanket636',
  linkedin: 'https://www.linkedin.com/in/sanket-vijaysinh-patil/',
  resume: '/Sanket_Patil_Resume.pdf',
  photo: '/images/sanket-profile.jpeg',
};

export const skillGroups = [
  { name: 'Programming', level: 'Hands-on', skills: ['Python', 'Java', 'C', 'C++', 'SQL'] },
  { name: 'Python Development', level: 'Hands-on', skills: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'REST APIs', 'API Integration', 'Pytest', 'Git', 'GitHub'] },
  { name: 'Python Development', level: 'Hands-on', skills: ['Celery', 'Redis', 'RabbitMQ'] },
  { name: 'AI & Machine Learning', level: 'Hands-on', skills: ['Generative AI', 'LLM API Integration', 'Prompt Engineering', 'Embeddings', 'RAG fundamentals', 'AI Output Validation', 'Pandas', 'NumPy', 'Scikit-learn'] },
  { name: 'AI & Machine Learning', level: 'Hands-on', skills: ['Supervised Learning', 'Classification', 'Regression', 'Data Preprocessing', 'Feature Engineering', 'Model Evaluation', 'Vector Search', 'LangChain', 'LangGraph', 'AI Agents', 'Workflow Automation'] },
  { name: 'Data Analytics', level: 'Hands-on', skills: ['Data Cleaning', 'Exploratory Data Analysis', 'Data Visualization', 'Power BI', 'DAX fundamentals', 'Power Query', 'Data Modeling', 'Dashboard Development', 'KPI Reporting', 'Excel fundamentals', 'Business Intelligence'] },
  { name: 'Data Engineering', level: 'Hands-on', skills: ['ETL/ELT fundamentals', 'Data Pipelines', 'Data Validation', 'Data Quality', 'PostgreSQL', 'MySQL', 'MongoDB', 'API-Based Data Ingestion', 'Data Transformation', 'Data Warehousing Concepts'] },
  { name: 'Data Engineering', level: 'Currently Learning', skills: ['Apache Spark', 'PySpark', 'Apache Kafka', 'Databricks', 'Batch Processing'] },
  { name: 'Full-Stack Development', level: 'Hands-on', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript fundamentals', 'Responsive Web Design', 'Authentication fundamentals'] },
  { name: 'Cloud & DevOps', level: 'Hands-on', skills: ['Microsoft Azure Fundamentals', 'AZ-900 concepts', 'AWS fundamentals', 'Amazon S3 fundamentals', 'AWS IAM fundamentals', 'Google Cloud fundamentals', 'Docker', 'GitHub Actions', 'CI/CD fundamentals', 'Linux fundamentals', 'Cloud Deployment', 'Environment Variables', 'Cloud Security fundamentals'] },
  { name: 'Databases', level: 'Hands-on', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Database Design', 'Normalization', 'Query Optimization fundamentals', 'Relational Databases', 'Vector Database Concepts'] },
];

export const projects = [
  { id: 'ml-prediction', category: 'AI/ML', title: 'Machine Learning Prediction & Analytics', status: 'Completed', description: 'A concept for a structured-data workflow covering preprocessing, predictions and model evaluation in a clear interface.', stack: ['Python', 'Pandas', 'Scikit-learn', 'FastAPI'], points: ['Data preprocessing and input validation', 'Prediction interface and evaluation metrics', 'Results visualisation'], link: '' },
  { id: 'rag-assistant', category: 'Generative AI', title: 'RAG-Based Intelligent Document Assistant', status: 'Completed', description: 'A document assistant concept that retrieves relevant passages and uses a language model to form grounded answers.', stack: ['Python', 'FastAPI', 'LLM APIs', 'Embeddings'], points: ['Document ingestion and chunking', 'Semantic retrieval with source references', 'Basic retrieval and answer evaluation'], link: '' },
  { id: 'sales-dashboard', category: 'Power BI', title: 'Sales Performance & BI Dashboard', status: 'Completed', description: 'A business intelligence dashboard concept using sample data to explore sales trends and product performance.', stack: ['Power BI', 'DAX', 'Power Query', 'SQL'], points: ['Revenue and profit trends', 'Product and regional analysis', 'KPI cards and interactive filters'], link: '' },
  { id: 'hr-dashboard', category: 'Power BI', title: 'HR Analytics & Workforce Insights', status: 'Completed', description: 'A sample-data dashboard concept for understanding workforce composition and high-level people trends.', stack: ['Power BI', 'DAX', 'Excel', 'SQL'], points: ['Department and employee distribution', 'Hiring and attrition trend views', 'Interactive filters'], link: '' },
  { id: 'easyshop', category: 'Full-Stack', title: 'Easyshop — E-commerce Application', status: 'Completed', description: 'A Python-based e-commerce application repository with Django-style project structure. Detailed user-facing features need verification from the running app and source files.', stack: ['Python', 'Django project structure', 'SQLite database file present'], points: ['Public repository contains application folders and manage.py', 'Repository includes a database file; runtime features have not been tested'], link: 'https://github.com/sanket636/Easyshop' },
  { id: 'task-manager', category: 'Full-Stack', title: 'Task Management & Productivity App', status: 'Completed', description: 'A proposed productivity app for organising tasks, tracking progress and viewing a compact dashboard.', stack: ['Python', 'Django / FastAPI', 'PostgreSQL', 'JavaScript'], points: ['Task creation and status tracking', 'Search and filtering', 'Responsive dashboard'], link: '' },
];

export const courses = [
  { title: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft', type: 'Professional certification', verify: 'https://www.certiport.com/portal/pages/credentialverification.aspx' },
  { title: 'Claude 101', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/54et78gvoijs' },
  { title: 'Claude Code 101', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/3jxk6s929gfo' },
  { title: 'Claude Platform 101', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/su6zibfvpi93' },
  { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/8ukano746cjw' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/65zrhk2f4s4f' },
  { title: 'Building with the Claude API', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/pzt3ksz47ryk' },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/7c9wtcreusw9' },
  { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/pxenw2z6neyq' },
  { title: 'AI Fluency for Educators', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/bsjdtd234rix' },
  { title: 'AI Fluency for Students', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/h7ym8x849gho' },
  { title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/u2xr266t4xub' },
  { title: 'Claude with Amazon Bedrock', issuer: 'Anthropic', type: 'Course completion', verify: 'https://verify.skilljar.com/c/gxwtcxnwy2ui' },
];

export const softSkills = ['Problem Solving', 'Analytical Thinking', 'Communication', 'Team Collaboration', 'Adaptability', 'Time Management', 'Continuous Learning', 'Documentation', 'Attention to Detail', 'Critical Thinking'];
export const interests = ['Exploring AI and emerging technologies', 'Building software projects', 'Learning Python and cloud technologies', 'Solving programming problems', 'Exploring developer tools'];
