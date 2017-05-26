export class OperatorModel {
  name: string;
  image: string;
  pays: string;
  description: string;

  constructor(name: string, image: string, pays: string, description: string) {
    this.name = name;
    this.image = image;
    this.pays = pays;
    this.description = description;
  }
}
