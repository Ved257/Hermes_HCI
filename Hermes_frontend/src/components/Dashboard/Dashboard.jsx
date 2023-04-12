import React, { useState } from "react";
import "./Dashboard.css";
import Logout from "../../assets/logout.svg";
import Message1 from "../Message/Message1";
import Message2 from "../Message/Message2";
import CryptoJS from "crypto-js";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { SocketContext } from "../../context/socket";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Link } from "react-router-dom";
import cookie from 'react-cookies'


const Dashboard = () => {
  const [mic, setMic] = useState("mic-off");

  const {
    transcript,
    // listening,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const toggleMic = () => {
    if (mic === "mic") {
      setMic("mic-off");
      SpeechRecognition.stopListening();
    }
    if (mic === "mic-off") {
      setMic("mic");
      setMessage(transcript);
      document.getElementById("msg").innerHTML = message;
      console.log(transcript);
      SpeechRecognition.startListening();
    }
  };

  const [messages, setMessages] = useState([]);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [dropdownVisiblity, setDropdownVisibility] = useState("hidden");
  const [secret, setSecret] = useState("");
  const [group, setGroup] = useState("");
  const [state, setState] = useState("")
  const [line, setLine]=useState("")
  // const [sentiment, setSentiment] = useState("")
  const [message, setMessage] = useState("");
  const socket = React.useContext(SocketContext);
  const [data, setData] = useState("")

  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const date = `${new Date().getDate()} ${month} , ${new Date().getFullYear()}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Analyse = async() => {
    // const [data, setData] = useState("");
    const [str, setStr] = useState("")
    messages.forEach(message => {
      setStr(str+message)
    });
    console.log(str)
    };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setupListeners = () => {
    if (secret !== "") {
      socket.on("msg", (msg) => {
        msg.self = false;
        const decryptedText = CryptoJS.AES.decrypt(
          msg.message,
          secret
        ).toString(CryptoJS.enc.Utf8);
        console.log("encrypted", msg.message);
        console.log("secret", secret);
        console.log("decryptedText", decryptedText);
        msg.message = decryptedText;
        setMessages((messages) => [...messages, msg]);
        setLine(line+" "+msg.message)
        console.log(line)

        // console.log(str)
      });

      socket.on("status", (msg) => {
        alert(msg);
      });
    }
  };

  useEffect(() => {
    console.log("secret", secret);
    setupListeners();
  }, [secret, setupListeners]);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (dropdownVisiblity === "hidden") {
      setDropdownVisibility("visible");
    } else {
      setDropdownVisibility("hidden");
    }
  };

  const joinGroup = () => {
    const group = document.getElementById("group").value;
    socket.emit("join", group);

    const groupName = document.getElementById("groupName");
    groupName.innerHTML = group;

    const grpName = document.getElementById("grpName");
    grpName.innerHTML = group;

    const sec = document.getElementById("secret").value;
    setSecret(sec);
    setGroup(group);
    setState(user.username+" Has joined the chat")
  };

  const focusSecret = () => {
    const secret = document.getElementById("secret");
    secret.focus();
  };

  const focusGroup = () => {
    const group = document.getElementById("group");
    group.focus();
  };

  const sendMessage = () => {
    const message = document.getElementById("msg").value;
    document.getElementById("msg").value = "";
    console.log(message);
    setLine(line+" "+message)
    console.log(line)
  

    const encryptedText = CryptoJS.AES.encrypt(message, secret).toString();
    console.log("encryptedText", encryptedText);

    const time = new Date().toLocaleTimeString([], {
      timeStyle: "short",
    });

    const name = user.username;
    const msg = {
      name,
      message: encryptedText,
      time,
      self: true,
    };

    socket.emit("msg", msg);
    msg.message = message;
    setMessages([...messages, msg]);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (localStorage.getItem("token") === null) {
    window.location = "/login";
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/user", {
        params: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser({
          username: res.data.user,
          email: res.data.email,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    Analyse();
    let id=line
    console.log(id)
    axios
    .get(`http://localhost:5000/analyse/${id}`, {
    })
    .then((res) => {
      setData(res.data);
    });
    let SendReq = async(e) =>{
      e.preventDefault();
    //    axios
    //  .get(`http://localhost:5000/analyse/${id}`, {
    //  })
    //  .then((res) => {
    //    setData(res.data);
    //  });
    }
    
    console.log(data);
    cookie.save('sentiment',data.message,{ path: "/" })
    SendReq()
  }, [Analyse, data, line]);


  // messages.forEach(message => {
  //   setStr([...str, message])
  // });
  
  return (
    <div>
      <nav className="relative header flex flex-wrap items-center justify-between px-2 lg:px-10 xl:px-12 2xl:px-20 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap">
          <div className="navbar">
            <div className="flex flex-row gap-5">
              <a
                className="text-4xl inline-block whitespace-nowrap uppercase mt-0.5"
                href="/dashboard"
              >
                Hermes
              </a>
            </div>
            <button
              className="text-slate-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="items flex flex-col lg:flex-row list-none lg:ml-auto mt-0.5">
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer">
                  <span
                    onClick={focusSecret}
                    className="text-lg font-extrabold ml-2"
                  >
                    Secret
                  </span>
                </div>
              </li>
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75 cursor-pointer">
                  <span
                    onClick={focusGroup}
                    className="text-lg font-extrabold ml-2"
                  >
                    Join
                  </span>
                </div>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75"
                >
                  <span onClick={toggleDropdown} className="text-xl ml-2">
                    Profile
                  </span>
                </button>
                <ul
                  class={`${dropdownVisiblity} min-w-max justify-center items-center absolute text-base z-50 float-left py-2 list-none rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800`}
                >
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
                      href="#nil"
                    >
                      {user.username}
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                      href="#nil"
                    >
                      {user.email}
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                      href="#nil"
                    >
                      {group}
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                      href="#nil"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </li>
              <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75">
                <img
                  src={Logout}
                  alt="logout"
                  onClick={logout}
                  className="absolute right-6 w-6 h-6 hover:opacity-75 cursor-pointer"
                />
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex flex-row">
        <div className="sidebar bg-slate-900 w-1/5 max-h-screen">
          <div className="min-h-screen">
            <div className="groups max-h-screen overflow-y-scroll">
              <ul className="list1">
                <li>
                  <input
                    id="group"
                    type="text"
                    placeholder="Enter group name.."
                    className="bg-slate-700 text-white w-5/6 mt-2 pl-3 py-1 rounded-lg mb-3"
                  />
                </li>
                <li>
                  <input
                    id="secret"
                    type="password"
                    placeholder="Enter secret.."
                    className="bg-slate-700 text-white w-5/6 mt-2 pl-3 py-1 rounded-lg mb-3"
                  />
                </li>
              </ul>
              <button
                onClick={joinGroup}
                className="hover:bg-slate-600 bg-slate-700 text-white w-20 ml-6 mt-2 py-1 rounded-lg mb-3"
              >
                Submit
              </button>
              <li className="group w-full flex text-green-500 bg-slate-900 hover:bg-slate-800 justify-start pl-5 py-5 text-xl cursor-pointer ">
                <div className="flex items-center">
                  <div className="block pr-2">
                    <img
                      alt="avatar"
                      src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      className="rounded-full h-10 w-10"
                    />
                  </div>
                  <p
                    id="grpName"
                    className="w-36 truncate text-left pl-2 pb-0.5"
                  ></p>
                  <br/>
                </div>
                  <p
                    id="grpName"
                    className="w-36 truncate text-left pl-2 pb-0.5"
                  >  {data.message}</p>
              </li>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-slate-800 w-4/5 max-h-screen ml-1">
          <div className="bg-slate-900 w-full h-[78%]">
            <div className="py-2 px-3 bg-slate-800 h-[10%] flex flex-row justify-between items-center">
              <div className="flex items-center">
                <div>
                  <img
                    alt="avatar"
                    src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    className="rounded-full h-10 w-10 "
                  />
                </div>
                <div className="ml-4">
                  <p id="groupName" className="text-green-500 "></p>
                  <p className="text-green-500 text-xs mt-1"></p>
                </div>
              </div>
            </div>

            <div className="chat flex-1 h-[90%] mx-16 overflow-y-scroll">
              <div className="py-2 px-3">
                <div className="flex justify-center mb-2">
                  <div className="rounded bg-slate-700 py-2 px-4">
                    <p className="text-sm text-slate-400 uppercase">{date}</p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="rounded bg-slate-700 py-2 px-4">
                    <p className="text-xs text-slate-400">
                      Messages to this chat and calls are now secured with
                      end-to-end encryption. Tap for more info.
                    </p>
                    <br/>
                    <p className="text-xs text-slate-400">
                    {state}
                    </p>
                    {/* <p className="text-xs text-slate-400">
                    {str}
                    </p> */}
                  </div>
                </div>
                {messages.map((msg) =>
                  msg.self ? (
                    <Message2
                      name={msg.name}
                      msg={msg.message}
                      time={msg.time}
                    />
                  ) : (
                    <Message1
                      name={msg.name}
                      msg={msg.message}
                      time={msg.time}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full">
            <button></button>
            <input
              id="msg"
              type="text"
              placeholder="Type a message..."
              defaultValue={transcript}
              className="bg-slate-700 text-white w-4/5 mt-4 ml-20 h-10 rounded-lg p-2"
              // >{transcript}</input>
            />
            <Link to="/face">
              <div className="face">
                <FeatherIcon icon="camera" color="#637286" />
              </div>
            </Link>
            <button
              onClick={() => {
                toggleMic();
              }}
              style={{ padding: "10px" }}
            >
              <FeatherIcon icon={mic} color="#637286" />
            </button>
            <button onClick={resetTranscript} style={{ color: "white" }}>
              Reset
            </button>
            <div className="ml-5 mt-6">
              <button onClick={sendMessage}>
                <svg
                  className="bg-slate-800 text-slate-500 hover:cursor-pointer"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                  ></path>
                </svg>
              </button>cd 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
