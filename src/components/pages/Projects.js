import { useLocation } from 'react-router-dom'
import Message from '../layouts/Message'


import Container from '../layouts/Container'
import Load from '../layouts/Load'
import LinkButton from '../layouts/LinkButton'
import ProjectCard from '../project/ProjectCard'
import styles from './Projects.module.css'
import { useState, useEffect } from 'react'


function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMesage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) message = location.state.message
    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "COntent-Type": "application/json"
                }
            }).then(res => res.json())
                .then(json => {
                    setProjects(json)
                    setRemoveLoad(true)
                })
                .catch(err => console.log(err))
        },1 * 1000)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(json => {
                setProjects(projects.filter(project => project.id !== id))
                setProjectMessage('Projeto Removido com sucesso!')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="criar projeto" />
            </div>
            {message && <Message msg={message} type='success' />}
            {projectMesage && <Message msg={projectMesage} type='success' />}
            <Container customClass='start'>
                {projects.length > 0 && projects.map(el => (
                    <ProjectCard
                        id={el.id}
                        name={el.name}
                        budget={el.budget}
                        category={el.category.name}
                        key={el.id} 
                        handleRemove={removeProject}/>
                ))}
                {!removeLoad && <Load />}
                {removeLoad && projects.length === 0 && <p>Não há Projetos!</p>}
            </Container>
        </div>
    )
}

export default Projects