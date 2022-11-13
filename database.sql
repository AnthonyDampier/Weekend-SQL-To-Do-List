CREATE TABLE "to_do_list" (
	"id" serial PRIMARY KEY,
	"favorite" boolean NOT NULL,
	"title" varchar(50) NOT NULL,
	"dueDate" DATE,
	"time" time,
	"isCompleted" boolean NOT NULL,
);
--
INSERT INTO "to_do_list" 
	("favorite", "title", "dueDate", "time", "isComplete) 
VALUES
	('false', 'ThingToDo1', '12-21-2021', '12:12', 'false'),
	('false', 'ThingToDo2', '12-13-2021', '16:12', 'false'),
	('false', 'ThingToDo3', '11-14-2021', '12:12', 'false'),
	('true', 'ThingToDo4', '10-12-2021', '15:12', 'true'),
	('true', 'ThingToDo5', '10-11-2021', '12:12', 'true'),
	('true', 'ThingToDo6', '3-1-2021', '14:12', 'false'),
	('true', 'ThingToDo7', '4-1-2021', '12:12', 'false')
;

