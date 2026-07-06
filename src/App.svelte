<script>
  /**
   * @typedef {Object} BenchProperties
   * @property {string} id
   * @property {string=} amenity
   * @property {string=} backrest
   * @property {string=} inscription
   * @property {string=} material
   */

  /**
   * @typedef {Object} Review
   * @property {string} benchId
   * @property {string} author
   * @property {number} rating
   * @property {string} comment
   */

  /**
   * @typedef {Object} Filters
   * @property {"any" | "yes" | "no"} backrest
   * @property {"any" | "concrete" | "metal" | "stone"} material
   * @property {boolean} nearWater
   * @property {boolean} nearGreen
   * @property {string} searchText
   */

  import Map from "./components/Map.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  
  let activePanel = "home";

  /** @type {BenchProperties | null} */
  let selectedBench = null;

  /** @type {Review[]} */
  let reviews = [];
  
  let showReviewPanel = false;
  let searchDraft = "";

  /** @type {Filters} */
  let filters = {
    backrest: "any",      // any | yes | no
    material: "any",      // any | concrete | metal | stone
    nearWater: false,
    nearGreen: false,
    searchText: ""
  };

  let clearSelectedBenchSignal = 0;


  /* as user selects a bench on map*/
  /**
 * @param {BenchProperties} properties
 */
  async function handleBenchSelect(properties){
    selectedBench = properties;
    activePanel = "explore";

    const response = await fetch("http://localhost:3000/reviews");
    /** @type {Review[]} */
    const allReviews = await response.json();

    reviews = allReviews.filter((review) =>
      review.benchId === properties.id
    );
  }

  /*Submit Reviews*/
  /**
 * @param {Review} review
 */
  async function handleSubmitReview(review){
    await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    });

    showReviewPanel = false;

    if (selectedBench) {
      await handleBenchSelect(selectedBench);
    }
  }

  function getAverageRating() {
    if (reviews.length === 0) return "No Rating";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }

  function handlePanelChange(panel) {
    activePanel = panel;

    if (panel === "home" || panel === "search") {
      selectedBench = null;
      reviews = [];
      showReviewPanel = false;
      clearSelectedBenchSignal += 1;
    }
  }
</script>

<div id="container">
  <Sidebar
    activePanel={activePanel}
    selectedBench={selectedBench}
    reviews={reviews}
    getAverageRating={getAverageRating}
    showReviewPanel={showReviewPanel}
    onToggleReview={() => showReviewPanel = !showReviewPanel}
    onSubmitReview={handleSubmitReview}
    onPanelChange={handlePanelChange}

    filters={filters}
    searchDraft={searchDraft}
    onSearchDraftChange={(/** @type {string} */ value) => searchDraft = value}
    onApplySearch={() =>
      filters = {
        ...filters,
        searchText: searchDraft
      }
    }
    
onFilterChange={(/** @type {Filters} */ newFilters) => filters = newFilters}
  />

  <Map
    onBenchSelect={handleBenchSelect}
    backrest={filters.backrest}
    material={filters.material}
    nearWater={filters.nearWater}
    nearGreen={filters.nearGreen}
    searchText={filters.searchText}
    clearSelectedBenchSignal={clearSelectedBenchSignal}
  />

</div>

<style>

</style>
