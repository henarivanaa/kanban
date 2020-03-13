<template>
    <div @click="modalEditTrue(task)" :draggable="draggable" :id="id" @dragstart="dragStart" @dragover.stop  v-if="task.category === category" class="card shadow task mt-2 mb-2 ml-3 mr-3">
        <div class="card-body">
            <div class="d-flex">
                <span class="card-label card-label-blue" title="0"></span>
            </div>
            <p class="card-text">{{ task.title }}</p>
            <a @click="deleteTask(task.id)" href="#" id="delete-button"><i class="material-icons text-danger">delete</i></a>
        </div>
    </div>
</template>

<script>
let heroku = `https://dry-castle-71353.herokuapp.com`
import Vue from 'vue'
import axios from 'axios'
export default {
    props: ['task', 'category', 'id', 'draggable'],
    methods: {
        dragStart (e) {
            const target = e.target

            e.dataTransfer.setData('card_id', target.id)

            setTimeout(() => {
                target.style.display = "none"
            }, 0)
        },
        deleteTask(id) {
            axios.delete(`${heroku}/tasks/${id}`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    this.$emit('delete', id)
                })
        },
        modalEditTrue(task) {
            this.$emit('modalEditTrue', { modal: true, task: task })
        }
    }
}
</script>