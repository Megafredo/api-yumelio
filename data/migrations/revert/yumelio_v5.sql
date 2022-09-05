-- SQLBook: Code
-- Revert yumelio:yumelio_v5 from pg

BEGIN;

DROP FUNCTION 
article_by_user,
articles_by_user, 
user_identity;

DROP TYPE 
identity, 
articles_by_user;

COMMIT;
