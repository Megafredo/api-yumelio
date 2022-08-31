-- Deploy yumelio:yumelio_v2 to pg

BEGIN;

--& Create user
CREATE
OR REPLACE FUNCTION create_user(json) 
RETURNS TABLE (inserted_user TEXT) AS $$

BEGIN
INSERT INTO
        "user" (
        "first_name",
        "last_name",
        "email",
        "password"
    )
VALUES
(
        ($1 ->> 'first_name')::TEXT,
        ($1 ->> 'last_name')::TEXT,
        ($1 ->> 'email')::EMAIL,
        ($1 ->> 'password')::PWD
);
    RETURN QUERY 
    (SELECT "user".first_name
        FROM "user"
        ORDER BY "user".id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

--& Create article
CREATE
OR REPLACE FUNCTION create_article(json) 
RETURNS TABLE (inserted_article_id INT) AS $$

BEGIN
INSERT INTO 
        "article" (
        "title",
        "abstract",
        "content",
        "user_id"
    )
VALUES
(
        ($1 ->> 'title')::TEXT,
        ($1 ->> 'abstract')::TEXT,
        ($1 ->> 'content')::TEXT
        ($1 ->> 'user_id')::INTEGER
);
    RETURN QUERY 
    (SELECT A.id
        FROM "article" as A
        ORDER BY A.id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

--& Create project
CREATE
OR REPLACE FUNCTION create_project(json) 
RETURNS TABLE (inserted_project_id INT) AS $$

BEGIN
INSERT INTO 
        "project" (
        "title",
        "abstract",
        "content",
        "picture",
        "date",
        "link",
        "user_id"

    )
VALUES
(
        ($1 ->> 'title')::TEXT,
        ($1 ->> 'abstract')::TEXT,
        ($1 ->> 'content')::TEXT,
        ($1 ->> 'picture')::LINK_URL,
        ($1 ->> 'date')::TEXT,
        ($1 ->> 'link')::LINK_URL,
        ($1 ->> 'user_id')::INTEGER
);
    RETURN QUERY 
    (SELECT P.id
        FROM "project" AS P
        ORDER BY P.id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

--& Create gb_ticket
CREATE
OR REPLACE FUNCTION create_gb_ticket(json) 
RETURNS TABLE (inserted_gb_ticket_id INT) AS $$

BEGIN
INSERT INTO 
        "gb_ticket" (
        "content",
        "user_id"
    )
VALUES
(
        ($1 ->> 'content')::TEXT,
        ($1 ->> 'user_id')::INTEGER
);
    RETURN QUERY 
    (SELECT GB_T.id
        FROM "gb_ticket" as GB_T
        ORDER BY GB_T.id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

--& Create category
CREATE
OR REPLACE FUNCTION create_category(json) 
RETURNS TABLE (inserted_category_id INT) AS $$

BEGIN
INSERT INTO 
        "category" (
        "name",
        "logo",
        "color"
    )
VALUES
(
        ($1 ->> 'name')::TEXT,
        ($1 ->> 'logo')::TEXT,
        ($1 ->> 'color')::TEXT
);
    RETURN QUERY 
    (SELECT C.id
        FROM "category" as C
        ORDER BY C.id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;
