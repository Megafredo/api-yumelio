-- SQLBook: Code
-- Verify yumelio:yumelio_v1 on pg

BEGIN;

--& Check if tables exist in database
SELECT "id", "first_name", "last_name", "email", "password", "linkedin_url", "github_url", "instagram_url", "role_id" FROM "user";
SELECT "id", "name" FROM "role";
SELECT "id", "title", "abstract", "content", "order", "user_id" FROM "article";
SELECT "id", "title", "abstract", "content", "picture", "is_active", "date", "user_id", "link" FROM "project";
SELECT "id", "content",  "created_at", "user_id" FROM "gb_ticket";
SELECT "id", "name", "logo", "color" FROM "category";
SELECT "id", "project_id", "category_id" FROM "project_has_category";
SELECT "id", "article_id", "category_id" FROM "article_has_category";

ROLLBACK;
