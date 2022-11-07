# Endpoints

You'll find here all of the endpoints for the application.

## /API/V1

### <u>User</u>

| Method | Route          | Description | Returns | Page |
| ------ | -------------- | ----------- | ------- | ---- |
| GET    | /users/:userId |             |         |      |
| POST   | /signup        |             |         |      |
| POST   | /signin        |             |         |      |
| GET    | /signout       |             |         |      |
| PATCH  | /users/:userId |             |         |      |
| DELETE | /users/:userId |             |         |      |
| POST   | /refreshToken  |             |         |      |

## <u>Projects</u>

| Method | Route                | Description | Returns | Page |
| ------ | -------------------- | ----------- | ------- | ---- |
| GET    | /projects            |             |         |      |
| GET    | /projects/:projectId |             |         |      |
| POST   | /projects            |             |         |      |
| PATCH  | /projects/:projectId |             |         |      |
| DELETE | /projects/:projectId |             |         |      |

### <u>Articles</u>

| Method | Route                              | Description | Returns | Page |
| ------ | ---------------------------------- | ----------- | ------- | ---- |
| GET    | /users/:userId/articles            |             |         |      |
| GET    | /users/:userId/articles/:articleId |             |         |      |
| POST   | /articles                          |             |         |      |
| PATCH  | /articles/:articleId               |             |         |      |
| DELETE | /articles/:articleId               |             |         |      |

### <u>Golden Book Tickets</u>

| Method | Route                   | Description | Returns | Page |
| ------ | ----------------------- | ----------- | ------- | ---- |
| GET    | /gb-tickets             |             |         |      |
| POST   | /gb-tickets             |             |         |      |
| PATCH  | /gb-tickets/:gbTicketId |             |         |      |
| DELETE | /gb-tickets/:gbTicketId |             |         |      |

### <u>Categories</u>

| Method | Route                   | Description | Returns | Page |
| ------ | ----------------------- | ----------- | ------- | ---- |
| GET    | /categories             |             |         |      |
| POST   | /categories             |             |         |      |
| PATCH  | /categories/:categoryId |             |         |      |
| DELETE | /categories/:categoryId |             |         |      |

[Previous](./04_mcd-mld-mpd.md) | [Home](../README.md) | [Next](./05_endpoints.md)
