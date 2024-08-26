import os
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, TIT2, TPE1
import requests
from bs4 import BeautifulSoup

def extract_mp3_metadata(file_path):
    audio = MP3(file_path, ID3=ID3)
    title = None
    artist = None
    
    # Extract title and artist from ID3 tags
    if audio.tags:
        title_tag = audio.tags.get(TIT2)
        artist_tag = audio.tags.get(TPE1)
        title = title_tag.text[0] if title_tag else None
        artist = artist_tag.text[0] if artist_tag else None

    return title, artist

def search_release_year(title, artist):
    search_query = f"{title} {artist} release year"
    url = f"https://www.google.com/search?q={search_query}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Look for the year in the search results (this is a basic example, can be improved)
    year = None
    for element in soup.find_all('span'):
        text = element.get_text()
        if text.isdigit() and len(text) == 4:  # A basic check for a 4-digit year
            year = text
            break

    return year

def main(file_path):
    title, artist = extract_mp3_metadata(file_path)
    if not title or not artist:
        print("Could not extract title or artist from the MP3 file.")
        return

    print(f"Title: {title}")
    print(f"Artist: {artist}")

    year = search_release_year(title, artist)
    if year:
        print(f"Release Year: {year}")
    else:
        print("Could not determine the release year.")

if __name__ == "__main__":
    file_path = "path/to/your/song.mp3"  # Replace with your MP3 file path
    main(file_path)
