-- Verify yumelio:yumelio_v6 on pg

BEGIN;

SELECT * FROM gb_ticket_by_user(3, 9);

ROLLBACK;
