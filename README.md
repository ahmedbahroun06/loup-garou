# 🐺 Werewolf App

A mobile web application designed for the narrator of a **Werewolf** game. It generates a role composition, lets you adjust it before the game, distributes roles privately, and keeps a recap after the game.

The application is a **PWA**: it can be installed from a compatible browser and used just like a phone app.

## Online Demo

➡️ [Open Werewolf Narrator](https://loupgarou123.netlify.app/)

## Features

* Select the number of players, from a **minimum of 5 players** up to the number of available roles.
* Automatic generation with approximately **35% Werewolves** (rounded to the nearest integer, with at least one wolf).
* A role can only be assigned once per game.
* Review screen to check the generated roles and replace them before starting.
* Custom role creation: name, emoji, faction, and description.
* Private distribution, player by player, with tap-to-reveal.
* Random assignment of the **Captain** title.
* Different and randomized order between the review, distribution, and recap screens to prevent role order deduction.
* Final summary that persists even after closing the app.
* Dark and light theme.
* Manifest and service worker for an installable PWA experience.

## Included Roles

### Village and Other Factions

Seer, Witch, Bodyguard, Hunter, Alien, Crow, Prostitute, Wild Child, Bear, Thief, Barbie, Angel, Shepherd, Blacksmith, Elder, Detective, Monkey, Little Girl, Rider, Schoolteacher, and Wolf-Hound.

### Werewolves

Infected Father of Wolves, Blue Wolf, Black Wolf, and Simple Wolf.

Role descriptions are visible during review and distribution. Custom roles can complement this list.

## Game Flow

1. **New Game** — Choose the number of players and generate the roles.
2. **Composition** — Verify the selection, review information, replace a role, or add a custom role.
3. **Distribution** — Pass through the players. Each reveals their role on the screen, then hands the device to the next player.
4. **Narrator Recap** — Find the final composition in a newly randomized order.

The discreet "New Game" button in the recap resets the game while keeping custom roles and the chosen theme.

## Tech Stack

| Technology | Usage |
| --- | --- |
| [React 19](https://react.dev/) | User interface and application state |
| [TypeScript](https://www.typescriptlang.org/) | Code typing and reliability |
| [Vite](https://vite.dev/) | Development server and production build |
| [Oxc](https://oxc.rs/) / Oxlint | Static code analysis |
| Web App Manifest + Service Worker | Installation and PWA foundation |
| `localStorage` | Local storage for the game, custom roles, and theme |

The project uses neither a database nor user accounts: data remains in the narrator's device browser.

## Running the Project Locally

### Prerequisites

* [Node.js](https://nodejs.org/) 20 or higher
* npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/ahmedbahroun06/loup-garou.git
cd loup-garou
npm install

```

### Available Commands

```bash
# Run the application in development mode
npm run dev

# Create the production build in the dist/ folder
npm run build

# Check the code
npm run lint

# Preview the production build
npm run preview

```

## Deployment

The project is a static site. After running `npm run build`, simply publish the `dist/` folder to a static hosting provider such as Netlify, Vercel, Cloudflare Pages, or GitHub Pages.

For Netlify Drop: log in to Netlify, open the manual deploy page, then drop the `dist/` folder. A custom site name allows you to get a readable address such as `narrateur-loup-garou.netlify.app`.

## Project Structure

```text
src/
├── components/     # Modals and reusable components
├── data/           # Role catalog and faction labels
├── lib/            # Generation, shuffling, and local persistence
├── screens/        # The four screens of the game flow
├── App.tsx         # State orchestration and navigation
└── types.ts        # Shared TypeScript types
public/
├── manifest.json   # PWA metadata
└── sw.js           # Service worker

```

## Data and Privacy

All data is stored exclusively in the browser via `localStorage`. Clearing the site's data in the browser will delete the current game, custom roles, and saved theme.

## License

Personal project.
