# mini-wp

usage API endpoints:

```
https://localhost:3000
```



| Route                   | HTTP   | Description                                        |
| ----------------------- | ------ | -------------------------------------------------- |
| `/users/register`       | POST   | Register with new user info                        |
| `/users/login`          | POST   | Login and get an access token based on credentials |
| `/users/googleSignIn`   | POST   | Login with google account                          |
| `/articles`             | POST   | Create article, need authentiocation token         |
| `/articles`             | GET    | Get all article list from database                 |
| `/articles/my-articles` | GET    | Get user articles only                             |
| `/articles/search-tags` | GET    | Get articles filter by tag user request            |
| `/articles/:id`         | GET    | Get articles by id                                 |
| `/articles/:id`         | PATCH  | Update article id with new information             |
| `/articles/:id`         | DELETE | Delete article id                                  |

For example:

```
https://localhost:3000/articles
```

<br>

## Errors

| Code | Name                  | Description                                              |
| ---- | --------------------- | -------------------------------------------------------- |
| 400  | Bad Request           | We could not process that action                         |
| 403  | Forbidden             | You exceeded the rate limit                              |
| 404  | Not Found             | The requested resource could not be found                |
| 500  | Internal Server Error | We had a problem with our server. Please try again later |

<br>