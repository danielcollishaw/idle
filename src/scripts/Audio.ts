const PATH = "/alpaca/";
const RELEASE_AUDIOS = ["BACKSPACE", "ENTER", "SPACE", "GENERIC"];
const PRESS_AUDIOS = [
  "BACKSPACE",
  "ENTER",
  "SPACE",
  "GENERIC_R0",
  "GENERIC_R1",
  "GENERIC_R3",
  "GENERIC_R4",
];

export enum AUDIO_CODES {
  Backspace,
  Enter,
  Space,
  Generics,
}

export const loadPressBlobs = async () => {
  const promiseArr = PRESS_AUDIOS.map(async (audio) => {
    const blob = await (await fetch(`${PATH}/press/${audio}.mp3`)).blob();
    const fileBlob = URL.createObjectURL(blob);
    return fileBlob;
  });

  return Promise.all(promiseArr);
};

export const loadReleaseBlobs = async () => {
  const promiseArr = RELEASE_AUDIOS.map(async (audio) => {
    const blob = await (await fetch(`${PATH}/release/${audio}.mp3`)).blob();
    const fileBlob = URL.createObjectURL(blob);
    return fileBlob;
  });

  return Promise.all(promiseArr);
};

export const handleAudio = (audio: Array<string>, key: string) => {
  if (audio.length <= 0) {
    return;
  }

  const sound = new Audio();
  switch (key) {
    case "Backspace":
      sound.src = audio[AUDIO_CODES.Backspace];
      break;
    case "Enter":
      sound.src = audio[AUDIO_CODES.Enter];
      break;
    case "Space":
      sound.src = audio[AUDIO_CODES.Space];
      break;
    default:
      const generics = audio.slice(AUDIO_CODES.Generics, audio.length);
      const randomIndex = Math.floor(Math.random() * generics.length);
      sound.src = generics[randomIndex];
  }

  return sound;
};
