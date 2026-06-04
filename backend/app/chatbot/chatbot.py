from ddgs import DDGS

# ─── Crop Topic Guard ────────────────────────────────────────────

CROP_KEYWORDS = [
    "crop", "plant", "disease", "leaf", "soil", "farm", "agriculture",
    "tomato", "potato", "apple", "corn", "wheat", "rice", "maize",
    "blight", "rust", "fungus", "pest", "fertilizer", "irrigation",
    "harvest", "seed", "spray", "organic", "insect", "weed", "yield",
    "mold", "bacteria", "virus", "rot", "wilt", "spot", "mildew",
    "vegetable", "fruit", "flower", "root", "stem", "treatment", "cure"
]


def is_crop_related(query: str) -> bool:
    query = query.lower()
    return any(keyword in query for keyword in CROP_KEYWORDS)


# ─── Search Function ─────────────────────────────────────────────

def search_agriculture(query: str):

    try:
        with DDGS() as ddgs:

            results = list(
                ddgs.text(
                    f"agriculture crop disease farming {query}",
                    max_results=3
                )
            )

            print("Results:", results)

            return results

    except Exception as e:
        print("SEARCH ERROR:", e)
        return []


# ─── Main Chat Function ──────────────────────────────────────────

def get_response(query: str):

    if not is_crop_related(query):
        return {
            "answer":
                "🌱 I only answer crop and agriculture-related questions. "
                "Please ask me about plant diseases, treatments, pests, or farming tips.",
            "sources": []
        }

    results = search_agriculture(query)

    if not results:
        return {
            "answer":
                "⚠️ I couldn't find any agriculture-related information for that query.",
            "sources": []
        }

    first_result = results[0]

    answer = first_result.get(
        "body",
        "No summary available."
    )

    sources = []

    for item in results:

        sources.append({
            "title": item.get("title", "Source"),
            "url": item.get("href", ""),
        })

    return {
        "answer": answer,
        "sources": sources
    }


# ─── Test Mode ──────────────────────────────────────────────────

if __name__ == "__main__":

    while True:

        query = input("Ask: ")

        if query.lower() == "exit":
            break

        response = get_response(query)

        print("\nAnswer:")
        print(response["answer"])

        print("\nSources:")

        for source in response["sources"]:
            print(f"- {source['title']}")
            print(f"  {source['url']}")

        print()