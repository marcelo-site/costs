import styles from './Submit.module.css'

function SubimitButton ({ text}) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubimitButton