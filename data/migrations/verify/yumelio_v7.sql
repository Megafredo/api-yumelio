-- Verify yumelio:yumelio_v7 on pg

BEGIN;

SELECT * FROM projects_by_user(6);

SELECT * FROM project_by_user(9,1);

ROLLBACK;
