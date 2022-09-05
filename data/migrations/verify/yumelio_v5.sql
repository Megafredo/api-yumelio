-- Verify yumelio:yumelio_v5 on pg

BEGIN;

SELECT * FROM user_identity('yumedo@survivor.com');

SELECT * FROM articles_by_user(4);

SELECT * FROM article_by_user(4,2);

ROLLBACK;