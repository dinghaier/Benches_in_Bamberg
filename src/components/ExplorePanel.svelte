<script>
let {
    selectedBench,
    reviews,
    getAverageRating,
    onToggleReview
} = $props();


</script>


{#if selectedBench}

    <div class="bench-card">

        

        <div class="bench-score">

            <div class="stars">
                {#each Array(Math.round(Number(getAverageRating()) || 0)) as _}
                    ⭐
                {/each}
            </div>

            <div class="score">
                {getAverageRating()} ({reviews.length} reviews)
            </div>

        </div>

    </div>

    <h4 class="section-title">
        Information
    </h4>

    <div class="info-row">
        <span>Material</span>
        <span>{selectedBench.material || "Unknown"}</span>
    </div>

    <div class="info-row">
        <span>Backrest</span>
        <span>{selectedBench.backrest || "Unknown"}</span>
    </div>

    <div class="info-row">
        <span>Inscription</span>
        <span>{selectedBench.inscription || "—"}</span>
    </div>

    <h4 class="section-title">
        Community
    </h4>

    <div class="community-list">
        {#if reviews.length}

            {#each reviews as review}

                <div class="review-card">

                    <div class="review-stars">
                        {"★".repeat(review.rating)}
                    </div>

                    <div>
                        {review.comment}
                    </div>

                    <small>
                        — {review.author}
                    </small>

                </div>

            {/each}

        {:else}

            <p>No reviews yet.</p>

        {/if}
    </div>
       
    <button class="review-button" onclick={onToggleReview}>
        + Add Review
    </button>

{:else}

    <p>Please select a bench on the map.</p>

{/if}

