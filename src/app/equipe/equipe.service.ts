import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Enum
export enum Niveau {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}

export interface Equipe {
  idEquipe?: number;
  nomEquipe: string;
  niveau: Niveau;
  detailEquipeId: number;
  nbMembres: number;
  ageMoyen: number;
  projetsLivres: number;
  prochaineEvolution?: boolean;
}




@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private equipeUrl = 'http://localhost:8089/Kassil/equipe';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.equipeUrl}/retrieve-all-equipes`);
  }

  getOne(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.equipeUrl}/retrieve-equipe/${id}`);
  }

  add(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.equipeUrl}/add-equipe`, equipe);
  }

  update(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.equipeUrl}/update-equipe`, equipe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.equipeUrl}/remove-equipe/${id}`);
  }

  evolve(): Observable<void> {
    return this.http.put<void>(`${this.equipeUrl}/faireEvoluerEquipes`, {});
  }
  getStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.equipeUrl}/stats`);
  }
  predict(equipe: Equipe): Observable<{ prochaineEvolution: boolean }> {
    return this.http.post<{ prochaineEvolution: boolean }>('http://localhost:5000/predict', {
      nbMembres: equipe.nbMembres,
      ageMoyen: equipe.ageMoyen,
      projetsLivres: equipe.projetsLivres
    });
  }  
  
}
