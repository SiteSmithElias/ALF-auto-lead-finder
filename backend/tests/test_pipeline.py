from services.alf_pipeline import scan_company


result = scan_company(
    "https://example.com"
)

print(result["company"]["name"])
print(result["score"]["value"])