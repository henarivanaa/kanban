<template>
    <div v-if="task.category === category" class="card shadow task mt-2 mb-2 ml-3 mr-3" id="task.id">
        <div class="card-body">
            <div class="d-flex">
                <span class="card-label card-label-blue" title="0"></span>
            </div>
            <!-- <h5 class="card-title">Bambang</h5> -->
            <p class="card-text">{{ task.title }}</p>
            <a @click="deleteTask(task.id)" href="#" id="delete-button"><i class="material-icons text-danger">delete</i></a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['task', 'category', 'draggable'],
    methods: {
        dragStart: e => {
            const target = e.target

            e.dataTransfer.setData('card_id', target.id)

            setTimeout(() => {
                target.style.display = "none"
            }, 0)
        },
        deleteTask(id) {
            axios.delete(`http://localhost:3000/tasks/${id}`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    this.$emit('delete', id)
                })
        }
    }
}
</script>