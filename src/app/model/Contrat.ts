export class Contrat {
    idContrat?: number;  
    nom?: string = '';
    dateDebutContrat: Date | string = '';  
    dateFinContrat: Date | string = '';
    specialite: string = '';
    archive: boolean = false;
    montantContrat: number = 0;
}