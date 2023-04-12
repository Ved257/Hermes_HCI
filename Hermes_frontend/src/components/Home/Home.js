import React from "react";
import Typical from "react-typical";
import "./Home.css";
import Waves from "../Waves/Waves";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="Welcome">
                  <h1 className="Heading">Hermes</h1>
                  <h1>
                    <Typical
                      steps={[
                        "End to End Encryption",
                        1200,
                        "Keep Chats Safe",
                        1200,
                        "Sentiment Analysis",
                        1200,
                      ]}
                      loop={Infinity}
                      wrapper="p"
                    />
                  </h1>
                  <br />
                  <Link to="/signup">
                    <div className="button">Get Started</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <Waves />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
