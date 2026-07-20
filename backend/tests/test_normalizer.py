from utils.normalizer import (clean_email, clean_url, clean_text)

print(clean_text("   ALF   "))
print(clean_email(" INFO@ALF.COM "))
print(clean_url("https://alf.com/"))