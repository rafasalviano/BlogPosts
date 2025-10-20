# Différence entre `.ts` et `.tsx`

| **Extension** | **Description**                                                                                       | **Usage principal**                                                                  |
|---------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `.ts`         | Fichier TypeScript classique, qui contient uniquement du code TypeScript (logique, types, interfaces). | Utilisé pour des projets TypeScript qui n'ont pas besoin d'intégrer du JSX ou du React. |
| `.tsx`        | Fichier TypeScript qui supporte également le JSX (JavaScript XML).                                     | Utilisé dans les projets React avec TypeScript pour combiner logique TypeScript et JSX. |

## Détails supplémentaires

- **.ts** : Principalement pour des projets non-React ou lorsque vous n'avez pas besoin de JSX (une syntaxe qui ressemble au HTML).
- **.tsx** : Permet d'écrire des composants React en TypeScript. Le JSX est obligatoire pour la syntaxe des composants React, c'est pourquoi on utilise cette extension dans ces cas.

### Exemple

- `.ts` :

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

- `.tsx` :

```tsx
const MyComponent: React.FC = () => {
  return <div>Hello, world!</div>;
};
```