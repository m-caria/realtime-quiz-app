# Realtime Quiz App

Progetto test per gestire delle quiz room in realtime.

## Requisiti

- Avere installato l'SDK [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Avere installato npm/yarn/pnpm

## Avvio

- Avviare il progetto server: `dotnet run --project server/MinimalAPI/MinimalAPI.csproj`
- Avviare il progetto client: `cd client && pnpm dev` | `cd client && yarn dev` | `cd client && npm run dev`

## Regole

- Per poter giocare è necessario indicare un nome utente
- Chiunque ha la possibilità di creare una stanza di gioco scegliendo il numero massimo di giocatori
- Chiunque può accedere ad una stanza di gioco purché ci sia ancora spazio
- Nella stanza di gioco solamente l'owner può creare delle domande
- Per poter rispondere alla domanda è necessario prenotarsi (premendo il pulsante "RISPONDI!")
- Quando l'owner crea una domanda partirà un timer di 30s che sarà il tempo consentito per poter rispondere, scaduto il tempo l'owner potrà creare una nuova domanda
- Quando si dà una risposta l'owner può accettarla o rifiutarla, se la risposta viene accettata l'utente che ha risposto guadagna un punto. Nel caso in cui venisse rifiutata partirà nuovamente il timer ma questa volta ci saranno solamente 10 secondi per poter rispondere. L'utente che ha dato la risposta errata non potrà rispondere per questo turno
- Vince chi darà per primo 5 risposte giuste

## Stack Tecnologico

### Client

Il front end è sviluppato con framework principale React (TypeScript).
Librerie utilizzate:

- **@microsoft/signalr | react-signalr**: comunicazione in realtime con il back end
- **wretch**: fetch wrapper per effettuare delle chiamate verso il back end
- **@reduxjs/toolkit**: tool per la gestione dello stato
- **fontawesome**: icone
- **tailwindcss**: styling
- **moment**: gestione data e ora
- **react-hook-form**: gestione dei forms
- **vitest**: testing

### Struttura Progetto

Il progetto è strutturato come segue:

- **components** (tutti i componenti UI)
  - **atoms**
  - **molecules**
- **contexts**
- **hooks**
- **pages** (tutte le pagine definite nelle routes)
  - **(scope)** (nome della pagina)
    - **components** (componenti relativi la pagina)
    - **(scope).tsx** (pagina)
- **providers**
- **routes**
- **store** (configurazione dello stato)
  - **(scope)** (actions, reducers, thunks, chiamate api, selectors e hooks relativi allo scope)git
- **types**

### Server

Il back end è sviluppato con framework .NET 8 (MinimalAPI) e C# 12.
Librerie utilizzate:

- **Microsoft.AspNetCore.OpenApi | Swashbuckle.AspNetCore**: tool per la generazione dello swagger
- **Microsoft.AspNetCore.SignalR.Common**: comunicazione realtime per il client
- **Microsoft.Data.Sqlite.Core**: database SQLite in memory
- **Microsoft.EntityFrameworkCore**: tool per facilitare la comunicazione con il database

### Struttura Progetto

Il progetto è strutturato come segue:

- **Data**
  - **Entities** (tutte le tabelle del database)
  - **CQRS** (CQRS e RDP per interagire facilmente con il database)
  - **EntitiesConfigurations** (configurazioni fluent per le tabelle)
  - **\*DbContext.cs**
- **Endpoints** (tutti gli endpoints del progetto)
  - **(Scope)** (tutte le funzioni che definiscono gli endpoints relativi allo scope)
  - **(Scope)Endpoints.cs** (configurazione di tutti gli endpoints relativi allo scope)
- **ErrorMapping** (mappatura degli errori personalizzati)
- **Extensions** (estensioni per servizi)
- **Hubs** (contiene gli hubs per la comunicazione in realtime)
- **Middlewares** (custom middlewares)
- **Models** (contiene tutti i DTO per la comunicazione con il client)
- **Services** (contiene tutti i servizi che fanno da ponte tra database ed endpoint)
- **Settings**
- **Utils**

### Note

Il progetto è stato sviluppato in circa 36 ore per cui potrebbe sicuramente avere qualche bug.
E' stato creato un test indicativo sia lato front end che lato back end.
