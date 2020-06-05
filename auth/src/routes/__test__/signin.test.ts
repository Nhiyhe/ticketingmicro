import request from "supertest";
import { app } from "../../app";

it("fails when an email that does not exists supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  const email = "test2@test.com";
  const password = "password";

  await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: `${email}3`, password })
    .expect(400);
});

it('response with a cookie when given valid credentials', async () => {
    const email = "test2@test.com";
    const password = "password";
  
    await request(app)
      .post("/api/users/signup")
      .send({ email, password })
      .expect(201);
  
    const response = await request(app)
      .post("/api/users/signin")
      .send({ email, password })
      .expect(200);

      expect(response.get('Set-Cookie')).toBeDefined();
})