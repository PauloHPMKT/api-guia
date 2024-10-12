import { randomBytes } from 'node:crypto';

export class User {
  public readonly _id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar?: string;
  public isActive?: boolean;
  public createdAt?: Date;

  constructor(props: Omit<User, '_id'>, id?: string) {
    Object.assign(this, props);
    this._id = id || this.generateId();
    this.isActive = props.isActive ?? true;
    this.avatar = props.avatar ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }

  private generateId(): string {
    return randomBytes(12).toString('hex');
  }
}
