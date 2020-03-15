<template>
    <!-- <div @dragover="dragOver" @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop"> -->
    <div :id="id" @dragenter="dragEnter" @dragleave="dragExit" @dragover.prevent @drop.prevent="drop" >    
        <slot />
    </div>
</template>

<script>
let heroku = `https://dry-castle-71353.herokuapp.com`
import Vue from 'vue'
import axios from 'axios'
export default {
    props: ['category', 'tasks', 'id'],
    methods: {
        dragEnter (e) {
            if (e.target.id[e.target.id.length-1] === "y") {
                e.target.style.backgroundColor = "green"
            }
        },
        dragExit(e) {
            e.target.style.backgroundColor = "#f7f7f7"
        },
        drop (e) {
            const card_id = e.dataTransfer.getData('card_id')
            const card = document.getElementById(card_id)
            const box = document.getElementById(e.target.id)
            // let currentHeight = Number(box.style.minHeight.split('').filter(x => x > 0).join(''))
            box.style.backgroundColor = "#f7f7f7"
            card.style.display = "flex"
            e.target.appendChild(card)

            let task = this.tasks.filter(task => task.id === Number(card_id))[0]
            
            axios.put(`${heroku}/tasks/${task.id}`, {
                "title": task.title,
                "difficulty": task.difficulty,
                "category": this.category
            }, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    this.$emit('changeStatus', {category: this.category, id: card_id})
                })
            
        },
    }
}
</script>
