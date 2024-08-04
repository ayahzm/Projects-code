use master;
create table DoctorManagement(

ID INT IDENTITY(1,1) PRIMARY KEY,
FirstName VARCHAR(100) not null,
LastName VARCHAR(100) not null,
Major VARCHAR(100) not null,
University VARCHAR(100) not null,
Country VARCHAR(100) not null,
Gender VARCHAR(100) not null,
BirthYear INT not null,
Email VARCHAR(200) not null,
Password VARCHAR(200) not null,
YearOfGraduation INT,
MLN int not null,
Role VARCHAR(50) NOT NULL DEFAULT 'Doctor'
);


ALTER TABLE DoctorManagement
ADD AvatarUrl varchar(500);

CREATE PROCEDURE GetAllLicenses
AS
BEGIN
    SELECT MLN FROM DoctorManagement;
END

create table DrAccRequests(

ID INT IDENTITY(1,1) PRIMARY KEY,
FirstName VARCHAR(100) not null,
LastName VARCHAR(100) not null,
Major VARCHAR(100) not null,
University VARCHAR(100) not null,
Country VARCHAR(100) not null,
Gender VARCHAR(100) not null,
BirthYear INT not null,
Email VARCHAR(200) not null,
Password VARCHAR(200) not null,
YearOfGraduation INT,
MLN int not null,
Role VARCHAR(50) NOT NULL DEFAULT 'Doctor'
);
update DoctorManagement set Email='john.doe@gmail.com' where ID=3;
INSERT INTO DrAccRequests (FirstName, LastName, Major, University, Country, Gender, BirthYear, Email, Password, YearOfGraduation,MLN, Role)
VALUES 
('Sarah', 'Smith', 'Neurology', 'Stanford University', 'USA', 'Female', 1985, 'sara.smith@example.com', 'password123', 2010,1003, 'Doctor'),
('Alison', 'Johnson', 'Pediatrics', 'Johns Hopkins University', 'USA', 'Female', 1975, 'alison.johnson@example.com', 'password123',1500, 2000, 'Doctor'),
('Emily', 'Davis', 'Orthopedics', 'University of Cambridge', 'UK', 'Female', 1990, 'emily.davis@example.com', 'password123', 2015,23, 'Doctor'),
('Jessica', 'Wilson', 'Gastroenterology', 'University of Toronto', 'Canada', 'Female', 1988, 'jessica.wilson@example.com', 'password123', 2013,3332, 'Doctor');
('Daniel', 'Taylor', 'Ophthalmology', 'University of Melbourne', 'Australia', 'Male', 1978, 'daniel.taylor@example.com', 'password123', 2003,3000, 'Doctor'),
('Laura', 'Anderson', 'Oncology', 'University of Tokyo', 'Japan', 'Female', 1986, 'laura.anderson@example.com', 'password123', 2011,3033, 'Doctor'),
('James', 'Thomas', 'Psychiatry', 'University of Sydney', 'Australia', 'Male', 1992, 'james.thomas@example.com', 'password123', 2017,2344, 'Doctor'),
('Sarah', 'Moore', 'Endocrinology', 'McGill University', 'Canada', 'Female', 1981, 'sarah.moore@example.com', 'password123', 2006,1234, 'Doctor');

insert into DoctorManagement (FirstName, LastName, Major, University, Country, Gender, BirthYear, Email, Password, YearOfGraduation,MLN, Role) 
values('Admin','Admin','x','x','x','x',0,'Admin@gmail.com','password123',0,0,'Admin');

CREATE PROCEDURE usp_GetAllRequests
AS
BEGIN
    SELECT * FROM DrAccRequests;
END

alter PROCEDURE usp_AddDoctorToTeam
    @Email NVARCHAR(200),
	@Password NVarchar(200),
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Major NVARCHAR(100),
    @University NVARCHAR(100),
    @Country NVARCHAR(100),
    @Gender NVARCHAR(10),
    @BirthYear INT,
    @YearOfGraduation INT,
	@MLN int
AS
BEGIN
    INSERT INTO DoctorManagement (Email,Password, FirstName, LastName, Major, University, Country, Gender, BirthYear, YearOfGraduation,MLN)
    VALUES (@Email,@Password, @FirstName, @LastName, @Major, @University, @Country, @Gender, @BirthYear, @YearOfGraduation,@MLN);
END


CREATE PROC usp_LoginAsDoctor(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT *
	FROM DoctorManagement 
	WHERE Email= @Email AND Password=@Password;
END 
 
alter PROC usp_RegistrationAsDoctor(
@FirstName VARCHAR(100),
@LastName VARCHAR(100),
@Email VARCHAR(200),
@Password VARCHAR(200),
@Major VARCHAR(100),
@University VARCHAR(100),
@Country VARCHAR(100),
@Gender VARCHAR(100),
@BirthYear INT,
@YearOfGraduation INT,
@MLN int
) 
AS 
BEGIN
    INSERT INTO  
	DoctorManagement(Email,Password,FirstName,LastName,Major,University,Country,Gender,BirthYear,YearOfGraduation,MLN)
	VALUES(@Email,@Password,@FirstName,@LastName,@Major,@University,@Country,@Gender,@BirthYear,@YearOfGraduation,@MLN);
	
END 

alter PROC usp_SendAccRequest
(
    @FirstName VARCHAR(100),
    @LastName VARCHAR(100),
    @Email VARCHAR(200),
    @Password VARCHAR(200),
    @Major VARCHAR(100),
    @University VARCHAR(100),
    @Country VARCHAR(100),
    @Gender VARCHAR(100),
    @BirthYear INT,
    @YearOfGraduation INT,
	@MLN int
) 
AS 
BEGIN
    -- Check if any of the parameters are NULL or empty
    IF @FirstName IS NULL OR @FirstName = '' OR
       @LastName IS NULL OR @LastName = '' OR
       @Email IS NULL OR @Email = '' OR
       @Password IS NULL OR @Password = '' OR
       @Major IS NULL OR @Major = '' OR
       @University IS NULL OR @University = '' OR
       @Country IS NULL OR @Country = '' OR
       @Gender IS NULL OR @Gender = '' OR
       @BirthYear IS NULL OR
       @YearOfGraduation IS NULL or
	   @MLN is null
    BEGIN
        -- Exit the procedure if any parameter is NULL or empty
        RETURN;
    END

    -- If all parameters are non-NULL and non-empty, perform the insert
    INSERT INTO DrAccRequests
    (
        Email, Password, FirstName, LastName, Major, University, Country, Gender, BirthYear, YearOfGraduation,MLN
    )
    VALUES
    (
        @Email, @Password, @FirstName, @LastName, @Major, @University, @Country, @Gender, @BirthYear, @YearOfGraduation,@MLN
    )
END


alter PROC usp_UpdateDoctorInfo(
    @Id int,
    @Email VARCHAR(200),
    @FirstName VARCHAR(100),
    @LastName VARCHAR(100),
    @Major VARCHAR(100),
    @University VARCHAR(100),
    @Country VARCHAR(100),
	@BirthYear int,
	@YearOfGraduation int
) 
AS 
BEGIN
-- Check if any of the parameters are NULL or empty
    IF @FirstName IS NULL OR @FirstName = '' OR
       @LastName IS NULL OR @LastName = '' OR
       @Email IS NULL OR @Email = '' OR
       @Major IS NULL OR @Major = '' OR
       @University IS NULL OR @University = '' OR
       @Country IS NULL OR @Country = '' OR
       @BirthYear IS NULL OR
       @YearOfGraduation IS NULL
    BEGIN
        -- Exit the procedure if any parameter is NULL or empty
        RETURN;
    END
    UPDATE DoctorManagement
    SET 
	    Email =@Email,
        FirstName = @FirstName,
        LastName = @LastName,
        Major = @Major,
        University = @University,
        Country = @Country,
		BirthYear = @BirthYear,
		YearOfGraduation = @YearOfGraduation
    WHERE Id = @Id;
END

alter PROC usp_UpdateDrPass(
    @Id int,
    @Password varchar(200)
) 
AS 
BEGIN
IF
       @Password IS NULL OR @Password = ''
    BEGIN
        -- Exit the procedure if any parameter is NULL or empty
        RETURN;
    END
    UPDATE DoctorManagement
    SET 
        Password = @Password

    WHERE Id = @Id;
END

CREATE PROCEDURE usp_DeleteRequest
    @Id INT
AS
BEGIN
    DELETE FROM DrAccRequests WHERE ID = @Id;
END

EXEC usp_DeleteRequest @Id = 1;

select * from ParentManagement;
delete from DrAccRequests;
select * from DoctorManagement;
drop table DoctorManagement;
	