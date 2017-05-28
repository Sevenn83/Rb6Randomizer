export class OperatorModel {
  id: number;
  name: string;
  image: string;
  pays: string;
  description: string;
  active: boolean;

  constructor(id:number, name: string, image: string, pays: string, description: string, active?: boolean) {
    this.id = id;
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
