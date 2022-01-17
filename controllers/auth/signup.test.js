import { jest } from "@jest/globals";
import signup from "./signup";
import authService from "../../service/auth";
import { HttpCode } from "../../lib/constants";

describe("Unit test singup", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    // authService.create = jest.fn(async (data) => data);
    next = jest.fn();
  });

  test("Signup create new User", async () => {
    authService.isUserExist = jest.fn(async () => false);
    authService.create = jest.fn(async () => true);
    await signup(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(authService.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
  });

  test("Signup already exist User", async () => {
    authService.isUserExist = jest.fn(async () => true);
    await signup(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT);
  });

  test("Signup isUserExist database error", async () => {
    const testError = new Error("Database Error");
    authService.isUserExist = jest.fn(async () => {
      throw testError;
    });
    await signup(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(next).toHaveBeenCalledWith(testError);
  });

  test("Signup create database error", async () => {
    const testError = new Error("Database Error");
    authService.create = jest.fn(async () => {
      throw testError;
    });
    await signup(req, res, next);
    expect(next).toHaveBeenCalledWith(testError);
  });
});
