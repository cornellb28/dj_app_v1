import essentia.standard as es

def extract_bpm_and_key(file_path):
    # Load the audio file
    audio = es.MonoLoader(filename=file_path)()

    # Extract BPM
    rhythm_extractor = es.RhythmExtractor2013(method="multifeature")
    bpm, _, _, _, _ = rhythm_extractor(audio)

    # Extract key
    key_extractor = es.KeyExtractor()
    key, scale, strength = key_extractor(audio)

    return bpm, key + " " + scale

def main(file_path):
    bpm, initial_key = extract_bpm_and_key(file_path)

    print(f"BPM: {bpm}")
    print(f"Initial Key: {initial_key}")

if __name__ == "__main__":
    file_path = "path/to/your/song.mp3"  # Replace with your MP3 file path
    main(file_path)
