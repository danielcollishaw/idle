import "./Resources.css";
import { useResourceStore } from "../scripts/Resources";

function Resources() {
  const visible = useResourceStore((state) => state.visible);
  const barks = useResourceStore((state) => state.barks);

  return (
    <div className={`resources ${visible ? "" : "hide-resources"}`}>
      <div>{!!barks && `barks ${barks}`}</div>
    </div>
  );
}

export default Resources;
