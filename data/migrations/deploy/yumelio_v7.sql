-- Deploy yumelio:yumelio_v7 to pg

BEGIN;

--& Function All Projects By User
CREATE
OR REPLACE FUNCTION projects_by_user(userId INT) 
RETURNS TABLE (projects_by_user JSON) AS $$ BEGIN 

RETURN QUERY (
    SELECT 
	JSON_AGG(
    json_build_object(
        'title', P."title",
        'abstract', P."abstract",
        'content', P."content",
        'picture', P."picture",
        'date', P."date",
        'link', P."link",
        
        'categories', (SELECT JSON_AGG(
            json_build_object
            (
                'name',C."name",
                'logo', C."logo",
                'color',C."color"
            )
        )
        FROM category AS C
        JOIN project_has_category AS PHC
        ON C."id" = PHC."category_id"
        WHERE PHC."project_id" = P."id")
) ORDER BY P."id" DESC
)
    
FROM "project" AS P
JOIN "user" AS U
	ON U.id = P.user_id
WHERE U."id" = userId :: INT
);

END $$ LANGUAGE plpgsql VOLATILE;



--& Function One Project By User
CREATE TYPE project_by_user AS (
 		"project_id" INT,
        "title" TEXT,
        "abstract" TEXT,
        "content" TEXT,
        "picture" LINK_URL,
		"is_active" BOOLEAN,
		"date" TEXT,
		"link" LINK_URL,
		"categories" JSON,
        "user_id" INT
);


CREATE
OR REPLACE FUNCTION project_by_user(userId INT, projectId INT) 
RETURNS SETOF project_by_user AS $$ 

BEGIN 

RETURN QUERY (
    SELECT
        P."id",
        P."title",
        P."abstract",
        P."content",
        P."picture",
		P."is_active",
		P."date",
		P."link",
	
		(SELECT JSON_AGG(
            json_build_object
            (
                'name',C."name",
                'logo', C."logo",
                'color',C."color"
            )
        )
        FROM category AS C
        JOIN project_has_category AS PHC
        ON C."id" = PHC."category_id"
        WHERE PHC."project_id" = P."id") AS categories,
	
        U."id"
    FROM
        "project" AS P
        JOIN "user" AS U ON U."id" = P."user_id"
    WHERE
        U."id" = userId :: INT
        AND P."id" = projectId :: INT
);

END $$ LANGUAGE plpgsql VOLATILE;

COMMIT;
