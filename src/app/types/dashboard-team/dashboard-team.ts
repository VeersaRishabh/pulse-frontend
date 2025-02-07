export interface TeamMemberType {
  id: number;
  name: string;
  designation: string;
  profilePicture: string;
  email: string;
  department: string;
  location: string;
  joinedDate: string | Date;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  status: 'available' | 'in-meeting' | 'away' | 'offline';
  currentProject?: string;
}
