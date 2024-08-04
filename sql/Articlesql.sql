use ChildGuardian;

create table ArticleDetails(
Id int identity(1,1) primary key,
DoctorId int,
Title varchar(100) not null,
Author Varchar(100) not null,
Form varchar(100) not null,
DateOfRelease date not null,
IsLiked bit DEFAULT 0,
ArticleUrl varchar(500),
ImageUrl varchar(500)
);
ALTER TABLE ArticleDetails
ALTER COLUMN IsLiked bit 
CREATE TABLE ArticleAuthors (
    ArticleId int,
	Id int identity(1,1) not null,
    FOREIGN KEY (ArticleId) REFERENCES ArticleDetails(Id),
	primary key(ArticleId),
    Name VARCHAR(100) NOT NULL
);
delete from ArticleDetails;

INSERT INTO ArticleDetails (DoctorId, Title, Author, Form, DateOfRelease, IsLiked)
VALUES
(0, 'The Importance of Sleep for Overall Health', 'Amanda White', 'PDF', '2023-04-05', 1),
(0, 'Advancements in Telemedicine Technologies', 'Robert Johnson', 'Word', '2022-11-20', 0),
(0, 'Healthy Eating Habits for Longevity', 'Jennifer Clark', 'Video', '2024-02-15', 1),
(1, 'The Impact of Exercise on Mental Health', 'John Smith', 'PDF', '2023-05-10', 1),
(2, 'Advancements in Cardiovascular Surgery', 'Emily Johnson', 'Word', '2022-09-15', 0),
(3, 'Nutritional Strategies for Diabetes Management', 'Michael Brown', 'Link', '2024-01-20', 1),
(4, 'New Therapies for Alzheimer''s Disease', 'Jessica Lee', 'Text', '2023-11-08', 1),
(5, 'Innovations in Cancer Treatment', 'Daniel Garcia', 'PDF', '2024-03-30', 0),
(6, 'The Role of Genetics in Obesity', 'Sarah Taylor', 'Video', '2023-07-02', 1);


UPDATE ArticleDetails
    SET 
        IsLiked=1
    WHERE Id = 1;

select * from ArticleDetails;
select * from ArticleAuthors;
drop table ArticleDetails;