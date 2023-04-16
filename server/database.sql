CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL);

INSERT INTO "tasks"
("task")
VALUES
('Morning meditstion'),
('Drink 2.64 L of water during the day'),
('Write daily gratitude list'),
('Make a nutritious smoothie'),
('Do the yoga challenge for today'),
('Go outside for a walk');