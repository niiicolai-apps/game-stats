import { ref } from 'vue'

const create = (options={}) => {
    const stats = ref([])

    const findByName = (name) => {
        return stats.value.find(stat => stat.name === name)
    }

    const add = (stat, level=1, experience=0) => {
        if (!stat) throw new Error('Stat is required')
        if (findByName(stat.name)) throw new Error('Name already exists')

        const s = {
            level,
            experience,
            name: stat.name,
            maxLevel: stat.maxLevel,
            onAddExperience: stat.onAddExperience,
            onLevelUp: stat.onLevelUp
        }

        s.maxExperience = () => stat.maxExperience(s.level)
        stats.value.push(s)
        
        return s
    }

    const remove = (name) => {
        const index = stats.value.findIndex(stat => stat.name === name)
        if (index === -1) throw new Error('Stat not found')
        stats.value.splice(index, 1)
    }

    const addExperience = (name, experience) => {
        const stat = findByName(name)
        if (!stat) throw new Error('Stat not found')
        if (stat.level >= stat.maxLevel) return

        stat.experience += experience
        if (stat.experience >= stat.maxExperience()) {
            stat.experience = 0
            stat.level++
            stat.onLevelUp(options)
        }
        stat.onAddExperience(options)
    }

    return {
        stats,
        add,
        remove,
        addExperience,
        findByName
    }
}

export default {
    create
}
