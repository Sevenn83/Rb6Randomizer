export class OperatorModel {
  name: string;
  image: string;
  pays: string;
  description: string;
  active: boolean;

  constructor(name: string, image: string, pays: string, description: string, active?: boolean) {
    this.name = name;
    this.image = image.toLowerCase();
    this.pays = pays;
    this.description = description;
    if (active === undefined) {
      this.active = true;
    } else {
      this.active = active
    }
  }

}
