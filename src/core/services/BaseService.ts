import { AxiosInstance } from "axios";

export class BaseService {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
