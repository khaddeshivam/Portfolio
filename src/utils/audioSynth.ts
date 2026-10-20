// Web Audio API ambient lofi music synthesizer
// Generates soft warm lofi chords and gentle vinyl tape ambience client-side

class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private volume = 0.25;

  private chords = [
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
    [220.0, 261.63, 329.63, 392.0],  // Am7
    [174.61, 220.0, 261.63, 329.63], // Fmaj7
    [196.0, 246.94, 293.66, 349.23], // G7
    [246.94, 311.13, 369.99, 440.0], // Bm7b5
    [220.0, 277.18, 329.63, 392.0],  // A7
    [146.83, 174.61, 220.0, 261.63], // Dm7
    [196.0, 246.94, 293.66, 392.0],  // G
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // Start chord progression loop
    this.playNextChord();
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, 4200);

    // Add soft vinyl crackle
    this.startVinylAmbience();
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain) return;
    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0, now);
    chordGain.gain.linearRampToValueAtTime(0.35, now + 1.2);
    chordGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

    // Warm low-pass filter for lofi chill warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(1.2, now);

    chordGain.connect(filter);
    filter.connect(this.masterGain);

    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      // Triangle or sine with slight detune gives vintage Rhodes electric piano timbre
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Subtle humanized micro-detune
      const detune = (Math.random() - 0.5) * 8;
      osc.detune.setValueAtTime(detune, now);

      osc.connect(chordGain);
      osc.start(now + i * 0.04);
      osc.stop(now + 4.1);
    });
  }

  private startVinylAmbience() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate subtle warm pink/brown noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.009;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start();
      this.noiseNode = noise;
    } catch {
      // Audio context might fail on restricted environments
    }
  }
}

export const lofiEngine = new LofiAudioEngine();
