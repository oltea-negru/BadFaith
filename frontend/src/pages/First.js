import { useNavigate } from "react-router-dom";

function First()
{
  const navigate = useNavigate();

  return (
    <div className="grid h-screen place-items-center bg-red-600">
      <button className="outline" onClick={() => navigate("/settings")}>Go to second page</button>
    </div>
  );
}

export default First;
