import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Users Endpoints", () => {
  let userId: number;

  beforeAll(async () => {
    const newUser = {
      username: "testuser",
      password: "password",
      email: "testuser@gmail.com",
    };

    const res = await request.post("/users").send(newUser);
    userId = res.body.id;
  });

  afterAll(async () => {
    await request.delete(`/users/${userId}`);
  });

  it("should return a list of users", async () => {
    const res = await request.get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return a single user", async () => {
    const res = await request.get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.username).toBe("testuser");
    expect(res.body.email).toBe("testuser@gmail.com");
  });

  it("should create a new user", async () => {
    const newUser = {
      username: "newuser",
      password: "newpassword",
      email: "newuser@gmail.com",
    };

    const res = await request.post("/users").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.username).toBe(newUser.username);
    expect(res.body.email).toBe(newUser.email);

    await request.delete(`/users/${res.body.id}`);
  });

  it("should update an existing user", async () => {
    const updateUser = {
      username: "updateduser",
      password: "updatedpassword",
      email: "updateduser@gmail.com",
    };

    const res = await request.put(`/users/${userId}`).send(updateUser);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe(updateUser.username);
    expect(res.body.email).toBe(updateUser.email);
  });

  it("should delete an existing user", async () => {
    const newUser = {
      username: "tempuser",
      password: "tempuserpassword",
      email: "tempuser@gmail.com",
    };

    const res = await supertest(app).post("/users").send(newUser);
    const tempUserId = res.body.id;

    const deleteRes = await supertest(app).delete(`/users/${tempUserId}`);
    expect(deleteRes.status).toBe(204);

    const checkRes = await supertest(app).get(`/users/${tempUserId}`);
    expect(checkRes.status).toBe(404);
    expect(checkRes.body).toEqual({ message: "User not found" });
  });
});
