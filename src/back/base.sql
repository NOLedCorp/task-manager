CREATE TABLE IF NOT EXISTS users (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Photo varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    GitHubLink varchar(255) NOT NULL,
    ClientContact varchar(255) NOT NULL,
    File varchar(255) NULL,
    CreateUserId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT project_user_fk FOREIGN KEY(CreateUserId) REFERENCES users(Id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS roles (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projectusers (
    Id int(20) PRIMARY KEY AUTO_INCREMENT,
	UserId int(20) NOT NULL,
    ProjectId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,
    Roles SET ('teamlead', 'clientmanager', 'designer', 'developer', 'tester') NOT NULL

    CONSTRAINT projectuser_user_fk FOREIGN KEY(UserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT projectuser_project_fk FOREIGN KEY(ProjectId) REFERENCES projects(Id) ON DELETE CASCADE,
    UNIQUE(UserId, ProjectId)
    
);

CREATE TABLE IF NOT EXISTS requirements (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    ProjectId int(20) NOT NULL,
    UserId int(20) NOT NULL,
    Description text NOT NULL,
    Status ENUM('proposed', 'active', 'resolved', 'testing', 'closed'),
    Priority ENUM('critical', 'high', 'medium', 'low'),
    CreateUserId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT task_createuser_fk FOREIGN KEY(CreateUserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT task_user_fk FOREIGN KEY(UserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT task_project_fk FOREIGN KEY(ProjectId) REFERENCES projects(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    ProjectId int(20) NOT NULL,
    UserId int(20) NOT NULL,
    RequirementId int(20) NOT NULL,
    Description text NOT NULL,
    PlanTime int(4) NULL,
    FactTime int(4) NULL,
    Type ENUM('task', 'bug'),
    Status ENUM('proposed', 'active', 'resolved', 'testing', 'closed'),
    Priority ENUM('critical', 'high', 'medium', 'low'),
    CreateUserId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT t_user_fk FOREIGN KEY(CreateUserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT t_u_fk FOREIGN KEY(UserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT t_project_fk FOREIGN KEY(ProjectId) REFERENCES projects(Id) ON DELETE CASCADE,
    CONSTRAINT t_requirement_fk FOREIGN KEY(RequirementId) REFERENCES requirements(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS links (
	ParentId int(20) NOT NULL,
    ChildId int(20) NOT NULL,
    Type ENUM('task', 'requirement'),
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT links_pk PRIMARY KEY(ParentId, ChildId)
    
);