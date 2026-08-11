// Web Speech API Voice Narration Helper for Accessibility Mode

export function speakText(text: string, lang: 'en' | 'bn' = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop prior narration

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (lang === 'bn') {
      utterance.lang = 'bn-BD';
    } else {
      utterance.lang = 'en-US';
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error("Speech Synthesis Error:", err);
    return false;
  }
}

export function stopTextToSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
