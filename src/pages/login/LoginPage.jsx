import LoginCss from "./loginStyle.module.css";
import LogoTemporal from "../../assets/Temporal.png";
import LogoAerocivil from "../../assets/Aerocivil.png";
const LoginPage = () => {
  return (
    <>
      <section className={LoginCss.containerSection}>
        <article className={LoginCss.containerArticle}>
            {/* IMAGEN LOGIN*/}
            <figure className={LoginCss.figureContainer}>

            </figure>
            {/* LOGIN CONTENEDOR FORMULARIO */}
            <div className={LoginCss.contianerForm}>
              <form action="" className={LoginCss.formLogin}>
                <figure className={LoginCss.logoForm}>
                  <img src={LogoTemporal} alt="LogoHeimCore" />
                  <img src={LogoAerocivil} alt="LogoHeimCore" />
                </figure>
                <div className={LoginCss.containerTextForm}>

                </div>
              </form>
            </div>
        </article>
      </section>
    </>
  );
}

export default LoginPage;