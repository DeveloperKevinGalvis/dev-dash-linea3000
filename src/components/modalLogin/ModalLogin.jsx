import ModalCss from "./modalLoginStyle.module.css";
import AnimationRobot from "../../assets/robotMesa.svg";
const ModalLogin = () => {
    return(<>
      <div className={ModalCss.containerModal}>
          <div className={ModalCss.modalLogin}>
              <figure className={ModalCss.spinnerLogin}>
                <img src={AnimationRobot} alt="Logn" />
              </figure>
              <div className={ModalCss.textModalLogin}>
                  <h2>Autenticando en curso, favor esperar</h2>
              </div>
          </div>
      </div>
    
    </>);
}

export default ModalLogin;