-- SQLBook: Code
-- Deploy yumelio:yumelio_v5 to pg
BEGIN;

CREATE TYPE identity AS (
    "id" INT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" EMAIL,
    "password" PWD,
    "linkedin_url" LINK_URL,
    "github_url" LINK_URL,
    "instagram_url" LINK_URL,
    "role" TEXT
);

--& Function User Identity
CREATE
OR REPLACE FUNCTION user_identity(email_address EMAIL) RETURNS SETOF identity AS $$ BEGIN RETURN QUERY (
    SELECT
        U."id",
        U."first_name",
        U."last_name",
        U."email",
        U."password",
        U."linkedin_url",
        U."github_url",
        U."instagram_url",
        R."name" AS role
    FROM
        "role" AS R
        JOIN "user" AS U ON R."id" = U."role_id"
    WHERE
        U."email" = email_address :: EMAIL
);

END $$ LANGUAGE plpgsql VOLATILE;

CREATE TYPE articles_by_user AS (
    "article_id" INT,
    "title" TEXT,
    "abtract" TEXT,
    "content" TEXT,
    "order" INT,
    "user_id" INT
);

--& Function All Articles By User
CREATE
OR REPLACE FUNCTION articles_by_user(userId INT) RETURNS SETOF articles_by_user AS $$ BEGIN RETURN QUERY (
    SELECT
        A."id",
        A."title",
        A."abstract",
        A."content",
        A."order",
        U."id"
    FROM
        "article" AS A
        JOIN "user" AS U ON U."id" = A."user_id"
    WHERE
        U."id" = userId :: INT
);

END $$ LANGUAGE plpgsql VOLATILE;

--& Function One Article By User
CREATE
OR REPLACE FUNCTION article_by_user(userId INT, articleId INT) RETURNS SETOF articles_by_user AS $$ BEGIN RETURN QUERY (
    SELECT
        A."id",
        A."title",
        A."abstract",
        A."content",
        A."order",
        U."id"
    FROM
        "article" AS A
        JOIN "user" AS U ON U."id" = A."user_id"
    WHERE
        U."id" = userId :: INT
        AND A."id" = articleId :: INT
);

END $$ LANGUAGE plpgsql VOLATILE;

COMMIT;