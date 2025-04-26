import { Check, Pencil, Trash2 } from 'lucide-react';
import { useContext } from "react"
import { Todos } from "./ContextTodo";
export default function Todo({ title ,id,completed,edit,getdelete}) {
    const { Tododata , setTododata} = useContext(Todos);
const deletehandle = ()=>{

  getdelete(id)
}

    function toggleCompleted (){

        const completede= Tododata.map((c)=>
       c.id==id ?{...c,completed:!completed}:c )
        setTododata(completede)
    }
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
    <h3
  className={`text-lg font-semibold ${completed ? 'text-blue-900' : ''}`}
  style={completed ? { textDecoration: 'line-through', textDecorationThickness: '3px' } : {}}
>
  {title}
</h3>

      
      <div className="flex gap-3">
        <button onClick={toggleCompleted} className="hover:bg-green-500 text-green-700 hover:text-white transition-all duration-200 rounded-full p-2">
          <Check className="w-5 h-5" onClick={toggleCompleted} />
        </button>
        
        <button onClick={() => edit(title, id)} className="hover:bg-yellow-400 text-yellow-700 hover:text-white transition-all duration-200 rounded-full p-2">
          <Pencil className="w-5 h-5" />
        </button>
        
        <button onClick={deletehandle} className="hover:bg-red-500 text-red-700 hover:text-white transition-all duration-200 rounded-full p-2">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
