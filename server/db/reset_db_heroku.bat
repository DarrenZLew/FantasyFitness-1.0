set PGPASSWORD=459409fe317f7376a132f742bbe4c042e614cbe8e0c74cb51a3ef9ed6a036acd

psql -U aylskjtowimugr -h ec2-23-21-158-253.compute-1.amazonaws.com -p 5432 -d d5taeltbegfvs7 < ffitnessHeroku.sql
psql -U aylskjtowimugr -h ec2-23-21-158-253.compute-1.amazonaws.com -p 5432 -d d5taeltbegfvs7 < users.sql