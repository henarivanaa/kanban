<template>
    <div :draggable="draggable" :id="id" @dragstart="dragStart" @dragover.stop v-if="task.category === category" style="height: 107px;" class="card shadow task mt-3 mb-4 ml-3 mr-3">
        <div @click="modalEditTrue(task)" class="card-body">
            <div class="d-flex">
                <span class="card-label card-label-blue" title="0"></span>
            </div>
            <p class="card-text">{{ task.title }}</p>
        </div>
        
            <a :draggable="false" @click="deleteTask(task.id)" class="ml-4" href="#"><i class="material-icons text-danger">delete</i></a>
        
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