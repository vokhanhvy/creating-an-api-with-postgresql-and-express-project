import { UserModel, User } from "../../models/user";

const userModel = new UserModel();

describe("User Model", () => {
  it("should have index method", () => {
    expect(userModel.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(userModel.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(userModel.create).toBeDefined();
  });

  it("should have update method", () => {
    expect(userModel.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(userModel.delete).toBeDefined();
  });
});
