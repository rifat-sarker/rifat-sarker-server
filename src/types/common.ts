// ENUM TYPES
export type ProjectCategory = "frontend" | "backend" | "fullstack" | "database";

export type BlogCategory =
  | "javascript"
  | "typescript"
  | "python"
  | "html"
  | "css"
  | "react"
  | "nodejs"
  | "nextjs"
  | "expressjs"
  | "mongodb"
  | "postgresql"
  | "mysql";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "management"
  | "teamwork";

// MODEL TYPES

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  description?: string | null;
  clientUrl?: string | null;
  serverUrl?: string | null;
  liveUrl?: string | null;
  image?: string | null;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  category: BlogCategory;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Skill = {
  id: string;
  name: string;
  icon?: string | null;
  category: SkillCategory;
  createdAt: Date;
  updatedAt: Date;
};
