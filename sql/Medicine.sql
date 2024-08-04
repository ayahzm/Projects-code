use ChildGuardian;

create table MedicineDetails(
Id INT identity(1,1) Primary key,
ParentId int not null,
Name varchar(100) not null,
ScheduleType varchar(100),
DosesPerWeek int,
IntervalHours int,
TimeToTake time,
Note varchar(250) not null,
Reminder int
);

INSERT INTO MedicineDetails (ParentId, Name, ScheduleType, DosesPerWeek, IntervalHours, TimeToTake, Note, Reminder)
VALUES
(1, 'Paracetamol', 'Fixed Time', NULL, NULL, '08:00:00', 'For fever', 1),
(1, 'Amoxicillin', 'Interval', NULL, 6, NULL, 'Antibiotic', 0),
(1, 'Ibuprofen', 'Fixed Time', NULL, NULL, '12:00:00', 'Pain relief', 1),
(1, 'Cetirizine', 'Interval', NULL, 8, NULL, 'Allergy relief', 0);



select * from MedicineDetails;
drop table MedicineDetails;