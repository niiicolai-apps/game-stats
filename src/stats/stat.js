import { ref } from 'vue'

const stats = ref([])

const findAll = () => {
    return stats.value
}

const findByName = (name) => {
    return stats.value.find(stat => stat.name === name)
}

const create = (
        name, 
        maxLevel=100, 
        xpMultiplier=1.2, 
        xpMaxFirstLevel=100, 
        onAddExperience = (options={}) => {}, 
        onLevelUp = (options={}) => {}
    ) => {
    if (!name) throw new Error('Name is required')
    if (findByName(name)) throw new Error('Name already exists')

    const maxExperience = (level) => Math.floor(xpMaxFirstLevel * (xpMultiplier ** (level - 1)))
    const s = {
        name,
        maxLevel,
        maxExperience,
        onAddExperience,
        onLevelUp
    }
    
    stats.value.push(s)
    return s
}

const remove = (name) => {
    const index = stats.value.findIndex(stat => stat.name === name)
    if (index === -1) throw new Error('Stat not found')
    stats.value.splice(index, 1)
}

export default {
    findAll,
    findByName,
    create,
    remove
}
