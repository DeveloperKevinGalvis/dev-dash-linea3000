import LoginCss from "./loginStyle.module.css";
import LogoTemporal from "../../assets/Temporal.png";
import LogoAerocivil from "../../assets/Aerocivil.png";
import LogoMesa from "../../assets/mesaImagen.jpg";
import ModalLogin from "../../components/modalLogin/ModalLogin";
import { useState } from "react";

const LoginPage = () => {
  //CAPTURAMOS LOS DATOS DE LOS INPUTS
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      
      const data = await response.json();

      if(data.success){
        console.log("LOGIN EXITOSO", data.user)
          //GUARDAMOS SESSION
          localStorage.setItem('usuarioLogueado', JSON.stringify(data.user));
          setTimeout(() =>{
          setLoading(false);
          // Redirigir al usuario al Dashboard o panel principal
          window.location.href = '/dashboard';
          }, 15000);
      }else{
        setLoading(false);
        setErrorMsg(data.message || 'Credenciales incorrectas');
      }
      
    } catch (error) {
      setLoading(false);
      setErrorMsg('No se pudo conectar con el servidor backend');
      console.error('Error de red:', error);
    }
  }




  return (
    <>
      <section className={LoginCss.containerSection}>
        <article className={LoginCss.containerArticle}>
          {/* IMAGEN LOGIN*/}
          <figure className={LoginCss.figureContainer}>
            <img src={LogoMesa} alt="mesa ayuda" />
          </figure>
          {/* LOGIN CONTENEDOR FORMULARIO */}
          <div className={LoginCss.contianerForm}>
            <form onSubmit={handleLogin} className={LoginCss.formLogin}>
              <figure className={LoginCss.logoForm}>
                <img src={LogoTemporal} alt="LogoHeimCore" />
                <img src={LogoAerocivil} alt="LogoHeimCore" />
              </figure>
              <div className={LoginCss.containerTextForm}>
                <div className={LoginCss.gruposTextForm}>
                  <h2>Usuario</h2>
                  <input type="text"
                    placeholder="Ingrese Usuario"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                     />
                </div>
                <div className={LoginCss.gruposTextForm}>
                  <h2>Contraseña</h2>
                  <input type="text" 
                    placeholder="Ingrese Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    />
                </div>
                <div className={LoginCss.gruposTextForm}>
                  <button type="submit">Acceder</button>
                </div>
                <div className={LoginCss.soporteForm}>
                  <p>¿No tiene usuario?</p>
                  <p>¿Olvidó su contraseña?</p>
                  <p>
                    Comuníquese con el administrador del sistema en:{' '}
                    <a href="mailto:soporte@tuempresa.com">kevin.zambrano@aerocivil.gov.com</a>
                  </p>
                </div>
                <div className={LoginCss.creditosForm}>
                  <p>Desarrollado por Kevin David Zambrano Galvis</p>
                  <p>&copy;Todos los derechos reservados.</p>
                </div>
              </div>
            </form>
          </div>
        </article>
      </section>
      {loading && <ModalLogin />}

    </>
  );
}

export default LoginPage;