-- SQLBook: Code
-- Revert yumelio:yumelio_v6 from pg

BEGIN;

DROP FUNCTION gb_ticket_by_user;
DROP TYPE gb_ticket_by_user CASCADE;

COMMIT;
