
import Logo from '../../Images/Login-trivias.jpg'

function Principal() {
          
          return (
            <div
                className=" form-group row col-lg-12"
              >
                <div
                  className=" form-group col-lg-12"
                  style={{
                    height:window.innerHeight,
                    backgroundColor: "black"
                  }}
                >
                  <img
                    src={Logo}
                    style={{
                      backgroundSize: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>       
              </div>
          )
}

export default Principal
