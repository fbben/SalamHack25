import { Audio } from "expo-av";

let isPlaying = false; // Prevent multiple plays

/**
 * Splits text into smaller chunks:
 * - First, by sentence (`.`)
 * - Then, splits any sentence exceeding 200 chars
 */
function getTextChunks(text) {
    return text
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean)
        .flatMap((chunk) => chunk.match(/.{1,200}/g) || [chunk]);
}

/**
 * Fetches a TTS audio for a given text chunk
 */
async function fetchTTS(chunk, lang) {
    try {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(chunk)}&tl=${lang}`;
        const { sound } = await Audio.Sound.createAsync({ uri: url });
        return sound;
    } catch (error) {
        console.error("Error fetching TTS:", error);
        return null;
    }
}

/**
 * Plays a sound and waits for it to finish
 */
async function playSound(sound, speed) {
    await sound.setRateAsync(speed, true);
    await sound.playAsync();

    return new Promise((resolve) => {
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                sound.unloadAsync(); // Free memory
                resolve();
            }
        });
    });
}

/**
 * Main function: Fetch all audio first, then play sequentially
 */
async function playTTS(text, lang = "ar", speed = 1.2) {
    if (isPlaying) {
        console.warn("TTS is already playing. Please wait.");
        return;
    }

    isPlaying = true;
    const chunks = getTextChunks(text);

    if (chunks.length === 0) {
        console.warn("No valid text to process.");
        isPlaying = false;
        return;
    }

    // Fetch all audio first
    const sounds = await Promise.all(chunks.map((chunk) => fetchTTS(chunk, lang)));

    // Remove failed fetches
    const validSounds = sounds.filter((sound) => sound !== null);

    if (validSounds.length === 0) {
        console.warn("No valid audio generated.");
        isPlaying = false;
        return;
    }

    // Play sounds one by one
    for (const sound of validSounds) {
        await playSound(sound, speed);
    }

    isPlaying = false; // Reset flag after playback ends
}

export default playTTS;
