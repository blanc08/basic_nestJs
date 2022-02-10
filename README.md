## Update

## testing : February, 4th 2022

#### Unit test

- User Service
  !['proof'](/assets/images/user.service.png)
- User Resolver
  !['proof'](/assets/images/user.resolver.png)
- Cat Service
  !['proof'](/assets/images/cat.service.png)
- Cat Resolver
  !['proof'](/assets/images/cat.resolver.png)

#### Integration Test

- Auth Service
  !['proof'](/assets/images/auth.service.png)

#### Notes

- a bit suggring to mocking resolver's arguments(specificly 'context')

## API's Fields : Februay, 1th 2022

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

#### example :

1. `fragment User on User { id, username, isActive, createdAt, updatedAt, }`
2. `fragment Cat on Cat { id, userId, name, age, breed, description }`

#### Notes

- Cant sign in because the new user's passsword arent hashed well
- I did createUser, but it should be signUp !!!!!wrong query
- createUser query deleted
- i cant find any good referense how to use the complexity feature correcly,
  what i'm doing here is just to set the default complexity to 0, then put 1 to each nested field complexity cost. Thus, We'll only can do 3 nested query
