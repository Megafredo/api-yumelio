-- Revert yumelio:yumelio_v2 from pg

BEGIN;

DROP FUNCTION
    create_category(json),
    create_gb_ticket(json),
    create_project(json),
    create_article(json),
    create_user(json);

COMMIT;
