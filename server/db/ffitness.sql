DROP DATABASE IF EXISTS ffitness;
CREATE DATABASE ffitness;

\c ffitness;


CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"hash" TEXT NOT NULL,
	"salt" TEXT NOT NULL,
	"bio" TEXT
);

CREATE TABLE "activities" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"points" integer,
	"type" TEXT,
	"units" TEXT,
	"source" TEXT NOT NULL,
	CONSTRAINT activities_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "leagues" (
	"id" serial NOT NULL,
	"startdate" DATE NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT leagues_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "user_activitylist" (
	"id" serial NOT NULL,
	"user" integer NOT NULL,
	"activity" integer NOT NULL,
	"active" boolean NOT NULL,
	CONSTRAINT user_activitylist_pk PRIMARY KEY ("id")
) WITH (
	OIDS=FALSE
);

ALTER TABLE "user_activitylist" ADD CONSTRAINT single_user_activitylist UNIQUE ("user", activity, active);


CREATE TABLE "user_activity_day" (
	"id" serial NOT NULL,
	"user" integer NOT NULL,
	"activity" integer NOT NULL,
	"day" DATE NOT NULL,
	"amount" FLOAT,
	"active" boolean,
	CONSTRAINT user_activity_day_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user_activity_day" ADD CONSTRAINT single_user_activity_day UNIQUE ("user", activity, day);


CREATE TABLE "user_league" (
	"id" serial NOT NULL,
	"user" integer NOT NULL,
	"league" integer NOT NULL,
	"security level" TEXT,
	CONSTRAINT user_league_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "activity_league" (
	"id" serial NOT NULL,
	"activity" integer NOT NULL,
	"league" integer NOT NULL,
	"points" integer,
	CONSTRAINT activity_league_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "matchups" (
	"user_league" integer NOT NULL,
	"startdate" DATE NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "user_activity_day" ADD CONSTRAINT "user_activity_day_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "user_activity_day" ADD CONSTRAINT "user_activity_day_fk1" FOREIGN KEY ("activity") REFERENCES "activities"("id");

ALTER TABLE "user_league" ADD CONSTRAINT "user_league_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "user_league" ADD CONSTRAINT "user_league_fk1" FOREIGN KEY ("league") REFERENCES "leagues"("id");

ALTER TABLE "activity_league" ADD CONSTRAINT "activity_league_fk0" FOREIGN KEY ("activity") REFERENCES "activities"("id");
ALTER TABLE "activity_league" ADD CONSTRAINT "activity_league_fk1" FOREIGN KEY ("league") REFERENCES "leagues"("id");

ALTER TABLE "matchups" ADD CONSTRAINT "matchups_fk0" FOREIGN KEY ("user_league") REFERENCES "user_league"("id");