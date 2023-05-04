export interface IDetailRecette {
    id_plat:number,
    temps:number,
    dificulte:string,
    etoile:number,
    nom_plat:string,
}

export interface IDescRecette {
    id:number,
    id_plat:number,
    description?:string,
    img?:string,
}