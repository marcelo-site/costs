import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubimitButton from '../form/Submit.jsx'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || [])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                setCategories(json)
            })
            .catch(err => console.log(err))
    }, [])

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    const submit = e => {
        e.preventDefault()
        handleSubmit(project)
    }
    return (
        <form onSubmit={submit} action="" className={styles.form}>
            <Input type='text' name='name'
                text='Nome do projeto'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input type='number' name='budget'
                text='orçamneto do projeto'
                placeholder='Insira o orçamento projeto'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />

            <Select name='category_id' text='Selcione a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />

            <SubimitButton text={btnText} />

        </form>
    )
}

export default ProjectForm