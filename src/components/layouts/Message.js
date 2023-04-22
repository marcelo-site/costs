import styles from './Message.module.css'
import { useState, useEffect } from 'react'

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) return setVisible(false)

        setVisible(true)

        const timer = 
        setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
        // return setVisible(false)
        // return msg = ''
        // return
    }, [msg])
    return (
        <>
            {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message