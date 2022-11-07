export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string | undefined;
    password: string;
    linkedin_url: string;
    github_url: string;
    instagram_url: string;
    role: string;
  };
  
  //~ Schemas
  
  //& Article
  export interface ArticleSchema {
    title: string;
    abstract: string;
    content: string;
  }
  
  //& Category
  export interface CategorySchema {
    name: string;
    logo: string;
    color?: string;
  }
  
  //& GoldenBookTicket
  export interface GoldenBookTicketSchema {
    content: string;
  }
  
  //& Project
  export interface ProjectSchema {
    title: string;
    abstract: string;
    content: string;
    picture: string;
    is_active?: boolean;
    date: string;
    link?: string;
    categories?: object[];
  }
  
  //& User
  export interface UserSchema {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    linkedin_url: string;
    github_url: string;
    instagram_url: string;
  }
  
  