// Mock database for when MongoDB is not available
// This allows the app to work for testing purposes

interface MockUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

class MockDatabase {
  private users: MockUser[] = [];
  private nextId = 1;

  async findOne(query: any) {
    return this.users.find(user => user.email === query.email) || null;
  }

  async save(user: Omit<MockUser, '_id'>) {
    const newUser: MockUser = {
      _id: this.nextId.toString(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    this.nextId++;
    return newUser;
  }

  async findById(id: string) {
    return this.users.find(user => user._id === id) || null;
  }

  async find(query: any = {}) {
    return this.users;
  }
}

export const mockDB = new MockDatabase();