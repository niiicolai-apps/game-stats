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
