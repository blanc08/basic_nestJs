## API

# Fields

- User

  - id
  - username
  - isActive
  - createdAt
  - updatedAt

- Cat

  - id
  - userId
  - name
  - age
  - breed
  - description

  `You could build fragment freely with thoose field`

  example :
  `fragment User on User { id, username, isActive, createdAt, updatedAt, }`

`fragment Cat on Cat { id, userId, name, age, breed, description }`

- Cant sign in because the new user's passsword arent hashed well
- I did createUser, but it should be signUp !!!!!wrong query

- createUser query deleted

- i cant find any good referense how to use the complexity feature correcly,
  what i'm doing here is just to set the default complexity to 0, then put 1 to each nested field complexity cost

  - Thus, We'll only can do 3 nested query

- to do
  - https://docs.nestjs.com/graphql/complexity
  - https://blog.logrocket.com/securing-graphql-api-using-rate-limits-and-depth-limits/
  - https://www.apollographql.com/blog/graphql/security/securing-your-graphql-api-from-malicious-queries/
