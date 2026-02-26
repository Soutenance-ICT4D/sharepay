# 🔄 Intégration avec le Backend

## Aperçu
Le frontend communique avec le backend **Sharepay** via une couche API centralisée et typée. Toutes les requêtes HTTP passent par une instance Axios unique (`src/core/api/client.ts`) qui gère :

* **L'authentification :** Ajout automatique de l'en-tête `Authorization`.
* **Transformation des données :** Conversion de l'enveloppe `ApiResponse<T>` du backend en données brutes.
* **Gestion des jetons (Tokens) :** Gestion automatique du rafraîchissement du jeton (refresh-token) avec une file d'attente pour éviter les conditions de concurrence (race conditions).
* **Gestion uniforme des erreurs :** Via la classe personnalisée `ApiError`.

---

## 🚀 Flux d'Intégration

1.  **Appel de Service** : Les composants UI appellent une méthode d'un service (ex: `authService.login`).
2.  **Requête Axios** : L'intercepteur de requête dans `client.ts` injecte l' `accessToken` actuel récupéré depuis le `tokenStorage`.
3.  **Réponse Backend** : Le backend renvoie systématiquement un objet JSON `ApiResponse<T>` :
    ```json
    {
      "success": true,
      "code": "SUCCESS_CODE",
      "message": "Message lisible par l'homme",
      "data": { ... }
    }
    ```
4.  **Analyse de la Réponse** : L'intercepteur de réponse reçoit la `AxiosResponse`. Il transmet la charge utile (payload) à `parseApiResponse` (`src/core/lib/api-response.ts`) :
    * **Si `success` est `true`** : La fonction renvoie les données (`data`) typées.
    * **Si `success` est `false`** : Elle lève une `ApiError` contenant le code backend, le message et le statut HTTP.
5.  **Propagation des Erreurs** : Les méthodes de service ne capturent pas l'erreur ; elles laissent l' `ApiError` remonter. Les composants UI peuvent utiliser `isApiError(error)` pour afficher un message localisé.
6.  **Cycle du Refresh-Token** : Lorsqu'une requête reçoit une erreur **401** :
    * L'intercepteur vérifie le flag `isRefreshing`.
    * Si un rafraîchissement est déjà en cours, la requête est mise en attente (queue).
    * Sinon, il déclenche une seule requête de rafraîchissement vers `/auth/refresh-token`.
    * **En cas de succès** : Les nouveaux jetons sont stockés et toutes les requêtes en attente sont rejouées.
    * **En cas d'échec** : Les jetons sont supprimés et l'utilisateur est redirigé vers `/login`.

---

## 📂 Fichiers Concernés & Rôles

| Fichier | Rôle |
| :--- | :--- |
| `src/core/api/client.ts` | Instance Axios centrale, intercepteurs, file d'attente de rafraîchissement. |
| `src/core/lib/api-error.ts` | Classe d'erreur typée (`ApiError`) étendant `Error`. |
| `src/core/lib/api-response.ts` | Utilitaire `parseApiResponse<T>` qui valide et extrait les données. |
| `src/core/lib/error-codes.ts` | Correspondance entre codes backend et clés i18n, garde de type `isApiError`. |
| `src/core/types/auth.types.ts` | Définitions de types pour `ApiResponse<T>`. |
| `src/core/lib/token-storage.ts` | Gestion du `localStorage/sessionStorage` et du cookie `sharepay_session`. |
| `src/core/services/auth.service.ts` | API d'authentification de haut niveau (login, register, logout, etc.). |
| `src/core/services/apps.service.ts` | Exemple de service métier suivant le même schéma. |

---

## 🛠 Comment Étendre le Système

### 1. Ajouter un nouvel endpoint
Créez une méthode dans le service approprié. Utilisez `client.<method>` avec le générique `ApiResponse<VotreType>` et appelez `parseApiResponse`. Aucune gestion d'erreur supplémentaire n'est requise au niveau du service.

### 2. Ajouter un nouveau code d'erreur
Mettez à jour `error-codes.ts` avec la nouvelle correspondance et, si nécessaire, ajoutez l'entrée i18n correspondante pour la traduction.

### 3. Modifier la politique de stockage des jetons
Modifiez `tokenStorage.ts` (par exemple pour ajouter du chiffrement) : le reste de la pile technique utilisera automatiquement la nouvelle implémentation.