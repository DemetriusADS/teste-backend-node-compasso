interface IClient {
  client_id: string;
}

interface IClientCreate {
  name: string;
  age: number;
  born_date: Date;
  city_id: number;
  gender: number;
}

interface IClientUpdate extends IClient {
  name: string;
}

interface IClientSearch {
  clientId?: number;
  name?: string;
}

interface IClientDeletedResponse {
  status: number;
  message: string;
}

export {
  IClient,
  IClientUpdate,
  IClientDeletedResponse,
  IClientCreate,
  IClientSearch,
};
