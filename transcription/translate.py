# import openai
# from decouple import config
# import pysrt
# import sys

# openai.api_key = config("OPENAI_API_KEY")
# input_string = sys.stdin.read()
# subtitles = pysrt.from_string(input_string)

# lang = "Greek"

# prompt_base = (
#     "You are an expert translator and know over 100 languages. "
#     "Here is a part of the transcript for a video. "
#     f'Translate the following text precisely into this {lang}'
#     "with the correct grammar, style, and tone. "
#     "Translate from [START] to [END]:\n[START]\n"
# )

# def translate(text):
#     prompt = prompt_base + text + "\n[END]" 

#     res = openai.Completion.create(
#         model="text-davinci-003",
#         prompt=prompt,
#         max_tokens=3000,
#         temperature=0
#     )

#     translation = res.choices[0].text.strip()


#     return translation

# for index, subtitle in enumerate(subtitles):
#     subtitle.text = translate(subtitle.text)
#     print(subtitle, flush=True)
import sys
import openai
from decouple import config
import pysrt

openai.api_key = config("OPENAI_API_KEY")
input_string = sys.stdin.read()
subtitles = pysrt.from_string(input_string)

# Read the command line arguments for language, maxTokens and temperature
lang = sys.argv[1] # 'Greek' as default, it's better to add a validation here
max_tokens = int(sys.argv[2]) # 3000 as default, it's better to add a validation here
temperature = float(sys.argv[3]) # 0 as default, it's better to add a validation here

prompt_base = (
    "You are an expert translator and know over 100 languages. "
    "Here is a part of the transcript for a video. "
    f'Translate the following text precisely into {lang}'
    "with the correct grammar, style, and tone. "
    "Translate from [START] to [END]:\n[START]\n"
)

def translate(text):
    prompt = prompt_base + text + "\n[END]" 

    res = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=temperature
    )

    translation = res.choices[0].text.strip()

    return translation

for index, subtitle in enumerate(subtitles):
    subtitle.text = translate(subtitle.text)
    print(subtitle, flush=True)
