import React, {useState} from 'react'


export const userContext = React.createContext()

function ContextComponent({children}) {
    let [students, setStudents] = useState([
        {
          name: "Raja Sekar",
          email: "raj@gmail.com",
          mobile: "9876543210",
          course: "DSA",
          batch: "B45",
        },
        {
          name: "Megha",
          email: "megha@gmail.com",
          mobile: "9876543511",
          course: "React",
          batch: "B45",
        },
        {
          name: "Vengatesh",
          email: "vengatesh@gmail.com",
          mobile: "80989019801",
          course: "Javascript",
          batch: "B45",
        },
        {
          name: "Kiruthika",
          email: "kiruthika@gmail.com",
          mobile: "9876543210",
          course: "DSA",
          batch: "B45",
        },
        {
          name: "Gopi",
          email: "gopi@gmail.com",
          mobile: "9876543210",
          course: "React",
          batch: "B45",
        },
        {
          name: "Sindhu",
          email: "sindhu@gmail.com",
          mobile: "9876543210",
          course: "Javascript",
          batch: "B45",
        },
      ]);
    
      const [teachers, setTeachers] = useState([
        {
          name: "Sathish",
          email: "sathish@gmail.com",
          mobile: "9876543210",
          expertise: "DSA"
        },
        {
          name: "Nagarajan",
          email: "nagarajan@gmail.com",
          mobile: "9876543511",
          expertise: "React"
        },
        {
          name: "SaiMohan",
          email: "ganesh@gmail.com",
          mobile: "80989019801",
          expertise: "Javascript"
        },
      ]);
    
     

  return (
    <div>
        <userContext.Provider value={{ students, setStudents, teachers, setTeachers }}>
            {children}
        </userContext.Provider>   
      
    </div>
  )
}

export default ContextComponent
