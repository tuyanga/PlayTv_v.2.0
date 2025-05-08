import styles from "./landing.module.css"

export default function Landing() {
return(
    <div>
        <div className={styles.container}>
            <div className={styles.myHeader}>
                <div className={styles.logo}><a href="#">PlayTV</a></div>
                <button className={styles.loginBtn}>НЭВТРЭХ</button>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <a>PREMIUM БАГЦ</a>
                    <h4>БҮХ КИНО</h4>
                    <h4>БҮХ ТВ СУВГУУД</h4>
                    <h4>19,900₮/сар</h4>
                </div>
                <div className={styles.content}>
                    <a>BASIC БАГЦ</a>
                    <h4>ХОЛЛИВУД КИНО</h4>
                    <h4>СОЛОНГОС КИНО</h4>
                    <h4>ҮНДСЭН ТВ СУВГУУД</h4>
                    <h4>4,900₮/сар</h4>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <a>ХЭРВЭЭ ТА БҮРТГҮҮЛЭХ БОЛ УТАСНЫ ДУГААРААР БҮРТГҮҮЛНЭ ҮҮ</a>
                <div style={{display: "flex", gap: "5px"}}>
                    <div className={styles.signUpBox}>
                        <input type="text" placeholder="Утасны дугаар"/>
                    </div>
                    <button className={styles.signUpBtn}>БҮРТГҮҮЛЭХ</button>
                </div>
            </div>

            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            
        </div>
    </div>
)
}