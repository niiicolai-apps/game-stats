# Install

```bash
$ npm install
```

# Release
1. Ensure 7zip is installed (https://www.7-zip.org/download.html)
2. Set system env. variable: 
```bash
export PATH=$PATH:/c/Program\ Files/7-Zip
```
3. Run the release script:
```bash
$ bash release.sh
```
4. Create and publish a new release on https://github.com/niiicolai-apps/game-stats/releases/new (Remember to include the zip created in step 3)

# Usage in development

```bash
$ npm run dev
```

# Usage in other projects

## Install in other projects
Remember to replace `#1.0.0` with the needed version.
```bash
npm install --save niiicolai-apps/game-stats#1.0.0
```

## Update in other projects
```bash
npm update niiicolai-apps/game-stats
```

## Create stats

```vue
<script setup>
import GameStats from '../index.js'
import { ref, computed } from 'vue'

// 1. Create dummy player
const player = ref({ health: 100, maxHealth: 100 })

// 2. Create health stat
const onAddExperience = (options) => {
  console.log('Added experience', options.value)
}
const onLevelUp = (options) => {
  options.value.maxHealth += 10
  console.log('Leveled up', options.value)
}
const statName = 'Health'
const maxLevel = 100
const experienceMultiplier = 1.2
const experienceFirstLevel = 100
const stat = GameStats.Stat.create(
  statName,
  maxLevel,
  experienceMultiplier,
  experienceFirstLevel,
  onAddExperience,
  onLevelUp
)

// 3. Create player stat controller
const playerStatsCtrl = GameStats.Controller.create(player)
const stats = computed(() => playerStatsCtrl.stats.value)

// 4. Add health stat to player
if (!playerStatsCtrl.findByName(statName)) {
  playerStatsCtrl.add(stat)
}
</script>

<template>
  <div>
    <h1>Player Stats</h1>
    <h2>
      Health: {{ player.health }} / {{ player.maxHealth }}
    </h2>

    <div v-for="stat in stats" :key="stat.name">
      <h3>{{ stat.name }}</h3>
      <p>Level: {{ stat.level }}</p>
      <p>Experience: {{ stat.experience }}</p>
      <p>Max level: {{ stat.maxLevel }}</p>
      <p>Level Max Experience: {{ stat.maxExperience() }}</p>
      <button @click="playerStatsCtrl.addExperience(stat.name, 10)">Add 10 experience</button>
    </div>
  </div>
</template>
```