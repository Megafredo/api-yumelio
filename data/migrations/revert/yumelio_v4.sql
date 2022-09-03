-- Revert yumelio:yumelio_v4 from pg

BEGIN;

DROP VIEW project_has_categories;

COMMIT;
