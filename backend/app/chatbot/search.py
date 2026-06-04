from duckduckgo_search import DDGS

def search_agriculture(query):
    results = []

    with DDGS() as ddgs:
        search_results = ddgs.text(
            f"agriculture crop farming plant disease {query}",
            max_results=3
        )

        for r in search_results:
            results.append({
                "title": r["title"],
                "url": r["href"],
                "snippet": r["body"]
            })

    return results