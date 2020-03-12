<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <h5 class="modal-title">Add Task</h5>
              </div>

              <div class="modal-body">
                <form @submit.prevent="addTask">
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
import axios from 'axios'
export default {
    data () {
        return {
            task_title: null,
            task_difficulty: null
        }
    },
    methods: {
        addTask () {
            axios.post(`http://localhost:3000/tasks`, {
                "title": this.task_title,
                "difficulty": this.task_difficulty
            }, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(task => {
                    let newTask = task.data
                    this.$emit('close')
                    this.$emit('add', newTask)
                })
        }
    }
}
</script>


<style>

</style>