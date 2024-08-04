use master;
create table ParentManagement(

ID INT IDENTITY(1,1) PRIMARY KEY,
MotherFname VARCHAR(100) not null,
MotherLname VARCHAR(100) not null,
FatherFname VARCHAR(100) not null,
FatherLname VARCHAR(100) not null,
PhoneNumber INT not null,
Email VARCHAR(200) not null,
Password VARCHAR(200) not null,
Address VARCHAR(300) not null,
AvatarUrl varchar(500),
Role VARCHAR(50) NOT NULL DEFAULT 'Parent'
);


create proc UpdateAvatar(
@Id int,
@AvatarUrl varchar(500)
)
as 
begin
      UPDATE ParentManagement
    SET 
        AvatarUrl = @AvatarUrl
    WHERE Id = @Id;
END

CREATE PROC usp_Login(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT Email,Password
	FROM ParentManagement 
	WHERE Email= @Email AND Password=@Password

	UNION ALL
    
    -- Check in the second table (Doctor)
    SELECT Email,Password
    FROM DoctorManagement
    WHERE Email = @Email AND Password = @Password;
END 

ALTER PROC usp_Login(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT Email, Password, Role
    FROM ParentManagement 
    WHERE Email = @Email AND Password = @Password AND Role = 'Parent'

    UNION ALL

    SELECT Email, Password, Role
    FROM DoctorManagement
    WHERE Email = @Email AND Password = @Password AND (Role = 'Doctor' or Role='Admin');
END

alter PROC usp_GetUserInfo(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT ID,Email,Password,MotherFname,MotherLname,FatherFname,FatherLname,PhoneNumber,Address,AvatarUrl,Role
    FROM  ParentManagement
    WHERE Email = @Email AND Password = @Password AND Role = 'Parent'

END

alter PROC usp_GetUserInfo2(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT ID,Email,Password, FirstName, LastName, Major, University, Country, Gender, BirthYear, YearOfGraduation,MLN,AvatarUrl,Role 
    FROM DoctorManagement
    WHERE Email = @Email AND Password = @Password AND Role = 'Doctor';
END

alter PROC usp_GetUserInfo3(
@Email VARCHAR(200),
@Password VARCHAR(200)
) 
AS 
BEGIN
    SELECT ID,Email,Password,AvatarUrl,Role 
    FROM DoctorManagement
    WHERE Email = @Email AND Password = @Password AND Role = 'Admin';
END


 
alter PROC usp_Registration
(
    @Email VARCHAR(200),
    @Password VARCHAR(200),
    @MotherFname VARCHAR(100),
    @MotherLname VARCHAR(100),
    @FatherFname VARCHAR(100),
    @FatherLname VARCHAR(100),
    @PhoneNumber INT, 
    @Address VARCHAR(300)
) 
AS 
BEGIN
    -- Check if any of the parameters are NULL or empty
    IF @Email IS NULL OR @Email = '' OR
       @Password IS NULL OR @Password = '' OR
       @MotherFname IS NULL OR @MotherFname = '' OR
       @MotherLname IS NULL OR @MotherLname = '' OR
       @FatherFname IS NULL OR @FatherFname = '' OR
       @FatherLname IS NULL OR @FatherLname = '' OR
       @PhoneNumber IS NULL OR
       @Address IS NULL OR @Address = ''
    BEGIN
        -- Exit the procedure if any parameter is NULL or empty
        RETURN;
    END

    -- If all parameters are non-NULL and non-empty, perform the insert
    INSERT INTO ParentManagement
    (
        Email, Password, MotherFname, MotherLname, FatherFname, FatherLname, PhoneNumber, Address
    )
    VALUES
    (
        @Email, @Password, @MotherFname, @MotherLname, @FatherFname, @FatherLname, @PhoneNumber, @Address
    )
END



alter PROC usp_UpdateParent(
    @Email VARCHAR(200),
    @MotherFname VARCHAR(100),
	@MotherLname VARCHAR(100),
    @FatherFname VARCHAR(100),
    @FatherLname VARCHAR(100),
    @PhoneNumber INT,
    @Address VARCHAR(300)
) 
AS 
BEGIN
       IF @Email IS NULL OR @Email = '' OR
       @MotherFname IS NULL OR @MotherFname = '' OR
       @MotherLname IS NULL OR @MotherLname = '' OR
       @FatherFname IS NULL OR @FatherFname = '' OR
       @FatherLname IS NULL OR @FatherLname = '' OR
       @PhoneNumber IS NULL OR @PhoneNumber =0 or
       @Address IS NULL OR @Address = ''
    BEGIN
        -- Exit the procedure if any parameter is NULL or empty
        RETURN;
    END
    UPDATE ParentManagement
    SET 
        MotherFname = @MotherFname,
        FatherFname = @FatherFname,
        FatherLname = @FatherLname,
        PhoneNumber = @PhoneNumber,
        Address = @Address
    WHERE Email = @Email;
END
update ParentManagement set Email='hala@gmail.com' where ID=1;
alter PROC usp_UpdatePass(
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

    UPDATE ParentManagement
    SET 
        Password = @Password

    WHERE Id = @Id;
END
EXEC usp_GetUserInfo @Email = 'hala' , @Password = '';

delete from ParentManagement where Id=2;

CREATE PROCEDURE GetAllEmails
AS
BEGIN
    SELECT Email FROM ParentManagement
    UNION
    SELECT Email FROM DoctorManagement;
END



select * from ParentManagement;
drop table ParentManagement;
	