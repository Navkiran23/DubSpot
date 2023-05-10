insert into Users (email, username, major, standing, password)
values  ('den@joe.com', 'james', 'cs', 'junior', 418203912);

insert into Users (email, username, major, standing, password)
values  ('bens2@denas.com', 'lebron', 'CSE', 'senior', 231891223);

insert into HaveTaken (email, course_id)
values ('bens2@denas.com', '29c0b2f0-7cad-4784-af82-146fbd550b7e');

insert into HaveTaken (email, course_id)
values ('bens2@denas.com', 'eabcdd6e-3e41-4282-827c-1bea26086781');

insert into Reviews (course_id, username, rating, review)
values ('eabcdd6e-3e41-4282-827c-1bea26086781', 'lebron', 4, 'very fun class, nice and easy');

insert into Reviews (course_id, username, rating, review)
values ('29c0b2f0-7cad-4784-af82-146fbd550b7e', 'lebron', 3, 'stupid class, never take it');

insert into Reviews (course_id, username, rating, review)
values ('02a5a416-3b3d-4ae6-92c9-4ef0b9075c0d', 'darren', 4, 'this is a review');

insert into Reviews (course_id, username, rating, review)
values ('2a831596-aa97-49c3-ad0a-f91df4b69ef4', 'bobby', 3, 'this is another review');

insert into Reviews (course_id, username, rating, review)
values ('95de2977-35da-441d-9754-47762beafc84', 'robert', 4, 'this is a review by robert');

insert into Reviews (course_id, username, rating, review)
values ('eabcdd6e-3e41-4282-827c-1bea26086781', 'bob', 3, 'i took this class with lebron');
