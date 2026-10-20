// Web Audio API ambient lofi music synthesizer
// Generates soft warm lofi chords, gentle vinyl tape ambience, and frequency data

export interface LofiTrack {
  id: string;
  title: string;
  mood: string;
  bpm: number;
}

export const LOFI_TRACKS: LofiTrack[] = [
  { id: 'track-1', title: 'Chasing Better Days', mood: 'Lofi Study', bpm: 72 },
  { id: 'track-2', title: 'Midnight Architecture', mood: 'Deep Focus', bpm: 68 },
  { id: 'track-3', title: 'Rainy Pune Coffee', mood: 'Chillhop Beats', bpm: 76 },
];

class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private volume = 0.3;
  private currentTrackIndex = 0;
  private onTrackChangeCallbacks: ((track: LofiTrack) => void)[] = [];
  private onPlayStateChangeCallbacks: ((isPlaying: boolean) => void)[] = [];

  // Track chord progressions
  private chordSets: Record<string, number[][]> = {
    'track-1': [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 349.23], // G7
    ],
    'track-2': [
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [196.0, 246.94, 293.66, 392.0],  // G7
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 277.18, 329.63, 392.0],  // A7b9
    ],
    'track-3': [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [164.81, 207.65, 246.94, 311.13], // E7#9
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [246.94, 293.66, 349.23, 440.0], // Bm7
    ],
  };

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getCurrentTrack(): LofiTrack {
    return LOFI_TRACKS[this.currentTrackIndex];
  }

  public nextTrack(): LofiTrack {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % LOFI_TRACKS.length;
    this.currentChordIndex = 0;
    const track = LOFI_TRACKS[this.currentTrackIndex];
    this.notifyTrackChange(track);
    if (this.isPlaying) {
      this.playNextChord();
    }
    return track;
  }

  public onTrackChange(callback: (track: LofiTrack) => void) {
    this.onTrackChangeCallbacks.push(callback);
    return () => {
      this.onTrackChangeCallbacks = this.onTrackChangeCallbacks.filter(c => c !== callback);
    };
  }

  private notifyTrackChange(track: LofiTrack) {
    this.onTrackChangeCallbacks.forEach(cb => cb(track));
  }

  public addListener(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChangeCallbacks.push(callback);
    return () => this.removeListener(callback);
  }

  public removeListener(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChangeCallbacks = this.onPlayStateChangeCallbacks.filter(c => c !== callback);
  }

  private notifyPlayStateChange(isPlaying: boolean) {
    this.onPlayStateChangeCallbacks.forEach(cb => {
      try {
        cb(isPlaying);
      } catch {
        // ignore
      }
    });
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.notifyPlayStateChange(true);

    this.playNextChord();
    const interval = (60 / LOFI_TRACKS[this.currentTrackIndex].bpm) * 4 * 1000;
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, interval);

    this.startVinylAmbience();
  }

  public pause() {
    this.isPlaying = false;
    this.notifyPlayStateChange(false);
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

  public getVolume(): number {
    return this.volume;
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain) return;
    const currentTrack = LOFI_TRACKS[this.currentTrackIndex];
    const chords = this.chordSets[currentTrack.id] || this.chordSets['track-1'];

    const chord = chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % chords.length;

    const now = this.ctx.currentTime;
    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0, now);
    chordGain.gain.linearRampToValueAtTime(0.32, now + 1.2);
    chordGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(620, now);
    filter.Q.setValueAtTime(1.1, now);

    chordGain.connect(filter);
    filter.connect(this.masterGain);

    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      const detune = (Math.random() - 0.5) * 6;
      osc.detune.setValueAtTime(detune, now);

      osc.connect(chordGain);
      osc.start(now + i * 0.035);
      osc.stop(now + 4.0);
    });
  }

  private startVinylAmbience() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.007;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start();
      this.noiseNode = noise;
    } catch {
      // Audio fallback
    }
  }
}

export const lofiEngine = new LofiAudioEngine();
