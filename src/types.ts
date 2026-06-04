/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops";
  level: number; // 0-100
  experienceYears: number;
  icon: string;
  description: string;
}

export interface ArchitectureComponent {
  id: string;
  title: string;
  subtitle: string;
  type: "gateway" | "service" | "cache" | "database" | "queue" | "client";
  description: string;
  metric?: string;
  connections: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  architectureSummary: string;
  architectureDiagram: ArchitectureComponent[];
  challenges: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "unread" | "read" | "processed";
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  defaultResponse: string; // JSON string
}

export interface ConsoleLog {
  id: string;
  timestamp: string;
  type: "info" | "success" | "error" | "request" | "response";
  message: string;
  payload?: any;
}
