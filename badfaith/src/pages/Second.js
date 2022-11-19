import { useNavigate } from "react-router-dom";

function Second() {
    const navigate= useNavigate();

  return (
    <div className="grid h-screen place-items-center bg-green-600">
     <button className="outline" onClick={()=>navigate("/")}>Go back</button>
    </div>
  );
}

export default Second;
