//Vue Components
/*
Vue.component('notes', {
    template: `
        <div class="container">
            <div class="logo-header">
                <div class="logo" id="keep" @click="tasks=false">
                    <img src="assets/images/google_keep.png" alt="Google Keep">
                    <p :style="{'color': '#f3b342'}">Keep</p>
                </div>
                <span><i class="fa fa-plus"></i></span>
                <div class="logo" id="vue" :style="{'cursor': 'unset'}">
                    <img src="assets/images/Vue_and_Firebase.png" alt="Vue and Firebase">
                    <p :style="[{'width': '200%'}, {'left': '-50%'}, {'bottom': '-30px'}, {'color': '#5BBF8B'}]">Made with Vue and Firebase</p>
                </div>
                <span><i class="fa fa-plus"></i></span>
                <div class="logo" id="tasks" @click="tasks=true">
                    <img src="assets/images/google_tasks.png" alt="Google Tasks">
                    <p :style="{'color': '#417EEA'}">Tasks</p>
                </div>
            </div>
            <new-note v-if="!tasks" @create-note="createNote"></new-note>
            <new-tasks v-if="tasks" @create-tasks="createTasks"></new-tasks>
            <div class="notes">
                <p v-if="!notes.length" class="no-notes">Notes you add appear here</p>
                <div v-if="notes.length" class="row">
                    <note v-for="note in notes" :key="note.id" :info="note" @delete-note="deleteNote" 
                        @update-note="updateExistingNote" @add-task="addTask" @delete-completed="deleteCompleted"></note>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            notes: [],
            tasks: false
        }
    },
    mounted(){
        firebase.database().ref().once('value', (notes) => {
            notes.forEach((note) => {
                this.notes.push({
                    id: note.child('id').val(),
                    title: note.child('title').val(),
                    tasks: note.child('tasks').val(),
                    contents: (note.child('tasks').val() && !note.child('contents').val()) ? [] : note.child('contents').val()
                })
            })
        })
    },
    methods: {
        createNote(info) {
            const newNote = { title: info.title, contents: info.contents, id: info.id, tasks: false };
            this.notes.push(newNote);
            firebase.database().ref(info.id).set({
                title: info.title,
                contents: info.contents,
                id: info.id,
                tasks: false
            });
        },
        deleteNote(info) {
            this.notes = this.notes.filter(function (value) { return value != info })
            firebase.database().ref(info.id).remove()
        },
        updateExistingNote(info) {
            firebase.database().ref(info.id).update({
                title: info.title,
                contents: info.contents,
                id: info.id
            })
        },
        createTasks(info) {
            const newTasks = { title: info.title, contents: info.contents, id: info.id, tasks: info.tasks };
            this.notes.push(newTasks);
            firebase.database().ref(info.id).set({
                title: info.title,
                contents: info.contents,
                id: info.id,
                tasks: info.tasks
            });
        },
        addTask(info){
            j = 0
            for (i=0; i<this.notes.length; i++){
                if (this.notes[i] == info){
                    j = i
                }
            }
            this.notes[j].contents.push({
                completed: false,
                taskName: "",
                checkHovered: false
            })
        },
        checkCompleted(task){
            if (!task.completed){
                return task
            }
        },
        deleteCompleted(info){
            j = 0
            for (i=0; i<this.notes.length; i++){
                if (this.notes[i] == info){
                    j = i
                }
            }
            this.notes[j].contents = this.notes[j].contents.filter(this.checkCompleted)
        }
    }
})

Vue.component('note', {
    props: ['info'],
    template: `
        <div class="col-lg-3 col-md-6 note">
            <div v-if="!info.tasks" class="note-wrapper" @mouseover="hovered=true" @mouseout="hovered=false" data-toggle="modal" :data-target="targetId">
                <button v-bind:style="[(hovered) ? {'opacity': '1'} : {'opacity': '0'}]"><i class="fas fa-pen"></i></button>
                <h3 v-if="!info.title && !info.contents">Empty note</h3>
                <h2 v-if="info.title">{{info.title}}</h2>
                <p v-if="info.contents" v-bind:style="[(!info.title) ? {'padding-top': '12px'} : {'padding-top': '0px'}]">{{info.contents}}</p>
            </div>
            <div v-if="!info.tasks" :id="info.id" class="modal fade" tabindex="-1" role="dialog" @click="updateNote"
                :aria-labelledby="ariaId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <input v-model="info.title" placeholder="Title">
                        </div>
                        <div class="modal-body">
                            <textarea v-model="info.contents" placeholder="Take a note..."></textarea>
                        </div>
                        <div class="footer">
                            <button @click="deleteNote" class="delete-button" data-dismiss="modal" aria-label="Close"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button @click="updateNote" class="close-button" data-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="info.tasks" class="note-wrapper" @mouseover="hovered=true" @mouseout="hovered=false" data-toggle="modal" :data-target="targetId">
                <button v-bind:style="[(hovered) ? {'opacity': '1'} : {'opacity': '0'}]"><i class="fas fa-pen"></i></button>
                <h3 v-if="!info.title && !info.contents.length">Empty Tasks</h3>
                <h2 v-if="info.title">{{info.title}}</h2>
                <h2 v-if="!info.title && info.contents.length" :style="{'color': '#80868B'}">Untitled List</h2>
                <div class="tasks-wrapper" :style="[(!info.title) ? {'padding-top': '12px'} : {'padding-top': '0px'}]">
                    <div class="task" v-for="task in info.contents">
                        <div class="checkbox" @mouseenter="task.checkHovered=true" @mouseleave="task.checkHovered=false" @click="task.completed = !task.completed">
                            <div class="checkbox-icon" v-if="(!task.checkHovered && !task.completed)"></div>
                            <div class="check" v-if="(task.checkHovered || task.completed)"><i class="fas fa-check"></i></div>
                        </div>
                        <p class="task-name" :style="[(task.completed) ? {'text-decoration': 'line-through', 'color': '#80868B'} : {'text-decoration': 'none', 'color': 'black'}]">{{task.taskName}}</p>
                    </div>
                </div>
            </div>
            <div v-if="info.tasks" :id="info.id" class="modal fade" tabindex="-1" role="dialog" @click="updateNote"
                :aria-labelledby="ariaId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <input v-model="info.title" placeholder="Title">
                        </div>
                        <div class="modal-body">
                            <div class="task" v-for="task in info.contents">
                                <div class="checkbox" @mouseenter="task.checkHovered=true" @mouseleave="task.checkHovered=false" @click="task.completed = !task.completed">
                                    <div class="checkbox-icon" v-if="(!task.checkHovered && !task.completed)"></div>
                                    <div class="check" v-if="(task.checkHovered || task.completed)"><i class="fas fa-check"></i></div>
                                </div>
                                <input class="task-name" v-model="task.taskName" :style="[(task.completed) ? {'text-decoration': 'line-through', 'color': '#80868B'} : {'text-decoration': 'none', 'color': 'black'}]" placeholder="Add a task...">
                            </div>
                            <div class="add-task" @click="addTask">
                                <span class="add-icon"><i class="fa fa-plus"></i></span>
                                <p>Add a task</p>
                            </div>
                        </div>
                        <div class="footer">
                            <button @click="deleteNote" class="delete-button" data-dismiss="modal" aria-label="Close"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button @click="updateNote" class="close-button" data-dismiss="modal" aria-label="Close">Close</button>
                            <button class="delete-completed" @click="deleteCompleted">Delete Completed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            ariaId: null,
            targetId: null,
            hovered: false
        }
    },
    mounted() {
        this.ariaId = this.info.id + 'Label'
        this.targetId = '#' + this.info.id
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note', this.info)
        },
        updateNote() {
            this.$emit('update-note', this.info)
        },
        addTask(){
            this.$emit('add-task', this.info)
        },
        deleteCompleted(){
            this.$emit('delete-completed', this.info)
        }
    }
})

Vue.component('new-note', {
    template: `
        <div class="new-note">
            <input v-model="note.title" @mousedown="editingTitle=true" @blur="editingTitle=false; newNote()" v-if="(editingNote || editingTitle)" placeholder="Title">
            <textarea v-model="note.contents" @mousedown="editingNote=true" @blur="editingNote=false; newNote()" v-bind:style="[(!editingNote && !editingTitle) ? {'font-size': '1rem !important', 'font-weight': '600 !important'} : {'font-size': '0.875rem !important', 'font-weight': '400 !important'}]" placeholder="Take a note..."></textarea>
            <div v-if="(editingNote || editingTitle)" class="nn-footer">
                <button class="nn-close-button" @click="editingTitle=false; editingNote=false">Close</button>
            </div>
        </div>
    `,
    data() {
        return {
            note: {
                title: "",
                contents: "",
                id: 'n' + Date.now(),
                tasks: false
            },
            editingTitle: false,
            editingNote: false
        }
    },
    methods: {
        newNote() {
            if (!this.editingTitle && !this.editingNote && (this.note.title || this.note.contents)) {
                this.$emit('create-note', this.note)
                this.note.title = ""
                this.note.contents = ""
                this.note.id = 'n' + Date.now()
                this.note.tasks = false
            }
        }
    }
})

Vue.component('new-tasks', {
    template: `
        <div class="new-tasks">
            <input v-if="(editingTasks || editingTitle)" class="title" v-model="tasks.title" @mousedown="editingTitle=true" placeholder="Title">
            <div class="tasks-wrapper" @mousedown="editingTasks=true" :style="[!(editingTasks || editingTitle) ? {'padding-bottom': '16px'} : {'padding-bottom': '30px'}]">
                <div class="task" v-for="task in tasks.contents">
                    <div class="checkbox" @mouseenter="task.checkHovered=true" @mouseleave="task.checkHovered=false" @click="task.completed = !task.completed">
                        <div class="checkbox-icon" v-if="(!task.checkHovered && !task.completed)"></div>
                        <div class="check" v-if="(task.checkHovered || task.completed)"><i class="fas fa-check"></i></div>
                    </div>
                    <input class="task-name" v-model="task.taskName" :style="[(task.completed) ? {'text-decoration': 'line-through', 'color': '#80868B'} : {'text-decoration': 'none', 'color': 'black'}]" placeholder="Add a task...">
                </div>
                <div class="add-task" @click="addTask">
                    <span class="add-icon"><i class="fa fa-plus"></i></span>
                    <p>Add a task</p>
                </div>
            </div>
            <div class="nn-footer" v-if="(editingTasks || editingTitle)">
                <button class="delete-completed" @click="deleteCompleted">Delete Completed</button>
                <button class="nn-close-button" @click="editingTitle=false; editingTasks=false; newTasks()">{{closeButton}}</button>
            </div>
        </div>
    `,
    data() {
        return {
            tasks: {
                title: "",
                contents: [],
                id: 'n' + Date.now(),
                tasks: true
            },
            editingTitle: false,
            editingTasks: false
        }
    },
    methods: {
        newTasks() {
            if (this.tasks.title || this.tasks.contents.length) {
                this.$emit('create-tasks', this.tasks)
                this.tasks.title = ""
                this.tasks.contents = []
                this.tasks.id = 'n' + Date.now()
                this.tasks.tasks = true
            }
        },
        addTask(){
            this.tasks.contents.push({
                completed: false,
                taskName: "",
                checkHovered: false
            })
        },
        checkCompleted(task){
            if (!task.completed){
                return task
            }
        },
        deleteCompleted(){
            this.tasks.contents = this.tasks.contents.filter(this.checkCompleted)
        }
    },
    computed: {
        closeButton: function(){
            if (this.tasks.contents.length){
                return "Add"
            }
            return "Close"
        }
    }
})

//Vue Instance
var app = new Vue({
    el: '#app'
})

*/


Vue.component('search-menu', {
    template: `
        <div class="search-menu" :style="[(isActive) ? {'top': '0', 'margin': '0', 'border-radius': 'unset'} : {'top': '50%', 'margin': '0 1rem', 'border-radius': '1rem'}]">
            <form onsubmit="return false">
                <div class="row">
                    <div class="button-wrapper col-md-4 col-12 form-group" id="searchbar">
                        <input placeholder="Search..."></input>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="charity-type">
                        <select class="form-control">
                            <option disabled selected>Type</option>
                            <option>Food Bank</option>
                            <option>Youth Shelter</option>
                            <option>Womans Shelter</option>
                            <option>Mens Shelter</option>
                            <option>Clothing Donations</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="transport">
                        <select class="form-control">
                            <option disabled selected>Transportation</option>
                            <option>Walking</option>
                            <option>Biking</option>
                            <option>Car/Taxi</option>
                            <option>Bus</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-2 col-12" id="go-btn">
                        <button type="submit" class="btn" @click="isActive=true; emitActive()">Go</button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data() {
        return{
            isActive: false
        }
    },
    methods: {
        emitActive(){
            this.$emit('active')
        }
    }
})

Vue.component('app', {
    template: `
        <div :class="[isActive ? 'app' : 'container app']">
            <search-menu @active="handleActive"></search-menu>
        </div>
    `,
    data() {
        return{
            isActive: false
        }
    },
    methods: {
        handleActive(){
            this.isActive = true
        }
    }
})

//Vue Instance
var app = new Vue({
    el: '#app'
})