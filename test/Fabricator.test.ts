import { Fabricator } from "../src/fabricator";

describe("Fabricator()", () => {
  it("should create an empty model", () => {
    const user = Fabricator({});
    expect(user()).toEqual({});
  });

  it("should create a model based on a definition", () => {
    const user = Fabricator({
      id: 1,
      firstName: () => "John",
      lastName: () => "Doe"
    });
    expect(user()).toEqual({ id: 1, firstName: "John", lastName: "Doe" });
  });

  it("should return an object based on the model and on the variations", () => {
    const user = Fabricator({ id: () => 1, admin: () => false });
    expect(user({ admin: true })).toEqual({ id: 1, admin: true });
  });

  describe("model.extend()", () => {
    it("should create an alias for a model", () => {
      const user = Fabricator({
        id: () => 1,
        firstName: () => "John",
        lastName: () => "Doe"
      });
      const admin = user.extend({});
      expect(user()).toEqual({ id: 1, firstName: "John", lastName: "Doe" });
      expect(admin()).toEqual({ id: 1, firstName: "John", lastName: "Doe" });
    });

    it("should create a model starting from an existing one", () => {
      const user = Fabricator({
        id: () => 1,
        firstName: () => "John",
        lastName: () => "Doe",
        admin: () => false
      });

      const admin = user.extend({ admin: () => true });

      expect(user()).toEqual({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        admin: false
      });
      expect(admin()).toEqual({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        admin: true
      });
    });
  });
});
