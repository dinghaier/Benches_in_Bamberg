<script>
    import ExplorePanel from "./ExplorePanel.svelte";

    let {
        activePanel,
        selectedBench,
        reviews,
        getAverageRating,
        showReviewPanel,
        onToggleReview,
        onPanelChange,
        onSubmitReview,
        filters,
        onFilterChange,
        searchDraft,
        onSearchDraftChange,
        onApplySearch
    } = $props();

    let author = $state("");
    let rating = $state(0);
    let comment = $state("");

    async function submitReview(){
        if (!selectedBench) return;
        if (!comment.trim()) return;

        await onSubmitReview({
            benchId: selectedBench["@id"],
            author: author.trim() || "Anonymous",
            rating,
            comment: comment.trim()
        });

        author = "";
        rating = 0;
        comment = "";
    }
</script>

<div id="sidebar-wrapper">
    <aside id="menu">
        <section class="panel" class:active={activePanel === "home"}>
            <button class="panel-header" onclick={() => onPanelChange("home")}>
                <h3>Benches in Bamberg</h3>
            </button>

            <div class="panel-content">
                <p>Discover public benches throughout Bamberg.</p>
                <p><span style="font-style: italic;">Benches in Bamberg</span> is an interactive map that helps people discover, explore, and evaluate public benches across the city of Bamberg. Using geographic data from <span><a href="https://www.openstreetmap.org/#map=14/49.88986/10.88492">OpenStreetMap</a></span>, the project visualizes the locations of benches and provides information such as accessibility, surroundings, and seating features. 
                    <br>Visitors can browse benches on a map, search for places that match their preferences, and explore different areas of the city from a new perspective. 
                    <br>The project aims to transform ordinary urban furniture into points of interest and encourage people to engage with public spaces in a fun way.</p>
            </div>
        </section>

        <section class="panel" class:active={activePanel === "search"}>
            <button class="panel-header" onclick={() => onPanelChange("search")}>
                Search
            </button>

            <div class="panel-content">
                <input
                type="text"
                id="search-box"
                placeholder="Search inscription, year, organization..."
                value={searchDraft}
                oninput={(e) => onSearchDraftChange(e.currentTarget.value)}
                onkeydown={(e) => {
                    if (e.key === "Enter") onApplySearch();
                }}
                />

                <button class="search-button" onclick={onApplySearch}>
                    Search
                </button>

                <h4 class="filter-title">Bench Type</h4>

                <div class="filter-group">
                    <p class="filter-label">Backrest</p>

                    <div class="pill-row">
                        <button class:active-pill={filters.backrest === "any"} onclick={() => onFilterChange({ ...filters, backrest: "any" })}>Any</button>
                        <button class:active-pill={filters.backrest === "yes"} onclick={() => onFilterChange({ ...filters, backrest: "yes" })}>With</button>
                        <button class:active-pill={filters.backrest === "no"} onclick={() => onFilterChange({ ...filters, backrest: "no" })}>Without</button>
                    </div>
                </div>

                <div class="filter-group">
                    <p class="filter-label">Material</p>

                    <div class="pill-row">
                        <button class:active-pill={filters.material === "any"} onclick={() => onFilterChange({ ...filters, material: "any" })}>Any</button>
                        <button class:active-pill={filters.material === "wood"} onclick={() => onFilterChange({ ...filters, material: "wood" })}>Wood</button>
                        <button class:active-pill={filters.material === "concrete"} onclick={() => onFilterChange({ ...filters, material: "concrete" })}>Concrete</button>
                        <button class:active-pill={filters.material === "metal"} onclick={() => onFilterChange({ ...filters, material: "metal" })}>Metal</button>
                        <button class:active-pill={filters.material === "stone"} onclick={() => onFilterChange({ ...filters, material: "stone" })}>Stone</button>
                    </div>
                </div>

                <h4 class="filter-title">Features</h4>

                <div class="feature-group">

                    <div class="pill-row">
                        <button class:active-pill={filters.nearWater} onclick={() => onFilterChange({ ...filters, nearWater: !filters.nearWater })}>Near Water</button>
                        <button class:active-pill={filters.nearGreen} onclick={() => onFilterChange({ ...filters, nearGreen: !filters.nearGreen })}>Near Green</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel" class:active={activePanel === "explore"}>
            <button class="panel-header" onclick={() => onPanelChange("explore")}>
                Explore
            </button>

            <div class="panel-content">
                <ExplorePanel
                    selectedBench={selectedBench}
                    reviews={reviews}
                    getAverageRating={getAverageRating}
                    onToggleReview={onToggleReview}
                />
            </div>
        </section>
    </aside>

    <aside id="review-panel" class:open={showReviewPanel}>
        <div class="review-header">
            <button
                class="back-button"
                onclick={onToggleReview}
            >
                ❮ Back
            </button>

            <div class="review-heading">
                <h4>Add Review</h4>
            </div>
        </div>

        <div class="review-body">
            <p class="review-intro">
                Share what this bench feels like in real life so the next visitor knows what to expect.
            </p>

            <div class="review-form">
                <label for="review-author">Your Name</label><br>

                <input
                    id="review-author"
                    bind:value={author}
                    class="review-input"                
                />
                <br>

                <label for="review-rating">Your Rating</label>

                <div id="review-rating" class="rating">
                    {#each [1, 2, 3, 4, 5] as star}
                        <button class="star" onclick={() => rating = star}>
                            {star <= rating ? "★" : "☆"}
                        </button>
                    {/each}
                </div>

                <label for="review-comment">Comment</label>

                <textarea
                    id="review-comment"
                    bind:value={comment}
                    rows="6"
                    class="review-input"
                    placeholder="How was this bench?"
                ></textarea>

                <button class="submit-button" onclick={submitReview}>
                    Submit Review
                </button>
            </div>
        </div>
    </aside>
</div>
