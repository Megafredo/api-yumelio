-- SQLBook: Code
-- Deploy yumelio:yumelio_v8 to pg

BEGIN;
--& Create project with categories
CREATE OR REPLACE FUNCTION project_has_category(projectId INT, categoryId INT)
RETURNS INT AS $$

BEGIN

INSERT INTO "project_has_category"("project_id", "category_id")
VALUES (projectId, categoryId);

RETURN (SELECT P.id FROM "project" AS P WHERE P.id = projectId);

END
$$ LANGUAGE plpgsql VOLATILE;


CREATE
OR REPLACE FUNCTION add_category_to_project(JSON) 
RETURNS BOOLEAN AS $$

DECLARE
_elem JSON;
_array JSON := ($1 ->> 'categories');

BEGIN

    PERFORM (SELECT CP."inserted_project_id" FROM create_project($1) AS CP);

FOR _elem IN SELECT * FROM json_array_elements(_array)
LOOP
    -- Reuse the insert function in a loop
    PERFORM(SELECT * FROM project_has_category((SELECT P.id FROM "project" AS P ORDER BY P.id DESC LIMIT 1),(_elem ->> 'id')::INT));
        
END LOOP;
  
    RETURN (SELECT COUNT(P.id)>0 FROM "project" AS P WHERE P.id = (SELECT P.id FROM "project" AS P ORDER BY P.id DESC LIMIT 1));
    
END

$$ LANGUAGE plpgsql VOLATILE;

--& Create article with categories
CREATE OR REPLACE FUNCTION article_has_category(articleId INT, categoryId INT)
RETURNS INT AS $$

BEGIN

INSERT INTO "article_has_category"("article_id", "category_id")
VALUES (articleId, categoryId);

RETURN (SELECT A.id FROM "article" AS A WHERE A.id = articleId);

END
$$ LANGUAGE plpgsql VOLATILE;


CREATE
OR REPLACE FUNCTION add_category_to_article(JSON) 
RETURNS BOOLEAN AS $$

DECLARE
_elem JSON;
_array JSON := ($1 ->> 'categories');

BEGIN

    PERFORM (SELECT CA."inserted_article_id" FROM create_article($1) AS CA);

FOR _elem IN SELECT * FROM json_array_elements(_array)
LOOP
    -- Reuse the insert function in a loop
    PERFORM(SELECT * FROM article_has_category((SELECT A.id FROM "article" AS 
    A ORDER BY A.id DESC LIMIT 1),(_elem ->> 'id')::INT));
        
END LOOP;
  
    RETURN (SELECT COUNT(A.id)>0 FROM "article" AS A WHERE A.id = (SELECT A.id FROM "article" AS A ORDER BY A.id DESC LIMIT 1));
    
END

$$ LANGUAGE plpgsql VOLATILE;

				
--& Update or insert in project_has_category
				   
CREATE OR REPLACE FUNCTION upsert_project_has_categories(json)
RETURNS BOOLEAN AS $$

DECLARE
_elem JSON;
_array JSON := ($1 ->> 'categories');

BEGIN

-- RAISE NOTICE 'ARRAY :  %', (SELECT COUNT(*) FROM json_array_elements(_array));

IF (SELECT COUNT(*) FROM json_array_elements(_array)) > 0 THEN
--   statements;

	FOR _elem IN SELECT * FROM json_array_elements(_array)
	LOOP

-- 	RAISE NOTICE 'ID : %', _elem ->> 'id';
-- 	RAISE NOTICE 'OLD : %', _elem ->> 'old_category';

	IF (SELECT COUNT(*) > 0 
		FROM project_has_category 
		WHERE project_id = ($1 ->> 'id')::INT 
		AND category_id = (_elem ->> 'old_category')::INT) 
	THEN

		UPDATE project_has_category
		SET
		category_id = (_elem ->> 'id')::INT --new
		WHERE 
		project_id =  ($1 ->> 'id')::INT
		AND
		category_id = (_elem ->> 'old_category')::INT;

	ELSE
		INSERT INTO project_has_category
		(project_id, category_id)
		VALUES
		( ($1 ->> 'id')::INT, (_elem ->> 'id')::INT)
		ON CONFLICT DO NOTHING;

	END IF;

	END LOOP;

RETURN TRUE;

ELSE
--   alternative-statements;
RETURN FALSE;
END IF;

END

$$ LANGUAGE plpgsql VOLATILE;


--& Update project with categories

CREATE
OR REPLACE FUNCTION update_project_with_categories(json) 
RETURNS BOOLEAN AS $$

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


PERFORM(SELECT * FROM upsert_project_has_categories($1));

RETURN 
    (SELECT COUNT (P.id) > 0 
        FROM "project" AS P 
        WHERE P.id = ($1->> 'id')::INT
        AND P."user_id" = ($1->> 'user_id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;
