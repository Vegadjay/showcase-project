// LocalStorage service to handle persistent data like likes, comments, etc

// Liked projects
export const getLikedProjects = (): number[] => {
  const likedProjects = localStorage.getItem('likedProjects');
  return likedProjects ? JSON.parse(likedProjects) : [];
};

export const toggleProjectLike = (projectId: number): boolean => {
  const likedProjects = getLikedProjects();
  const isLiked = likedProjects.includes(projectId);
  
  if (isLiked) {
    // Remove from liked projects
    const updatedLikes = likedProjects.filter(id => id !== projectId);
    localStorage.setItem('likedProjects', JSON.stringify(updatedLikes));
    return false;
  } else {
    // Add to liked projects
    likedProjects.push(projectId);
    localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
    return true;
  }
};

export const isProjectLiked = (projectId: number): boolean => {
  const likedProjects = getLikedProjects();
  return likedProjects.includes(projectId);
};

// Liked discussions
export const getLikedDiscussions = (): string[] => {
  const likedDiscussions = localStorage.getItem('likedDiscussions');
  return likedDiscussions ? JSON.parse(likedDiscussions) : [];
};

export const toggleDiscussionLike = (discussionId: string): boolean => {
  const likedDiscussions = getLikedDiscussions();
  const isLiked = likedDiscussions.includes(discussionId);
  
  if (isLiked) {
    // Remove from liked discussions
    const updatedLikes = likedDiscussions.filter(id => id !== discussionId);
    localStorage.setItem('likedDiscussions', JSON.stringify(updatedLikes));
    return false;
  } else {
    // Add to liked discussions
    likedDiscussions.push(discussionId);
    localStorage.setItem('likedDiscussions', JSON.stringify(likedDiscussions));
    return true;
  }
};

export const isDiscussionLiked = (discussionId: string): boolean => {
  const likedDiscussions = getLikedDiscussions();
  return likedDiscussions.includes(discussionId);
};

// User comments for projects
interface ProjectComment {
  id: string;
  projectId: number;
  text: string;
  author: string;
  date: string;
}

export const getProjectComments = (): ProjectComment[] => {
  const comments = localStorage.getItem('projectComments');
  return comments ? JSON.parse(comments) : [];
};

export const addProjectComment = (comment: Omit<ProjectComment, 'id' | 'date'>): ProjectComment => {
  const comments = getProjectComments();
  const newComment: ProjectComment = {
    ...comment,
    id: `pc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString()
  };
  
  comments.push(newComment);
  localStorage.setItem('projectComments', JSON.stringify(comments));
  return newComment;
};

export const getCommentsByProjectId = (projectId: number): ProjectComment[] => {
  const comments = getProjectComments();
  return comments.filter(comment => comment.projectId === projectId);
};

// Liked comments
export const getLikedComments = (): string[] => {
  const likedComments = localStorage.getItem('likedComments');
  return likedComments ? JSON.parse(likedComments) : [];
};

export const toggleCommentLike = (commentId: string): boolean => {
  const likedComments = getLikedComments();
  const isLiked = likedComments.includes(commentId);
  
  if (isLiked) {
    // Remove from liked comments
    const updatedLikes = likedComments.filter(id => id !== commentId);
    localStorage.setItem('likedComments', JSON.stringify(updatedLikes));
    return false;
  } else {
    // Add to liked comments
    likedComments.push(commentId);
    localStorage.setItem('likedComments', JSON.stringify(likedComments));
    return true;
  }
};

export const isCommentLiked = (commentId: string): boolean => {
  const likedComments = getLikedComments();
  return likedComments.includes(commentId);
};

// User comments for discussions
interface DiscussionComment {
  id: string;
  discussionId: string;
  text: string;
  author: string;
  date: string;
}

export const getDiscussionComments = (): DiscussionComment[] => {
  const comments = localStorage.getItem('discussionComments');
  return comments ? JSON.parse(comments) : [];
};

export const addDiscussionComment = (comment: Omit<DiscussionComment, 'id' | 'date'>): DiscussionComment => {
  const comments = getDiscussionComments();
  const newComment: DiscussionComment = {
    ...comment,
    id: `dc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString()
  };
  
  comments.push(newComment);
  localStorage.setItem('discussionComments', JSON.stringify(comments));
  return newComment;
};

export const getCommentsByDiscussionId = (discussionId: string): DiscussionComment[] => {
  const comments = getDiscussionComments();
  return comments.filter(comment => comment.discussionId === discussionId);
};

// User posted projects
export interface UserProject {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  timeline: string | { start: string; end: string; };
  techStack: string[];
  problemSolved: string;
  features: string[];
  developmentChallenges: string;
  imageUrls: string[];
  videoUrl?: string;
  links: {
    live: string;
    github?: string;
    twitter?: string;
  };
  owner: {
    name: string;
    avatar: string;
  };
  rating: number;
  createdAt: string;
  teamWork: boolean;
  comments: any[]; // We'll get comments from localStorage
}

export const getUserProjects = (): UserProject[] => {
  const projects = localStorage.getItem('userProjects');
  return projects ? JSON.parse(projects) : [];
};

export const addUserProject = (project: Omit<UserProject, 'id' | 'createdAt' | 'rating' | 'comments'>): UserProject => {
  const projects = getUserProjects();
  const newProject: UserProject = {
    ...project,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    rating: 0,
    comments: []
  };
  
  projects.push(newProject);
  localStorage.setItem('userProjects', JSON.stringify(projects));
  return newProject;
};

// User posted discussions
export interface UserDiscussion {
  id: string;
  title: string;
  text: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  replies: number;
}

export const getUserDiscussions = (): UserDiscussion[] => {
  const discussions = localStorage.getItem('userDiscussions');
  return discussions ? JSON.parse(discussions) : [];
};

export const addUserDiscussion = (discussion: Omit<UserDiscussion, 'id' | 'createdAt' | 'likes' | 'replies'>): UserDiscussion => {
  const discussions = getUserDiscussions();
  const newDiscussion: UserDiscussion = {
    ...discussion,
    id: `ud-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: 0
  };
  
  discussions.push(newDiscussion);
  localStorage.setItem('userDiscussions', JSON.stringify(discussions));
  return newDiscussion;
};