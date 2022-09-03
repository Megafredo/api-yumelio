-- Verify yumelio:yumelio_v4 on pg

BEGIN;

SELECT * FROM project_has_categories;

ROLLBACK;
