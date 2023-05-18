import sys
import openai
from decouple import config
import pysrt
import argparse

openai.api_key = config("OPENAI_API_KEY")
input_string = sys.stdin.read()
subtitles = pysrt.from_string(input_string)

parser = argparse.ArgumentParser(description="A demo script")

parser.add_argument('lang', type=str, help='The language to use for translation')
parser.add_argument('max_tokens', type=int, choices=range(1, 5000), help='The maximum number of tokens to generate')
parser.add_argument('temperature', type=float, choices=[x * 0.1 for x in range(0, 11)], help='The temperature for the model')

args = parser.parse_args()

lang = args.lang
max_tokens = args.max_tokens
temperature = args.temperature


prompt_base = (
    "You are a skilled polyglot with proficiency in over 100 languages. "
    "Below is a segment of the transcript from a video. "
    f'Please accurately translate the ensuing text into {lang}, '
    "ensuring you maintain proper grammar, stylistic nuance, and tone. "
    "Commence the translation from [START] to [END]:\n[START]\n"
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