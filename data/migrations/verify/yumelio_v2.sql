-- Verify yumelio:yumelio_v2 on pg

BEGIN;

SELECT * FROM create_user('
				   {
				   "first_name": "Test",
				   "last_name": "Test",
				   "email": "hello@world.com",
				   "password":"u*A0E#$!"
				   }');

SELECT * FROM create_article('
				   {
				   "title": "Un article",
				   "abstract": "Test insert article",
				   "content": "Bla bla bla",
				   "user_id": 1
				   }');

SELECT * FROM create_project('
				   {
				   "title": "Un article",
				   "abstract": "Test insert article",
				   "content": "Bla bla bla",
				   "picture":"http://truc.com",
				   "date": "15 Janvier 2022",
				   "link":"http://truc.com",
				   "user_id": 3
				   }');

SELECT * FROM create_gb_ticket(
'
	{
	"content": "You are so cool Fredo",
	"user_id": 3
	}
	');                 

SELECT * FROM category(
'
	{
	"name": "Nodejs",
	"logo": "nodejs",
	"color": "blue"
	}
	');

ROLLBACK;
