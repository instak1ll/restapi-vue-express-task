new Vue({
    el: '#app',
    data() {
        return {
            tasks: [],
            newTask: ''
        }
    },
    methods: {

        //POST
        async addTask() {
            if (this.newTask.trim() === '') {
                return
            }
            const task = {
                name: this.newTask,
                completed: false
            }
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                if (response.ok) {
                    const data = await response.json()
                    this.tasks.push(data)
                    this.newTask = ''
                } else {
                    console.error('Error al agregar tarea')
                }
            } catch (error) {
                console.log(error)
            }
        },

        //GET
        async loadTasks() {
            try {
                const response = await fetch('/api/tasks')
                if (response.ok) {
                    const data = await response.json()
                    this.tasks = data
                } else {
                    console.log('Error al cargar tareas')
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.loadTasks()
    }
})