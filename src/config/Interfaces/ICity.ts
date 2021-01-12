interface ICityCreate {
  name: String;
  state_id: Number;
}

interface ICitySearch {
  name?: String;
  stateId?: Number;
}

export { ICityCreate, ICitySearch };
