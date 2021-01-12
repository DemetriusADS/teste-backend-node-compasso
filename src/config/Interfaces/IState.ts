interface IState {
  name: String;
  uf: String;
}

interface IStateUpdate {
  state_id: String;
  name?: String;
  uf?: String;
}

interface IStateSearch {
  name?: string;
  uf?: string;
}

export { IState, IStateUpdate, IStateSearch };
