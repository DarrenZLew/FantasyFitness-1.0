INSERT INTO users (id, name, email, hash, salt) VALUES
(1, 'Alex', 'faff@faff.faff', '', ''),
(2, 'Darren', 'not@an.email', '', '');

INSERT INTO activities (id, name) VALUES
(1, 'Long walks on the beach'),
(2, 'Pull ups but underwater');

INSERT INTO user_activity_day ("user", activity, day, amount) VALUES
(1, 1, to_date('20171105', 'YYYYMMDD'), 2),
(1, 2, to_date('20171105', 'YYYYMMDD'), 9001),
(1, 2, to_date('20171104', 'YYYYMMDD'), 100),
(1, 1, to_date('20171103', 'YYYYMMDD'), 10);