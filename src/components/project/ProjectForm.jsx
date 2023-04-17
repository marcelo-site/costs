import Input from '../form/Input'
import Select from '../form/Select'
import SubimitButton from '../form/Submit.jsx'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {
    return (
        <form action="" className={styles.form}>
            <Input type='text' name='name'
                text='Nome do projeto'
                placeholder='Insira o nome do projeto' />

            <Input type='number' name='budget'
                text='orçamneto do projeto'
                placeholder='Insira o orçamento projeto' />

            <Select name='category_id' text='Selcione a categoria' />

            <SubimitButton text={btnText} />

        </form>
    )
}

export default ProjectForm