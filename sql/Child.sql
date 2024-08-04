use master;

create table ChildDetails(
Id int identity(1,1) primary key,
ParentId int,
FirstName varchar(100) not null,
LastName varchar(100) not null,
BirthYear int not null,
BloodType varchar(3) not null,
Weight int not null,
MedicalNotes varchar(300)
);

ALTER TABLE ChildDetails
ADD AvatarUrl VARCHAR(255);


ALTER PROC usp_AddNewChild
(
    @ParentId INT,
    @FirstName VARCHAR(100),
    @LastName VARCHAR(100),
    @BirthYear INT,
    @BloodType VARCHAR(3),
    @Weight INT,
    @MedicalNotes VARCHAR(300)
) 
AS 
BEGIN
    -- Check if any of the parameters are NULL or empty (except for MedicalNotes which might be optional)
    IF @ParentId IS NULL OR
       @FirstName IS NULL OR @FirstName = '' OR
       @LastName IS NULL OR @LastName = '' OR
       @BirthYear IS NULL OR
       @BloodType IS NULL OR @BloodType = '' OR
       @Weight IS NULL or @Weight =0
    BEGIN
        -- Exit the procedure if any required parameter is NULL or empty
        RETURN;
    END

    -- If all required parameters are non-NULL and non-empty, perform the insert
    INSERT INTO ChildDetails
    (
        ParentId, FirstName, LastName, BirthYear, BloodType, Weight, MedicalNotes
    )
    VALUES
    (
        @ParentId, @FirstName, @LastName, @BirthYear, @BloodType, @Weight, @MedicalNotes
    )
END


alter PROC usp_UpdateChild(
    @Id int,
    @FirstName varchar(100) ,
    @LastName varchar(100) ,
    @BirthYear int ,
    @BloodType varchar(3),
    @Weight int,
    @MedicalNotes varchar(300)
) 
AS 
BEGIN
    IF
       @FirstName IS NULL OR @FirstName = '' OR
       @LastName IS NULL OR @LastName = '' OR
       @BirthYear IS NULL OR
       @BloodType IS NULL OR @BloodType = '' OR
       @Weight IS NULL or @Weight =0
    BEGIN
        -- Exit the procedure if any required parameter is NULL or empty
        RETURN;
    END
    UPDATE ChildDetails
    SET 
        FirstName = @FirstName,
        LastName = @LastName,
        BirthYear = @BirthYear,
        BloodType = @BloodType,
        Weight = @Weight,
		MedicalNotes = @MedicalNotes
    WHERE Id = @Id;
END
exec usp_UpdateChild @Id=12, @FirstName='ayasss', @LastName='',@BirthYear=0,@BloodType='a',@Weight=9,@MedicalNotes='nonee';
CREATE PROCEDURE usp_DeleteChild
    @Id INT
AS
BEGIN
    DELETE FROM ChildDetails WHERE ID = @Id;
END

alter PROCEDURE usp_GetAllChildren(
@id int
)
AS
BEGIN
    SELECT * FROM ChildDetails
	where ParentId = @id;
END
delete from ChildDetails;
select * from ChildDetails;
drop table ChildDetails;