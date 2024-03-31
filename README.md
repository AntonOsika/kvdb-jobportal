# kvdb-jobportal

AGI Jobs

A clean AI Jobboard

Use KVDB

User can:
- See all jobs as a table (use the list keys command `curl https://kvdb.io/N7cmQg1DwZbADh2Hu3NncF/     -u 'jobs:'`, then get each resource one by one)
- Upload resource (using post to kvdb), triggering a modal that can be filled

Each resource has a title, description, and URL

Show a picture from https://source.unsplash.com/random/?portrait%20professional on the modal for the job

Anyone can edit or delete a resource

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/kvdb-jobportal.git
cd kvdb-jobportal
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
