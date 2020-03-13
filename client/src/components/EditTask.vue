<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <h5 class="modal-title">Edit Task</h5>
              </div>

              <div class="modal-body">
                <form @submit.prevent="editTask">
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Task name" v-model="task_title">
                      </div>
                      <div class="form-group">
                          <select name="" v-model="task_difficulty">
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                          </select>
                      </div>
                      <button style="padding: 5px 20px;" type="submit">Submit</button>
                      <button class="mt-3" style="padding: 5px 20px;" @click="$emit('close')" type="button">Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
let heroku = `https://dry-castle-71353.herokuapp.com`
import axios from 'axios'
export default {
    props: ['task'],
    created () {
        this.task_title = this.task.title
        this.task_difficulty = this.task.difficulty
    },
    data () {
        return {
            task_title: null,
            task_difficulty: null
        }
    },
    methods: {
        editTask () {
            let editedTask = {
                "title": this.task_title,
                "category": this.task.category,
                "difficulty": this.task_difficulty
            }
            axios.put(`${heroku}/tasks`, editedTask , {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    this.$emit('close')
                    this.$emit('edit', editedTask)
                })
        }
    }
}
</script>


<style>

</style>