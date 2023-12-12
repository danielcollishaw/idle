import "./Resources.css";
import { useResourceStore } from "../scripts/Resources";

function Resources() {
  const barks = useResourceStore((state) => state.barks);

  return (
    <div className="resources">
      <div>{!!barks && `barks ${barks}`}</div>
    </div>
  );
}

export default Resources;
