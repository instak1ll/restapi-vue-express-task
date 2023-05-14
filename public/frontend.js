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

        //PUT
        async markTask(taskId) {
            try {
                const task = this.tasks.find(task => task.id === taskId)
                task.completed = true
                const response = await fetch(`api/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ completed: true })
                })
                if (!response.ok) {
                    console.log('Error al marcar tarea')
                }
            } catch (error) {
                console.log(error)
            }
        },

        //DELETE
        async deleteTask(taskId) {
            try {
                const response = await fetch(`/api/tasks/${taskId}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    this.tasks = this.tasks.filter(task => task.id !== taskId)
                } else {
                    console.log('Error al eliminar tarea')
                }
            } catch (error) {
                console.error(error);
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