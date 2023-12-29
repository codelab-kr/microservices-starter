export abstract class MockModel<T> {
  protected abstract entityStub: T;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructorSpy(_createEntityData: T): void {}

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  async findOne(): Promise<T> {
    return this.entityStub;
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async create(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async deleteOne(): Promise<void> {
    return;
  }

  async upsert(): Promise<T> {
    return this.entityStub;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }
}
