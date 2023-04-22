import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Load from '../layouts/Load'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../services/ServiceForm'
import Message from '../layouts/Message'
import ServiceCard from '../services/ServiceCard'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(json => {
                    setProject(json)
                    setServices(json.services)
                })
                .catch(err => console.log(err))
        }, 1000)
    }, [id])

    function crateService(project) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat
            (lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultarpassado!')
            setType('error')
            project.services.pop()
            return
        }

        //add service cost to project total cost
        project.cost = newCost

        //update project
        fetch(`http:///localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
            .then(json => {
                setShowServiceForm(false)
            })
            .catch(err => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(json => {
                setProject(json)
                setShowProjectForm(false)
                setMessage("Projeto atulaizado com sucesso!")
                setType('success')

            })
            .catch(err => console.log(err))
    }

    function removeService (id, cost) {
        const serviceUpdated = project.services.filter(
            service => service.id !== id
        )
        const projectUpdated = project

        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(projectUpdated)
            
        }).then(res => res.json())
        .then(data => {
    
            console.log(projectUpdated)
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage("Serviço removido com sucesso!")
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ?
                <div className={styles.project_details}>
                    <Container customClass="colunm">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toogleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria: </span>{project.category.name}</p>

                                    <p><span>Orçamento: </span> R${project.budget}</p>
                                    <p><span>Total utilizado: </span>{project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container} >
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toogleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && <ServiceForm
                                    handleSubmit={crateService}
                                    btnText="Adicionar serviço"
                                    projectData={project} />}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && 
                            services.map(service => (
                                <ServiceCard 
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}/>
                            ))}
                            {services.length === 0 && <p>Não há serviços!</p>}
                        </Container>
                    </Container>
                </div> :
                <Load />}
        </>

    )
}

export default Project