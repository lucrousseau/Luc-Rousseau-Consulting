/** @jest-environment node */
const { apiRequireGet } = require("./apiRequireGet");

describe("apiRequireGet", () => {
  it("returns true for GET", () => {
    const req = { method: "GET" };
    const res = { statusCode: 200, setHeader: jest.fn(), end: jest.fn() };
    expect(apiRequireGet(req, res)).toBe(true);
    expect(res.end).not.toHaveBeenCalled();
  });

  it("returns true for HEAD", () => {
    const req = { method: "HEAD" };
    const res = { statusCode: 200, setHeader: jest.fn(), end: jest.fn() };
    expect(apiRequireGet(req, res)).toBe(true);
    expect(res.end).not.toHaveBeenCalled();
  });

  it("returns false and sends 405 for POST", () => {
    const req = { method: "POST" };
    const res = {
      statusCode: 200,
      setHeader: jest.fn(),
      end: jest.fn(),
    };
    expect(apiRequireGet(req, res)).toBe(false);
    expect(res.statusCode).toBe(405);
    expect(res.setHeader).toHaveBeenCalledWith("Allow", "GET, HEAD");
    expect(res.end).toHaveBeenCalledWith("Method Not Allowed");
  });
});
