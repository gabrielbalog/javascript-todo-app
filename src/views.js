import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'
const renderTodos = () => {
    const todosEl = document.querySelector('#todos')
    const { hideCompleted, searchText } = getFilters()
    const todosFiltered = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
        }
    ) 
    const incompleteTodos = todosFiltered.filter((todo) => !todo.completed)
    
    
    todosEl.innerHTML = ''
    todosEl.appendChild(generateSummaryDOM(incompleteTodos))
    
    

    if (todosFiltered.length > 0) {
        todosFiltered.forEach((todo) => {
            todosEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No to-dos to show'
        emptyMessage.classList.add('empty-message')
        todosEl.appendChild(emptyMessage)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')
    const checkbox = document.createElement('input')
    const button = document.createElement('button')

    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })
    containerEl.appendChild(checkbox)
    
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
    
    button.textContent = 'remove'
    todoEl.appendChild(button)
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })


    return todoEl
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const todoWord = incompleteTodos.length > 1 ? 'todos' : 'todo'
    summary.textContent = `You have ${incompleteTodos.length} ${todoWord} left`
    return summary
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }