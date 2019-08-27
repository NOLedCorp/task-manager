export interface Project{
    Id:number;
    Name:string;
    GitHubLink:string;
    ClientContact:string;
    File:string;
    CreateUserId: number;
    CreateDate: Date;
}

export interface ProjectUser{
    Id:string;
    Photo:string;
    Name:string;
    Roles:Set<Roles>;
}

export interface Task{
    Id: number;
    Name: string;
    UserId: number;
    ProjectId: number;
    RequirementId: number;
    Description: string;
    PlanTime: number;
    FactTime: number;
    Type:TaskTypes;
    Status:StatusTypes;
    Priority: PriorityTypes;
    CreateUserId: number;
    CreateDate: Date;
}

export interface Requirement{
    Id: number;
    Name: string;
    UserId: number;
    ProjectId: number;
    Description: string;
    Status:StatusTypes;
    Priority: PriorityTypes;
    CreateUserId: number;
    CreateDate: Date;
}

export enum Roles{
    TeamLead = 1,
    ClientManager = 2,
    Designer = 3,
    Developer = 4,
    Tester = 5
}


export enum TaskTypes{
    Task = 1,
    Bug = 2
}

export enum StatusTypes{
    Proposed = 1,
    Active = 2,
    Resolved = 3,
    Testing = 4,
    Closed = 5
}

export enum PriorityTypes{
    Critical = 1,
    High = 2,
    Medium = 3,
    Low = 4
}