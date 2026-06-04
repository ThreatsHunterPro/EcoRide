import { describe, test, expect } from 'vitest';

describe('Vérification de l\'environnement de test BackEnd', () => {
  test('Vitest doit fonctionner correctement', () => {
    // Un test tout simple pour vérifier que le moteur de test calcule correctement
    const somme = 1 + 1;
    expect(somme).toBe(2);
  });
});