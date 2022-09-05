-- SQLBook: Code
-- Revert yumelio:yumelio_v3 from pg

BEGIN;

DROP FUNCTION
    update_category(json),
    update_gb_ticket(json),
    update_project(json),
    update_article(json),
    update_user(json);

COMMIT;
