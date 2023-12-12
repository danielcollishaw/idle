import "./Terminal.css";
import { useState, useEffect, useRef } from "react";
import { useRefCallback } from "../scripts/React-Extended.ts";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { parse } from "../scripts/Parser.ts";
import {
  loadPressBlobs,
  loadReleaseBlobs,
  handleAudio,
} from "../scripts/Audio.ts";

function Terminal() {
  const text = useRef<HTMLElement>(null);
  const [content, setContent] = useState<String>(
    "<div>get started with 'help'</div><div><br /></div>"
  );
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

  useEffect(() => {
    if (text != null) {
      text.current!.innerHTML = content.toString();

      // Moving Carat To End
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        try {
          range.setStart(range.startContainer.lastChild!, 1);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (error) {
          return;
        }
      }
    }
  }, [content]);

  const onContentChange = useRefCallback((e: any) => {
    if (e.currentTarget.innerHTML.substring(0, 5) !== "<div>") {
      setContent(new String("<div><br /></div>"));
      return;
    }

    const content = sanitizeHtml(e.currentTarget.innerHTML, {
      allowedAttributes: {
        div: ["class"],
      },
    });
    const parsed = parse(content);
    setContent(parsed);
  }, []);

  const onKeyDown = useRefCallback(
    (e: any) => {
      const key = e.key;

      // Disabling Buggy Interactions
      if (e.ctrlKey) {
        e.preventDefault();
        return;
      } else if (key == "Backspace") {
        //@ts-ignore
        if (text.current!.lastChild!.innerText < 1) {
          // last element is empty
          e.preventDefault();
        }
      } else if (key == "Delete") {
        e.preventDefault();
        return;
      }

      handleAudio(typeAudio, key)?.play();
    },
    [typeAudio]
  );

  const onKeyUp = useRefCallback(
    (e: any) => {
      const key = e.which;
      handleAudio(releaseAudio, key)?.play();
    },
    [releaseAudio]
  );

  return (
    <ContentEditable
      innerRef={text}
      className="terminal"
      onChange={onContentChange}
      onBlur={onContentChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      html={content.toString()}
    />
  );
}

export default Terminal;
