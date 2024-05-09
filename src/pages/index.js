import { get, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "./api/firebaseConfig";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const [users, setUsers] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users", "experiences");
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setUsers(usersArray);
      } else {
        console.log("Não há dados disponíveis");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  function renderExperiences() {
    return users.filter(user => user && user.experiences).map((user) => {
      return(
        <ul key={user.id}>
          {user.experiences.filter(exp => exp).map(exp => ( 
            <li key={exp.id} className="mb-5">
              <div className="font-semibold">
                <h3 className="text-xl">{exp.position}, {exp.companyName}</h3>
                <span>{exp.initialDate}</span> - <span>{exp.endDate}</span><span className="ml-5">{exp.location}</span>
              </div>
              <div className="text-slate-600">{exp.description}</div>
            </li>
          ))}
        </ul>
      )
    }) 
  }

  function renderAcademies() {
    return users.filter(user => user && user.academies).map((user) => {
      return(
        <ul key={user.id}>
          {user.academies.filter(academy => academy).map(academy => ( 
            <li key={academy.id} className="mb-5">
              <div className="font-semibold">
                <h3 className="text-xl">{academy.institution}, {academy.course}</h3>
                <span>{academy.initialDate}</span> - <span>{academy.endDate}</span>
              </div>
            </li>
          ))}
        </ul>
      )
    }) 
  }

  function renderAdditionals() {
    return users.filter(user => user && user.additionals).map((user) => {
      return(
        <ul key={user.id}>
          {user.additionals.filter(add => add).map(add => ( 
            <li key={add.id} className="mb-5">
              <div className="font-semibold">
                <h3 className="text-xl">{add.institution}, {add.course}</h3>
                <span>{add.initialDate}</span> - <span>{add.endDate}</span>
              </div>
            </li>
          ))}
        </ul>
      )
    }) 
  }

  function renderCompetences(){
    return users.filter(user => user && user.hardskills).map((user) => {
      return(
        <ul key={user.id} className="text-slate-600">
          {user.hardskills.filter(comp => comp).map(comp => (
            <li key={comp.id} className="mb-3">
              <label className="text-slate-600">{comp.name}</label>
              <ul className={`flex mt-2 comp-level l${(comp.level)}`}>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 rounded-full"></li>
              </ul>
            </li>
          ))}          
        </ul>
      )
    })
  }

  function renderLanguages(){
    return users.filter(user => user && user.languages).map((user) => {
      return(
        <ul key={user.id} className="text-slate-600">
          {user.languages.filter(lang => lang).map(lang => (
            <li key={lang.id} className="mb-3">
              <label className="text-slate-600">{lang.name}</label>
              <ul className={`flex mt-2 comp-level l${(lang.level)}`}>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 mr-3 rounded-full"></li>
                <li className="w-3.5 h-3.5 rounded-full"></li>
              </ul>
            </li>
          ))}          
        </ul>
      )
    })
  }

  return (
    <main
      className={`min-h-screen items-center justify-between px-24 ${inter.className}`}
    >
      {users.map((user) => (
        <div key={user.id}>
          <div className="container flex">
            <div className="w-2/6 border-r border-zinc-900/10 p-8 dark:border-white/10">
              <div className="hidden lg:flex mb-3">
                <img src="images/qr-code-linkedin-marcelo-oguihara.jpg"></img>
              </div>
              <div className="text-slate-600">
                {user.address.city}, <br />
                {user.address.neighborhood}, {user.address.state}, {user.address.country}
              </div>
              <div className="text-slate-600 mt-7">
                <label className="text-black lg:block">Celular</label>
                {user.cellphone}
                <label className="text-black lg:block">E-mail</label>
                <a href={`mailto:${(user.email)}`}>
                  {user.email}
                </a>
              </div>
              <div className="text-yellow-600 mt-7">
                <h2 className="text-3xl font-semibold mb-3">Mídia social</h2>
                <a href={user.socialMedia.social1.url} target="_blank">
                  {user.socialMedia.social1.name}
                </a>
              </div>
              <div className="text-yellow-600 mt-7">
                <h2 className="text-3xl font-semibold mb-3">Qualidades técnicas</h2>
                {renderCompetences()}
              </div>
              <div className="text-yellow-600 mt-7">
                <h2 className="text-3xl font-semibold mb-3">Idiomas</h2>
                {renderLanguages()}
              </div>              
            </div>
            <div className="w-4/6 p-8">
              <h1 className="text-4xl font-bold">{user.fullname}</h1>
              <div className="text-xl text-slate-600">
                {user.position}
              </div>
              <div className="mt-7">
                <h2 className="text-yellow-600 text-3xl font-semibold mb-3">
                  Qualificação profissional
                </h2>
                <p>{user.presentation}</p>
              </div>
              <div className="mt-7">
                <h2 className="text-yellow-600 text-3xl font-semibold mb-5">
                  Experiência profissional
                </h2>
                <ul>
                  {renderExperiences()}
                </ul>
              </div>
              <div className="mt-7">
                <h2 className="text-yellow-600 text-3xl font-semibold mb-5">
                  Formação Acadêmica
                </h2>
                <ul>
                  {renderAcademies()}
                </ul>
              </div>
              <div className="mt-7">
                <h2 className="text-yellow-600 text-3xl font-semibold mb-5">
                  Formações complementares
                </h2>
                <ul>
                  {renderAdditionals()}
                </ul>
              </div>              
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
