-- SQLBook: Code
-- Deploy yumelio:yumelio_v3 to pg
BEGIN;

--& Update user
CREATE
OR REPLACE FUNCTION update_user(json) 
RETURNS TABLE (updated_user TEXT) AS $$

BEGIN
UPDATE
    "user" AS U
SET
    "first_name" = COALESCE(($1 ->> 'first_name')::TEXT, "first_name"),
    "last_name" = COALESCE(($1 ->> 'last_name')::TEXT, "last_name"),
    "email" = COALESCE(($1 ->> 'email')::EMAIL, "email"),
    "password" = COALESCE(($1 ->> 'password')::PWD,  "password"),
    "linkedin_url" = COALESCE(($1 ->> 'linkedin_url')::LINK_URL, linkedin_url),
    "github_url" = COALESCE(($1 ->> 'github_url')::LINK_URL, github_url),
    "instagram_url" = COALESCE(($1 ->> 'instagram_url')::LINK_URL, instagram_url),
    "role_id" = COALESCE(($1 ->> 'role_id')::INTEGER, role_id)
    
WHERE
    U."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT U.first_name 
        FROM "user" AS U
        WHERE U.id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update article
CREATE
OR REPLACE FUNCTION update_article(json) 
RETURNS TABLE (updated_article_id INTEGER) AS $$

BEGIN
UPDATE
    "article" AS A
SET
    "title" = COALESCE(($1 ->> 'title')::TEXT, "title"),
    "abstract" = COALESCE(($1 ->> 'abstract')::TEXT, "abstract"),
    "content" = COALESCE(($1 ->> 'content')::TEXT,  "content"),
    "user_id" = COALESCE(($1 ->> 'user_id')::INTEGER, "user_id")
    
WHERE
    A."id" = ($1->> 'id')::INT
AND A."user_id" = ($1->> 'user_id')::INT;
    
RETURN QUERY 
    (SELECT A.id 
        FROM "article" AS A
        WHERE A.id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update project

CREATE
OR REPLACE FUNCTION update_project(json) 
RETURNS TABLE (updated_project_id INT) AS $$

BEGIN
UPDATE
    "project" AS P
SET
    "title" = COALESCE(($1 ->> 'title')::TEXT, "title"),
    "abstract" = COALESCE(($1 ->> 'abstract')::TEXT, "abstract"),
    "content" = COALESCE(($1 ->> 'content')::TEXT,  "content"),
    "picture" = COALESCE(($1 ->> 'picture')::TEXT,  "picture"),
    "is_active" = COALESCE(($1 ->> 'is_active')::BOOLEAN,  "is_active"),
    "date" = COALESCE(($1 ->> 'date')::TEXT,  "date"),
    "link" = COALESCE(($1 ->> 'link')::LINK_URL, "link"),
    "user_id" = COALESCE(($1 ->> 'user_id')::INTEGER, "user_id")
    
WHERE
    P."id" = ($1->> 'id')::INT
AND P."user_id" = ($1->> 'user_id')::INT;
    
RETURN QUERY 
    (SELECT P.id 
        FROM "project" AS P 
        WHERE P.id = ($1->> 'id')::INT
        AND P."user_id" = ($1->> 'user_id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update Golden Book Ticket
CREATE
OR REPLACE FUNCTION update_gb_ticket(json) 
RETURNS TABLE (updated_gb_ticket_id INTEGER) AS $$

BEGIN
UPDATE
    "gb_ticket" AS GB_T
SET
    "content" = COALESCE(($1 ->> 'content')::TEXT, "content"),
    "user_id" = COALESCE(($1 ->> 'user_id')::INTEGER, "user_id")
    
WHERE
    GB_T."id" = ($1->> 'id')::INT
AND GB_T."user_id" = ($1->> 'user_id')::INT;
    
RETURN QUERY 
    (SELECT GB_T."id" 
        FROM "gb_ticket" AS GB_T
        WHERE GB_T."id" = ($1->> 'id')::INT
        AND GB_T."user_id" = ($1->> 'user_id')::INT
    );

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update category
CREATE
OR REPLACE FUNCTION update_category(json) 
RETURNS TABLE (updated_category_id INTEGER) AS $$

BEGIN
UPDATE
    "category" AS C
SET
    "name" = COALESCE(($1 ->> 'name')::TEXT, "name"),
    "logo" = COALESCE(($1 ->> 'logo')::TEXT, "logo"),
    "color" = COALESCE(($1 ->> 'color')::TEXT, "color")
 
WHERE
    C."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT C.id 
        FROM "category" AS C
        WHERE C.id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;