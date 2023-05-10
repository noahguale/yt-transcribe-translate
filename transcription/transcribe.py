import os
import openai
import sys
from decouple import config

openai.api_key = config("OPENAI_API_KEY")
video_id = sys.argv[1]
audio_url = os.path.join(os.getcwd(), 'uploads', video_id + '.m4a')

audio_file = open(audio_url, "rb")

#Set the custom parameters
params = {
    'file': audio_file,
    'model': 'whisper-1',
    'prompt': 'Transcribe this audio file:',
    'response_format': 'srt'
}

# # Call the transcribe function with the custom parameters
transcription = openai.Audio.transcribe(**params)

print(transcription)