use ChildGuardian;

create table QuestionDetails(
Id int identity(1,1) primary key,
ParentId int not null,
DoctorId int,
ChildId int not null,
QuestionContent varchar(400) not null,
Answer varchar(400)
);

INSERT INTO QuestionDetails (ParentId, ChildId,DoctorId, QuestionContent, Answer)
VALUES
(5, 2,3, 'What are the signs of a fever in a child?', 'High temperature (over 100.4°F or 38°C), sweating or shivering, flushed face, irritability or fussiness, reduced appetite, difficulty sleeping'),
(6, 3,1, 'How can I tell if my child has an ear infection?', 'Pulling or tugging at the ear, irritability or fussiness, trouble sleeping, difficulty hearing or responding to quiet sounds, fluid draining from the ear, fever'),
(7, 4,4, 'What should I do if my child has a rash?', 'Check for accompanying symptoms like fever or itching. Keep the area clean and dry. If the rash persists or spreads, consult a pediatrician.'),
(8, 1,3, 'How can I help my child with asthma manage their symptoms?', 'Monitor and avoid triggers like allergens or cold air. Ensure they take prescribed medications correctly. Teach them how to use inhalers or nebulizers. Have an action plan in case of an asthma attack.');

INSERT INTO QuestionDetails (ParentId, DoctorId, ChildId, QuestionContent, Answer)
VALUES
(1, 2, 1, 'How often should my child take the medicine?', 'Your child should take the medicine three times a day.'),
(1, 2, 2, 'What are the side effects of this medicine?', 'Common side effects include drowsiness and nausea.'),
(2, 3, 3, 'Is it safe to give this medicine with food?', 'Yes, it is safe to take this medicine with food.'),
(2, 4, 4, 'How should I store this medicine?', 'Store the medicine in a cool, dry place away from direct sunlight.');
(3, 105, 205, 'What should I do if my child misses a dose?', 'If your child misses a dose, give it as soon as you remember. If it is almost time for the next dose, skip the missed dose and continue with the regular schedule.');


delete from QuestionDetails where QuestionContent='How can I tell if my child has an ear infection?'; 
select * from QuestionDetails;
drop table QuestionDetails;
