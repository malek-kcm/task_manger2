import {
  CircleUser,
  House,
  LayoutList,
  Settings,
  ArrowLeft,
  ArrowRight,
  X,
  BadgePlus,
} from "lucide-react";
import { Todos } from "./ContextTodo";
import Todo from "./Todo";
import { useContext, useState } from "react";
import { v4 as id } from 'uuid';

export default function Todolist() {
  const { Tododata , setTododata} = useContext(Todos);
  const [showForm, setShowForm] = useState(false);
  const [valeur, setvaleur] = useState("");
const [idedit, setid] = useState("");
const [edit, setedit] = useState(false);
  const [showdelete, setshowdelete] = useState(false);
const [idtodelete, setidtodelte] = useState("");


  
  function show() {
    return Tododata.map((t) => (
      <Todo key={t.id} id={t.id} title={t.title} completed={t.completed} edit={handleEdit} getdelete={getdelete} />
    ));
  }
function Add(e){
  e.preventDefault();

if (edit){

  setTododata(Tododata.map((t) =>
    t.id === idedit ? { ...t, title: valeur } : t
  ));
  setvaleur("");
  setedit(false);
  setid("");
  setShowForm(false);
  return;
}


if(!valeur.trim()){return;}
else{

const newdata={


  id:id(),
  title:valeur,
  completed: false,
}
setTododata(prev=>[...prev,newdata])
setvaleur("");
setShowForm(false)
}


}
function handleEdit (title, idedit) {
  setvaleur(title);
  setid(idedit);
  setedit(true);
  setShowForm(true);
}


function getdelete(id){
  setshowdelete(true);
  setidtodelte(id)}

function handeldelete() {

const newdata = Tododata.filter((t)=> t.id!= idtodelete
)
setTododata(newdata)
setidtodelte("")
setshowdelete(false)
}
  return (
    <div className="flex h-screen w-full bg-gradient-to-tr from-indigo-100 via-white to-blue-100">
      {/* Sidebar */}
      <div className="flex flex-col h-full w-56 bg-gradient-to-b from-gray-900 to-gray-800 justify-between border-r border-gray-700 shadow-md">
        <div className="flex flex-col items-center mt-10 px-4">
          <div className="bg-white rounded-full mb-10 p-3 shadow-lg">
            <CircleUser className="w-10 h-10 text-gray-800" />
          </div>

          <nav className="w-full space-y-3">
            <button className="flex items-center w-full gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-white">
              <House className="w-5 h-5" />
              <span>Accueil</span>
            </button>
            <button className="flex items-center w-full gap-3 px-4 py-3 rounded-lg bg-gray-700 text-white font-medium">
              <LayoutList className="w-5 h-5" />
              <span>Tâches</span>
            </button>
            <button className="flex items-center w-full gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-white">
              <Settings className="w-5 h-5" />
              <span>Paramètres</span>
            </button>
          </nav>
        </div>

        <div className="bg-gray-900 p-4 text-white text-sm text-center">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">22°C</span>
            <span className="text-gray-400">Ensoleillé</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="relative h-35 w-full">
          <img
            src="/images/header.jpg"
            alt="Fond d'écran"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-8">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
             Today's Task's
            </h1>

            <div className="flex gap-8 mt-4">
              <button className="flex gap-2 hover:text-indigo-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>yesterday</span>
              </button>
              <button className="flex gap-2 hover:text-indigo-300 transition-colors">
                <span>tomorrow </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bouton "Ajouter une tâche" */}
        <div className=" px-6 py-2  flex justify-end ">
          <button
            onClick={() => {setShowForm(true); setedit(false);     
    setvaleur("");    
    setid("");}}
            className="rounded-full p-2 bg-blue-600 hover:bg-indigo-700 text-white shadow-lg transition-all duration-300"
          >
            <BadgePlus className="h-6 w-6" />
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="flex-1 overflow-y-auto p-2 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto space-y-4">
            {show()}
          </div>
        </div>

        {/* Overlay du formulaire */}
        {showForm  &&  (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-xl relative border border-white/30">
              <button
                className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition"
                onClick={() => setShowForm(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {edit ? "modify your task" :"add your nex task" }
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  value={valeur}
                  onChange={(e)=>setvaleur(e.target.value)}
                  placeholder="Écris ta tâche ici..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  onClick={Add}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
                >
                {edit ? "modify" :"add" }
                </button>
              </form>
            </div>
          </div>
        )}


{ showdelete && (
   <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
<div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-xl relative border border-white/30">
 <button onClick={()=> setshowdelete(false)} className=" flex justify-end w-full hover:text-red-500 transition">
  <X className="w-6 h-6" />
 </button>
 <h5 className="font-bold text-xl text-center text-red-600 ">atention !</h5>
 <p className="text-center my-2">are you sure you want to delete this task </p>
<div className="flex items-center justify-center"  >
 <button onClick={handeldelete} type="submit" className="bg-indigo-600 p-2 font-semibold text-white rounded-lg hover:bg-indigo-700 transition-all mr-2 ">yes, delete</button>
<button onClick={()=> setshowdelete(false)} type="submit" className="bg-indigo-600 p-2 font-semibold text-white rounded-lg hover:bg-indigo-700 transition-all " > cancel</button>
</div>
</div>

  </div> )}



      </div>
    </div>
  );
}
