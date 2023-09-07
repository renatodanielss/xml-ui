export interface Jobs {
  id: number,
  position: string,
  salary: number,
  company: string,
  location: string,
  contractType: string,
  enrolled?: boolean,
}