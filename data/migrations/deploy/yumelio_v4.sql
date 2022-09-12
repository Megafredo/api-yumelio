-- SQLBook: Code
-- Deploy yumelio:yumelio_v4 to pg

BEGIN;

CREATE VIEW projects_with_categories AS
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
                'id', C."id",
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
    
FROM "project" AS P;
COMMIT;
