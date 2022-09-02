-- SQLBook: Code
-- Verify yumelio:yumelio_v3 on pg

BEGIN;
--& Update User
SELECT * FROM update_user('
				   {
				   "first_name": "Yumedo",
				   "last_name": "Test",
				   "email": "helloooo0000@world.com",
				   "password":"uaze*A0E#$!",
						  "id": 2
				   }');

--& Update Article
SELECT * FROM update_article('
				   {
				   "title": "My new article",
				   "id": 2
				   }');
                   
--& Update Project
SELECT * FROM update_project('
				   {
				   "title": "My new project",
				   "is_active": true,
				   "abstract": "Hey abstract",
				   "id": 3,
				   "user_id": 2
				   }');
    
--& Update Golden Book Ticket

SELECT * FROM update_gb_ticket('
				   {
				   "content": "My new project",
				   "id": 10,
				   "user_id": 7
				   }');
        
--& Update Category

SELECT * FROM update_category('
				   {
				   "color": "#000",
				   "id": 10
				   }');
ROLLBACK;
