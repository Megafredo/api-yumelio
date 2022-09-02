-- SQLBook: Code
-- Deploy yumelio:yumelio_v3 to pg
BEGIN;

--& Update user
CREATE
OR REPLACE FUNCTION update_user(json) 
RETURNS TABLE (updated_user TEXT) AS $$

BEGIN
UPDATE
    "user"
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
    "user"."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT "user".username 
        FROM "user" 
        WHERE "user".id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update article
CREATE
OR REPLACE FUNCTION update_article(json) 
RETURNS TABLE (updated_article_id INTEGER) AS $$

BEGIN
UPDATE
    "article"
SET
    "title" = COALESCE(($1 ->> 'title')::TEXT, "title"),
    "abstract" = COALESCE(($1 ->> 'abstract')::TEXT, "abstract"),
    "content" = COALESCE(($1 ->> 'content')::TEXT,  "content"),
    "user_id" = COALESCE(($1 ->> 'user_id')::INTEGER, user_id),
    "status_id" = COALESCE(($1 ->> 'status_id')::INTEGER, status_id),
    "updated_at" = COALESCE(($1 ->> 'updated_at')::TIMESTAMPTZ, NOW())
    
WHERE
    "article"."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT "article".id 
        FROM "article" 
        WHERE "article".id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update article comment

CREATE
OR REPLACE FUNCTION update_article_comment(json) 
RETURNS TABLE (updated_article_comment_id INT) AS $$

BEGIN
UPDATE
    "article_comment" AS AC
SET
    "content" = COALESCE(($1 ->> 'content')::TEXT, "content"),
    "updated_at" = COALESCE(($1 ->> 'updated_at')::TIMESTAMPTZ, NOW())
    
WHERE
    AC."id" = ($1->> 'id')::INT
AND AC."user_id" = ($1->> 'user_id')::INT
AND AC."article_id" = ($1->> 'article_id')::INT;
    
RETURN QUERY 
    (SELECT AC.id 
        FROM "article_comment" AS AC 
        WHERE AC.id = ($1->> 'id')::INT
        AND AC."user_id" = ($1->> 'user_id')::INT
        AND AC."article_id" = ($1->> 'article_id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update error
CREATE
OR REPLACE FUNCTION update_error(json) 
RETURNS TABLE (updated_error_id INTEGER) AS $$

BEGIN
UPDATE
    "error" AS E
SET
    "error_snippet" = COALESCE(($1 ->> 'error_snippet')::TEXT, "error_snippet"),
    "title" = COALESCE(($1 ->> 'title')::TEXT, "title"),
    "abstract" = COALESCE(($1 ->> 'abstract')::TEXT,  "abstract"),
    "content" = COALESCE(($1 ->> 'content')::TEXT, "content"),
    "user_id" = COALESCE(($1 ->> 'user_id')::INTEGER, user_id),
    "status_id" = COALESCE(($1 ->> 'status_id')::INTEGER, status_id),
    "error_comment_id" = COALESCE(($1 ->> 'error_comment_id')::INTEGER, error_comment_id),
    "updated_at" = COALESCE(($1 ->> 'updated_at')::TIMESTAMPTZ, NOW())
    
WHERE
    E."id" = ($1->> 'id')::INT
AND E."user_id" = ($1->> 'user_id')::INT;
    
RETURN QUERY 
    (SELECT E."id" 
        FROM "error" AS E
        WHERE E."id" = ($1->> 'id')::INT
        AND E."user_id" = ($1->> 'user_id')::INT
    );

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update error comment

CREATE
OR REPLACE FUNCTION update_error_comment(json) 
RETURNS TABLE (updated_error_comment_id INT) AS $$

BEGIN
UPDATE
    "error_comment" AS EC
SET
    "content" = COALESCE(($1 ->> 'content')::TEXT, "content"),
    "error_id" = COALESCE(($1 ->> 'error_id')::INTEGER, "error_id"),
    "updated_at" = COALESCE(($1 ->> 'updated_at')::TIMESTAMPTZ, NOW())
    
WHERE
    EC."id" = ($1->> 'id')::INT
AND EC."user_id" = ($1->> 'user_id')::INT
AND EC."error_id" = ($1->> 'error_id')::INT;
    
RETURN QUERY 
    (SELECT EC.id 
        FROM "error_comment" AS EC 
        WHERE EC."id" = ($1->> 'id')::INT
        AND EC."user_id" = ($1->> 'user_id')::INT
        AND EC."error_id" = ($1->> 'error_id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update category
CREATE
OR REPLACE FUNCTION update_category(json) 
RETURNS TABLE (updated_category_id INTEGER) AS $$

BEGIN
UPDATE
    "category"
SET
    "name" = COALESCE(($1 ->> 'name')::TEXT, "name"),
    "logo" = COALESCE(($1 ->> 'logo')::TEXT, "logo")
 
WHERE
    "category"."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT "category".id 
        FROM "category" 
        WHERE "category".id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;