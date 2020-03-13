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
let heroku = `https://dry-castle-71353.herokuapp.com`
import TaskBox from './TaskBox'
import axios from 'axios'
export default {
    components: {
        TaskBox
    },
    props: ['category', 'boxId', 'tasks'],
    methods: {
        modalTrue () {
            this.$emit('modalTrue', { modal: true, category: this.category })
        },
        changeStatus (data1) {
            axios.get(`${heroku}/tasks`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(data => {
                    this.$emit("changeStatus", data.data)
                })
        }
    }
}
</script>

<style>

</style>