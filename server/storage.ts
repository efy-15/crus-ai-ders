import { 
  users, 
  type User, 
  type InsertUser,
  teamMembers,
  type TeamMember, 
  type InsertTeamMember,
  projects,
  type Project, 
  type InsertProject,
  contactSubmissions,
  type ContactSubmission, 
  type InsertContactSubmission,
  ideaSubmissions,
  type IdeaSubmission, 
  type InsertIdeaSubmission,
  workshopRegistrations,
  type WorkshopRegistration, 
  type InsertWorkshopRegistration
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team members methods
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  // Projects methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Idea submission methods
  createIdeaSubmission(submission: InsertIdeaSubmission): Promise<IdeaSubmission>;
  getIdeaSubmissions(): Promise<IdeaSubmission[]>;
  
  // Workshop registration methods
  createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration>;
  getWorkshopRegistrations(): Promise<WorkshopRegistration[]>;
  
  // Newsletter subscription
  subscribeToNewsletter(email: string): Promise<void>;
  getNewsletterSubscribers(): Promise<string[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teamMembersMap: Map<number, TeamMember>;
  private projectsMap: Map<number, Project>;
  private contactSubmissionsMap: Map<number, ContactSubmission>;
  private ideaSubmissionsMap: Map<number, IdeaSubmission>;
  private workshopRegistrationsMap: Map<number, WorkshopRegistration>;
  private newsletterSubscribers: Set<string>;
  
  private userCurrentId: number;
  private teamMemberCurrentId: number;
  private projectCurrentId: number;
  private contactSubmissionCurrentId: number;
  private ideaSubmissionCurrentId: number;
  private workshopRegistrationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.teamMembersMap = new Map();
    this.projectsMap = new Map();
    this.contactSubmissionsMap = new Map();
    this.ideaSubmissionsMap = new Map();
    this.workshopRegistrationsMap = new Map();
    this.newsletterSubscribers = new Set();
    
    this.userCurrentId = 1;
    this.teamMemberCurrentId = 1;
    this.projectCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    this.ideaSubmissionCurrentId = 1;
    this.workshopRegistrationCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Initialize with sample data
  private initializeSampleData() {
    // Add sample team members
    const sampleTeamMembers: InsertTeamMember[] = [
      {
        name: "Prathap Chandran",
        role: "EVP of Data",
        bio: "Shapes Loadsure's data and AI vision-governing data quality, scaling AI initiatives, and enabling every department to build with confidence.",
        skills: ["Data Strategy", "AI Enablement", "Insurance Innovation"],
        linkedinUrl: "#",
        githubUrl: "#",
        imageUrl: "/images/team/researcher.svg",
      },
      {
        name: "Estefany Montoya",
        role: "Machine Learning Engineer",
        bio: "Builds AI-powered systems that drive automation, accuracy, and agility across Loadsure's core products and processes.",
        skills: ["AI Solutions", "Scalability", "Research"],
        linkedinUrl: "#",
        twitterUrl: "#",
        imageUrl: "/images/team/ethics.svg",
      },
      {
        name: "Lisanne Teschner",
        role: "Customer Experience Rep – Operations",
        bio: "Acts as the voice of the user, ensuring AI tools and processes are intuitive, accessible, and impactful in day-to-day operations.",
        skills: ["User Advocacy", "AI Adoption", "Operational Insights"],
        linkedinUrl: "#",
        githubUrl: "#",
        imageUrl: "/images/team/engineer.svg",
      },
    ];

    
    sampleTeamMembers.forEach(member => this.createTeamMember(member));
    
    // Add sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "AI Accessibility Framework",
        description: "An open-source framework designed to make AI tools accessible to developers with limited resources.",
        category: "Research",
        year: "2023",
        githubUrl: "#",
        externalUrl: "#",
      },
      {
        title: "Ethics in AI Toolkit",
        description: "Comprehensive resources to help organizations implement ethical guidelines in their AI development.",
        category: "Tool",
        year: "2022",
        githubUrl: "#",
        externalUrl: "#",
      },
      {
        title: "Community AI Training",
        description: "Free training program bringing AI education to underserved communities and emerging economies.",
        category: "Education",
        year: "2023",
        externalUrl: "#",
      },
    ];
    
    sampleProjects.forEach(project => this.createProject(project));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Team members methods
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembersMap.values());
  }
  
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembersMap.get(id);
  }
  
  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.teamMemberCurrentId++;
    const teamMember: TeamMember = { ...member, id };
    this.teamMembersMap.set(id, teamMember);
    return teamMember;
  }
  
  // Projects methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const newProject: Project = { ...project, id };
    this.projectsMap.set(id, newProject);
    return newProject;
  }
  
  // Contact submission methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionCurrentId++;
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissionsMap.set(id, newSubmission);
    return newSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissionsMap.values());
  }
  
  // Idea submission methods
  async createIdeaSubmission(submission: InsertIdeaSubmission): Promise<IdeaSubmission> {
    const id = this.ideaSubmissionCurrentId++;
    const newSubmission: IdeaSubmission = { 
      ...submission, 
      id,
      createdAt: new Date() 
    };
    this.ideaSubmissionsMap.set(id, newSubmission);
    return newSubmission;
  }
  
  async getIdeaSubmissions(): Promise<IdeaSubmission[]> {
    return Array.from(this.ideaSubmissionsMap.values());
  }
  
  // Workshop registration methods
  async createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const id = this.workshopRegistrationCurrentId++;
    const newRegistration: WorkshopRegistration = { 
      ...registration, 
      id,
      createdAt: new Date() 
    };
    this.workshopRegistrationsMap.set(id, newRegistration);
    return newRegistration;
  }
  
  async getWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
    return Array.from(this.workshopRegistrationsMap.values());
  }
  
  // Newsletter subscription
  async subscribeToNewsletter(email: string): Promise<void> {
    this.newsletterSubscribers.add(email);
  }
  
  async getNewsletterSubscribers(): Promise<string[]> {
    return Array.from(this.newsletterSubscribers);
  }
}

export const storage = new MemStorage();
