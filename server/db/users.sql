INSERT INTO users (id, name, email, hash, salt) VALUES
(1, 'Alex', 'faff@faff.faff', '', ''),
(2, 'Darren', 'not@an.email', '', ''),
(3, 'Michael', 'like@an.email', '', '');

INSERT INTO activities (id, name, points, type, units, source) VALUES
(1, 'Push Ups', 10, 'interval', NULL, 'exercise'),
(2, 'HS Push Ups', 50, 'interval', NULL, 'exercise'),
(3, 'Pull Ups', 50, 'interval', NULL, 'exercise'),
(4, 'Air Squats', 5, 'interval', NULL, 'exercise'),
(5, 'Distance Ran', 1000, 'interval', 'Miles', 'exercise'),
(6, 'Distance Swam', 3500, 'interval', 'Miles', 'exercise'),
(7, 'Distance Cycled', 400, 'interval', 'Miles', 'exercise'),
(8, 'Distance Rowed', 400, 'interval', 'Meters', 'exercise'),
(9, 'One Minute Planks', 200, 'interval', NULL, 'exercise'),
(10, 'Low Intensity', 5000, 'timer', NULL, 'exercise'),
(11, 'High Intensity', 7000, 'timer', NULL, 'exercise'),
(12, 'Sports', 3500, 'timer', NULL, 'exercise'),
(13, 'Nutrition', 1000, NULL, NULL, 'bonus'),
(14, 'Stretching', 1000, NULL, NULL, 'bonus'),
(15, 'Tabata', 1500, NULL, NULL, 'bonus');

INSERT INTO user_activity_day ("user", activity, day, amount, active) VALUES
(1, 2, to_date('20171104', 'YYYYMMDD'), 100, true),
(1, 1, to_date('20171103', 'YYYYMMDD'), 10, true),
(1, 1, to_date('20171124', 'YYYYMMDD'), 10, true),
(1, 2, to_date('20171105', 'YYYYMMDD'), 10, false),
(1, 4, to_date('20171105', 'YYYYMMDD'), 2, false),
(1, 5, to_date('20171105', 'YYYYMMDD'), 10, false),
(1, 6, to_date('20171105', 'YYYYMMDD'), 50, true),
(1, 7, to_date('20171105', 'YYYYMMDD'), 50, false),
(1, 9, to_date('20171105', 'YYYYMMDD'), 50, true),
(1, 10, to_date('20171105', 'YYYYMMDD'), 50, false),
(1, 11, to_date('20171105', 'YYYYMMDD'), 10, true),
(1, 12, to_date('20171105', 'YYYYMMDD'), 70, true),
(1, 13, to_date('20171105', 'YYYYMMDD'), 0, true),
(1, 15, to_date('20171105', 'YYYYMMDD'), 0, true);

--INSERT INTO activity_league (id, name, points, type, units, source) VALUES
--(1, 'Push Ups', 10, 'interval', NULL, 'exercise'),
--(2, 'HS Push Ups', 50, 'interval', NULL, 'exercise'),
--(3, 'Pull Ups', 50, 'interval', NULL, 'exercise'),
--(4, 'Air Squats', 5, 'interval', NULL, 'exercise'),
--(5, 'Distance Ran', 1000, 'interval', 'Miles', 'exercise'),
--(6, 'Distance Swam', 3500, 'interval', 'Miles', 'exercise'),
--(7, 'Distance Cycled', 400, 'interval', 'Miles', 'exercise'),
--(8, 'Distance Rowed', 400, 'interval', 'Meters', 'exercise'),
--(9, 'One Minute Planks', 200, 'interval', NULL, 'exercise'),
--(10, 'Low Intensity', 5000, 'timer', NULL, 'exercise'),
--(11, 'High Intensity', 7000, 'timer', NULL, 'exercise'),
--(12, 'Sports', 3500, 'timer', NULL, 'exercise'),
--(13, 'Nutrition', 1000, NULL, NULL, 'bonus'),
--(14, 'Stretching', 1000, NULL, NULL, 'bonus'),
--(15, 'Tabata', 1500, NULL, NULL, 'bonus');
