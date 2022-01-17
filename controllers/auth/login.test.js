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

  test("Login User success", async () => {
    authService.getUser = jest.fn(async () => "token");
    await login(req, res, next);
    expect(authService.getUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    // expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
  });

  test("Login unauthorized  User", async () => {
    authService.getUser = jest.fn(async () => null);
    await login(req, res, next);
    expect(authService.getUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
  });

  test("Login database error", async () => {
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
});
