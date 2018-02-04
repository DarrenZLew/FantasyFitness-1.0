set PGPASSWORD=pass123
psql -U postgres < ffitness.sql
psql -U postgres ffitness < users.sql
