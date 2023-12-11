import "./Terminal.css";
import { useState, useEffect } from "react";
import { useRefCallback } from "../scripts/React-Extended.ts";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import {
  loadPressBlobs,
  loadReleaseBlobs,
  handleAudio,
} from "../scripts/Audio.ts";

function Terminal() {
  const [content, setContent] = useState("");
  const [typeAudio, setTypeAudio] = useState<Array<string>>([]);
  const [releaseAudio, setReleaseAudio] = useState<Array<string>>([]);

  useEffect(() => {
    const getAudio = async () => {
      const types = await loadPressBlobs();
      const release = await loadReleaseBlobs();
      setTypeAudio(types);
      setReleaseAudio(release);
    };

    getAudio().catch(console.error);
  }, []);

  const onContentChange = useRefCallback((e: any) => {
    setContent(sanitizeHtml(e.currentTarget.innerHTML));
  }, []);

  const onKeyDown = useRefCallback(
    (e: any) => {
      const key = e.which;
      handleAudio(typeAudio, key)?.play();
    },
    [typeAudio]
  );

  const onKeyUp = useRefCallback(
    (e: any) => {
      console.log(releaseAudio);
      const key = e.which;
      handleAudio(releaseAudio, key)?.play();
    },
    [releaseAudio]
  );

  return (
    <ContentEditable
      className="terminal"
      onChange={onContentChange}
      onBlur={onContentChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      html={content}
    />
  );
}

export default Terminal;
