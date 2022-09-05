-- SQLBook: Code
-- Deploy yumelio:yumelio_v6 to pg

BEGIN;

CREATE TYPE gb_ticket_by_user AS (
    "gb_ticket_id" INT,
    "content" TEXT,
    "created_at" TIMESTAMPTZ,
    "user_id" INT
);

CREATE
OR REPLACE FUNCTION gb_ticket_by_user(userId INT, gbTicketId INT) 
RETURNS SETOF gb_ticket_by_user AS $$ 

BEGIN 

RETURN QUERY (
    SELECT
        GB."id",
        GB."content",
        GB."created_at",
        U."id"
    FROM
        "gb_ticket" AS GB
        JOIN "user" AS U ON U."id" = GB."user_id"
    WHERE
        U."id" = userId :: INT
        AND GB."id" = gbTicketId :: INT
);

END $$ LANGUAGE plpgsql VOLATILE;

COMMIT;
