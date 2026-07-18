from discovery.query_runner import run_queries


if __name__ == "__main__":

    results = run_queries(
        [
            "plumbers Brussels"
        ],
        max_listings=10
    )

    for business in results:
        print("--------------------------------")
        print(business)