-- SQLBook: Code
-- Revert yumelio:yumelio_v1 from pg

BEGIN;

DROP INDEX
"category_brin_idx",
"gb_ticket_brin_idx",
"project_brin_idx",
"article_brin_idx";

DROP TABLE 
"article_has_category", 
"project_has_category", 
"category", 
"gb_ticket", 
"project", 
"article", 
"role", 
"user";

DROP DOMAIN 
EMAIL, 
PWD, 
LINK_URL 
CASCADE;

COMMIT;
