import { jest } from "@jest/globals";
import login from "./login";
import authService from "../../service/auth";
import { HttpCode } from "../../lib/constants";

describe("Unit test login", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    authService.getUser = jest.fn(async (data) => data);
    next = jest.fn();
  });

  test("Login getUser success", async () => {
    authService.getUser = jest.fn(async () => {
      user;
    });
    await login(req, res, next);
    expect(authService.getUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    // expect(authService.getUser()).toBeDefined();
  });

  test("Login getUser unauthorized", async () => {
    authService.getUser = jest.fn(async () => null);
    await login(req, res, next);
    expect(authService.getUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
  });

  test("Login getUser database error", async () => {
    const testError = new Error("Database Error");
    authService.getUser = jest.fn(async () => {
      throw testError;
    });
    await login(req, res, next);
    expect(authService.getUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(next).toHaveBeenCalledWith(testError);
  });

  test("Login setToken success", async () => {
    authService.getUser = jest.fn(async () => user);
    const user = { id: "34567890" };
    const token = "12345678";
    // id: "34567890";

    authService.setToken = jest.fn(async ({}) => {});
    await login(req, res, next);
    // expect(authService.setToken).toHaveBeenCalledWith(user.id, token);
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
  });

  // test("Login setToken database error", async () => {
  //   req = { body: { id: "12345", token: "12345678" } };
  //   const testError = new Error("Database Error");
  //   authService.setToken = jest.fn(async () => {
  //     throw testError;
  //   });
  //   await login(req, res, next);
  //   expect(authService.setToken).toHaveBeenCalledWith(
  //     req.body.id,
  //     req.body.token
  //   );
  //   expect(next).toHaveBeenCalledWith(testError);
  // });
});
