import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let bcryptCompare: jest.Mock;
  let bcryptHash: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
    bcryptHash = jest.fn().mockResolvedValue('hashedPassword');
    (bcrypt.hash as jest.Mock) = bcryptHash;

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('signin', async () => {
    const query = /* GraphQL */ `
      mutation {
        signin(signinUserInput: { username: "admin", password: "password" }) {
          access_token
        }
      }
    `;

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(({ body }) => {
        // console.log(body);

        expect(body.data).toBeDefined();
      })
      .expect(200);
  });

  it('get cats', async () => {
    const query = /* GraphQL */ `
      query {
        cats {
          id
          name
          age
        }
      }
    `;

    await request(app.getHttpServer())
      .post('/graphql')
      .set({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0NDgxNTE1OSwiZXhwIjoxNjQ0ODE4NzU5fQ.iP2oomNE2xrE2_085pzFaXG1THJof2FxC7hl3SX_Qs4`,
      })
      .send({ query })
      .expect(({ body }) => {
        expect(body.data).toBeDefined();
      })
      .expect(200);
  });
});
