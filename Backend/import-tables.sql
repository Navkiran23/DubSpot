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
