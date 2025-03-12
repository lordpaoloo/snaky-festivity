# Snaky Festivity

## Project Overview

Snaky Festivity is a fun and interactive snake game built with modern web technologies. The game includes a special birthday celebration feature when the player reaches a specific level.

## Project Structure

The project is organized into several key parts:

- **Components**: Reusable UI components used throughout the application.
- **Hooks**: Custom hooks for managing game logic and state.
- **Styles**: Tailwind CSS configuration and custom styles.
- **Utilities**: Utility functions for common tasks.

### Key Files and Directories

- **`/src/components`**: Contains all the React components used in the game.
  - **`SnakeGame.tsx`**: The main game component that ties everything together.
  - **`GameBoard.tsx`**: Renders the game board and the snake.
  - **`GameControls.tsx`**: Provides controls for starting, pausing, and resetting the game.
  - **`GameStatus.tsx`**: Displays the current score and level.
  - **`BirthdayCelebration.tsx`**: Handles the birthday celebration animation and sound.
- **`/src/hooks`**: Contains custom hooks.
  - **`useSnakeGame.ts`**: Manages the game state and logic.
  - **`useSwipeControls.ts`**: Adds swipe controls for mobile devices.
- **`/src/styles`**: Contains the Tailwind CSS configuration and custom styles.
  - **`index.css`**: Main CSS file with custom properties and styles.
- **`/src/lib`**: Utility functions.
  - **`utils.ts`**: Contains utility functions like `cn` for class name merging.

## Customization

### Changing the Birthday Level and Name

To customize the level at which the birthday celebration occurs and the name displayed, you need to modify the following constants in the `useSnakeGame` hook:

1. **Birthday Level**: Change the `BIRTHDAY_LEVEL` constant.
2. **Name**: Change the name in the `BirthdayCelebration` component.

#### Step-by-Step Instructions

1. **Open the `useSnakeGame.ts` file**:
   ```typescript
   // filepath: /src/hooks/useSnakeGame.ts
   const BIRTHDAY_LEVEL = 22; // Change this to your desired level
   ```

2. **Open the `BirthdayCelebration.tsx` file**:
   ```tsx
   // filepath: /src/components/BirthdayCelebration.tsx
   <h2 className="text-3xl font-bold text-purple-700 mb-2 animate-birthday-bounce">
     Happy Birthday Omer! // Change "Omer" to the desired name
   </h2>
   ```

## Running the Project

To run the project locally, follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/lordpaoloo/snaky-festivity.git

# Step 2: Navigate to the project directory.
cd snaky-festivity

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```


## Deployment

Deploy the project using platforms like Netlify or Vercel. Refer to their documentation for detailed instructions.

## Custom Domain

You can use custom domains with platforms like Netlify or Vercel. Refer to their documentation for detailed instructions.

