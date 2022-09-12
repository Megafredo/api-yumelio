-- Revert yumelio:yumelio_v7 from pg

BEGIN;

DROP FUNCTION 
projects_by_user,
project_by_user;

DROP TYPE projects_by_user, project_by_user CASCADE;

COMMIT;
