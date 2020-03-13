<template>
    <div class="col-3">
        <div class="card-header ml-1 mr-1">{{ category }}</div>
        <TaskBox @changeStatus="changeStatus" :tasks="tasks" :category="category" :id="boxId" style="max-height: 68vh; min-height: 40vh;" class="card-box ml-1 mr-1 overflow-auto">
            <slot />
        </TaskBox>
        <div class="card-header ml-1 mr-1">
            <a href="" id="show-modal" @click.prevent="modalTrue"><i class="material-icons">add</i></a>
        </div>
    </div>
</template>

<script>
import TaskBox from './TaskBox'
export default {
    components: {
        TaskBox
    },
    props: ['category', 'boxId', 'tasks'],
    methods: {
        modalTrue () {
            this.$emit('modalTrue', { modal: true, category: this.category })
        },
        changeStatus (data) {
            this.$emit("changeStatus", data)
        }
    }
}
</script>

<style>

</style>