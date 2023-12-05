import os
import json

def find_mp3_files(root_dir):
    """
    Scan the hard drive for mp3 files.
    :param root_dir: Root directory to start the search
    :return: List of paths to mp3 files
    """
    mp3_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.mp3'):
                mp3_files.append(os.path.join(root, file))
    return mp3_files

def write_to_json(file_list, output_file):
    """
    Write the list of files to a JSON file.
    :param file_list: List of file paths
    :param output_file: Output JSON file path
    """
    with open(output_file, 'w') as f:
        json.dump(file_list, f, indent=4)

# Example usage
root_directory = 'C:\\'  # Replace with the path of the hard drive or folder you want to scan
output_json_file = 'mp3_files.json'  # The JSON file where the results will be saved

mp3_files = find_mp3_files(root_directory)
write_to_json(mp3_files, output_json_file)

print(f"Found {len(mp3_files)} MP3 files. List saved to {output_json_file}")
